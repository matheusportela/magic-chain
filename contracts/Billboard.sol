pragma solidity ^0.4.2;

import "Mortal.sol";

// Contract to manage trade intentions
contract Billboard is Mortal {
    TradeIntention[] public tradeIntentions;

    struct TradeIntention {
        uint id;
        address owner;
        address taker;
        string cardOffered;
        string cardWanted;
        TradeStatus status;
    }

    enum TradeStatus { OPEN, SUCCESSFUL, CANCELLED }

    event NewTradeIntention(uint id, address owner, string cardOffered, string cardWanted);
    event TakeTradeIntention(uint id, address taker);
    event CancelTradeIntention(uint id, address sender);

    function Billboard() {
        // Create trade intention with ID 0 to represent a null trade intention
        newTradeIntention(0, 'null', 'null');
    }

    function newTradeIntention(address owner, string cardOffered, string cardWanted) {
        uint tradeID = tradeIntentions.length++;
        TradeIntention trade = tradeIntentions[tradeID];
        trade.id = tradeID;
        trade.owner = owner;
        trade.cardOffered = cardOffered;
        trade.cardWanted = cardWanted;
        trade.status = TradeStatus.OPEN;
        NewTradeIntention(trade.id, trade.owner, trade.cardOffered, trade.cardWanted);
    }

    function getTradeIntention(uint tradeID) returns (address owner, address taker,
                                                      string cardOffered, string cardWanted,
                                                      TradeStatus status) {
        TradeIntention trade = tradeIntentions[tradeID];
        owner = trade.owner;
        taker = trade.taker;
        cardOffered = trade.cardOffered;
        cardWanted = trade.cardWanted;
        status = trade.status;
    }

    function cancelTradeIntention(uint tradeID, address sender) {
        TradeIntention trade = tradeIntentions[tradeID];
        if (trade.owner == sender) {
            trade.status = TradeStatus.CANCELLED;
            CancelTradeIntention(tradeID, sender);
        }
    }

    function takeTradeIntention(uint tradeID, address taker) {
        TradeIntention trade = tradeIntentions[tradeID];
        if (trade.status == TradeStatus.OPEN) {
            trade.taker = taker;
            trade.status = TradeStatus.SUCCESSFUL;
            TakeTradeIntention(tradeID, taker);
        }
    }

    function getTradeIntentionListSize() returns (uint) {
        return tradeIntentions.length;
    }

    // Refuse receiving ether in this contract
    function () {
        throw;
    }
}
