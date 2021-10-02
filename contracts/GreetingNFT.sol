// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

contract GreetingNFT {
  uint public greetingsCount = 0;
  mapping(uint => Greeting) public greetings;

  struct Greeting {
    uint greetingId;
    string email;
    string message;
    address from;
  }

  constructor() public {}

  function addGreeting(string memory _email, string memory _message) public {
    greetingsCount++;
    greetings[greetingsCount] = Greeting(greetingsCount, _email, _message, msg.sender);
  }
}
