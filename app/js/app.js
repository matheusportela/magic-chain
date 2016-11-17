var Web3 = require('web3');
var web3 = new Web3();

$(window).on('load', function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      console.log("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      console.log("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }
  });
});
