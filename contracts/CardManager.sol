pragma solidity ^0.4.2;

import "Mortal.sol";

// Contract to manage card creation and transfers
contract CardManager is Mortal {
  Card[] public cards;

  struct Card {
    uint id;
    string name;
    address owner;
  }

  event NewCard(uint id, string name, address owner);

  function CardManager() {
    // Create card with ID 0 to represent a null card
    newCard('null', 0);
  }

  function newCard(string name, address owner) {
    uint cardID = cards.length++;
    Card card = cards[cardID];
    card.id = cardID;
    card.name = name;
    card.owner = owner;
    NewCard(card.id, card.name, card.owner);
  }

  function getCard(uint cardID) returns (string name, address owner) {
    Card card = cards[cardID];
    name = card.name;
    owner = card.owner;
  }

  // Refuse receiving ether in this contract
  function () {
    throw;
  }
}
