// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Lottery {
    // entites - owner, players and Winner
    address public owner;
    address payable[] public _playersList;
    address payable public Winner;

    constructor() {
        owner = msg.sender;
    }

    // lottery functions
   function play() public payable  { // onlyowner
    //   require (msg.value >= msg.sender.balance, "Not enough Ether to play.");
      require (msg.value == 1 ether, "Please pay 1 ether.");
       _playersList.push(payable(msg.sender));
    }

    function getBalance() public view returns(uint){ // only owner
        require(owner == msg.sender, "you are not the owner.");
        return address(this).balance;
    }

    // 1. call lottery with ether 2. getBalance() 3. addWinner()
    function pickWinner() public { // onlyOwner
        require (owner == msg.sender, "you are not the owner.");
        require(_playersList.length >= 3, "Not enough players.");

        uint randomNumber = uint(keccak256(abi.encodePacked( block.prevrandao, block.timestamp, _playersList.length))) % _playersList.length;
        Winner = _playersList[randomNumber];  // we pick a winner 

        Winner.transfer(getBalance());
        _playersList = new address payable[](0);
    }
}