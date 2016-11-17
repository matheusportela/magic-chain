pragma solidity ^0.4.2;

import "Mortal.sol";

// Contract to manage trade intentions
contract Billboard is Mortal {
    TradeIntention[] public tradeIntentions;

    struct TradeIntention {
        uint id;
        address owner;
        string cardOffered;
        string cardWanted;
    }

    event NewTradeIntention(uint id, address owner, string cardOffered, string cardWanted);

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
        NewTradeIntention(trade.id, trade.owner, trade.cardOffered, trade.cardWanted);
    }

    function getTradeIntention(uint tradeID) returns (address owner, string cardOffered, string cardWanted) {
        TradeIntention trade = tradeIntentions[tradeID];
        owner = trade.owner;
        cardOffered = trade.cardOffered;
        cardWanted = trade.cardWanted;
    }

    // Refuse receiving ether in this contract
    function () {
        throw;
    }
}
