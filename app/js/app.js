// Loading Web3 package to interact with blockchains
var Web3 = require('web3');

if (typeof web3 !== 'undefined')
  web3 = new Web3(web3.currentProvider);
else
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// Hard-coding the account that's paying for the transactions
var defaultAccount = web3.eth.accounts[0];

// Hard-coding the default gas price
var defaultGasPrice = 20000000000;

// Instantiate Billboard contract
// Caution: both its ABI and address in the blockchain are hard-coded here.
// This means whenever we change the blockchain, we'll need to update these
// data, otherwise things won't work.
//
// Ideally, this would work:
//   var billboard = Billboard.deployed();
//
// However, I couldn't make it work. It seems to be some problem with truffle
// and the Pudding package.
var billboardABI = [{"constant":false,"inputs":[{"name":"tradeID","type":"uint256"},{"name":"taker","type":"address"}],"name":"takeTradeIntention","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"tradeID","type":"uint256"}],"name":"getTradeIntention","outputs":[{"name":"owner","type":"address"},{"name":"taker","type":"address"},{"name":"cardOffered","type":"string"},{"name":"cardWanted","type":"string"},{"name":"status","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"tradeIntentions","outputs":[{"name":"id","type":"uint256"},{"name":"owner","type":"address"},{"name":"taker","type":"address"},{"name":"cardOffered","type":"string"},{"name":"cardWanted","type":"string"},{"name":"status","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"owner","type":"address"},{"name":"cardOffered","type":"string"},{"name":"cardWanted","type":"string"}],"name":"newTradeIntention","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"getTradeIntentionListSize","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"tradeID","type":"uint256"},{"name":"sender","type":"address"}],"name":"cancelTradeIntention","outputs":[],"payable":false,"type":"function"},{"inputs":[],"type":"constructor"},{"payable":false,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"id","type":"uint256"},{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"cardOffered","type":"string"},{"indexed":false,"name":"cardWanted","type":"string"}],"name":"NewTradeIntention","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"id","type":"uint256"},{"indexed":false,"name":"taker","type":"address"}],"name":"TakeTradeIntention","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"id","type":"uint256"},{"indexed":false,"name":"sender","type":"address"}],"name":"CancelTradeIntention","type":"event"}];
var billboardAddress = '0xe4c7abe22866bf37a648a91cbc0cf9e78089cb2d';
var Billboard = web3.eth.contract(billboardABI);
var billboard = Billboard.at(billboardAddress);
var billboardGas = 4700000;

// Trade statuses
var TRADE_STATUS_OPEN = 0;
var TRADE_STATUS_SUCCESSFUL = 1;
var TRADE_STATUS_CANCELLED = 2;

function fetchTradesFromBlockchain() {
  var numTrades = billboard.getTradeIntentionListSize.call().toNumber();
  var trades = []

  for (var i = 0; i < numTrades; i++) {
    trades.push(fetchTradeFromBlockchain(i));
  }

  return trades;
}

function fetchTradeFromBlockchain(tradeID) {
  var tradeObject = billboard.tradeIntentions.call(tradeID);
  var trade = {
    tradeID: tradeID,
    ownerID: parseInt(tradeObject[1], 16), // convert from hex to string
    takerID: parseInt(tradeObject[2], 16), // convert from hex to string
    ownedCard: tradeObject[3],
    wantedCard: tradeObject[4],
    status: tradeObject[5].toNumber()
   };
  return trade;
}

function createTradeOnBlockchain(ownedCard, wantedCard, ownerID, successCallback, failCallback) {
  try {
    var result = billboard.newTradeIntention(ownerID, ownedCard, wantedCard, { from: defaultAccount, value: 0, gas: billboardGas, gasPrice: defaultGasPrice });
    console.log('Success (' + result + ')');

    if (successCallback !== undefined)
      successCallback();
  } catch (err) {
    console.log('Fail:', err);

    if (failCallback !== undefined)
      failCallback();
  }
}

function confirmTradeOnBlockchain(tradeID, takerID, successCallback, failCallback) {
  try {
    var result = billboard.takeTradeIntention(tradeID, takerID, { from: defaultAccount, value: 0, gas: billboardGas, gasPrice: defaultGasPrice });
    console.log('Success');

    if (successCallback !== undefined)
      successCallback();
  } catch (err) {
    console.log('Fail:', err);

    if (failCallback !== undefined)
      failCallback();
  }
}

function cancelTradeOnBlockchain(tradeID, ownerID, successCallback, failCallback) {
  try {
    var result = billboard.cancelTradeIntention(tradeID, ownerID, { from: defaultAccount, value: 0, gas: billboardGas, gasPrice: defaultGasPrice });
    console.log('Success');

    if (successCallback !== undefined)
      successCallback();
  } catch (err) {
    console.log('Fail:', err);

    if (failCallback !== undefined)
      failCallback();
  }
}

function watchNewTrades(callback) {
  console.log('Watching new trades');

  var startBlock = web3.eth.getBlock('latest').number;
  billboard.NewTradeIntention().watch(function(error, result) {
    if (result.blockNumber > startBlock) {
      var trade = {
        tradeID: result.args.id.toNumber(),
        ownerID: parseInt(result.args.owner, 16),
        ownedCard: result.args.cardOffered,
        wantedCard: result.args.cardWanted
      };

      console.log('New trade event:', trade);

      if (callback !== undefined)
        callback(trade);
    }
  });
}

function watchSuccessTrades(callback) {
  console.log('Watching success trades');

  var startBlock = web3.eth.getBlock('latest').number;
  billboard.TakeTradeIntention().watch(function(error, result) {
    if (result.blockNumber > startBlock) {
      var trade = {
        tradeID: result.args.id.toNumber(),
        takerID: parseInt(result.args.taker, 16)
      };

      console.log('Success trade event:', trade);

      if (callback !== undefined)
        callback(trade);
    }
  });
}

function watchCancelTrades(callback) {
  console.log('Watching cancel trades');

  var startBlock = web3.eth.getBlock('latest').number;
  billboard.CancelTradeIntention().watch(function(error, result) {
    if (result.blockNumber > startBlock) {
      var trade = {
        tradeID: result.args.id.toNumber(),
      };

      console.log('Cancel trade event:', trade);

      if (callback !== undefined)
        callback(trade);
    }
  });
}

$(window).on('load', function() {
  console.log('Default account:', defaultAccount);
});
