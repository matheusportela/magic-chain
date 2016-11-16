pragma solidity ^0.4.2;

// Make contract be destroyed and refund remaining ether to its owner
contract Mortal {
  address owner;

  function Mortal() {
    owner = msg.sender;
  }

  function kill() {
    if (msg.sender == owner)
      selfdestruct(owner);
  }
}
