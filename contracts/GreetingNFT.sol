// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

contract GreetingNFT {
  uint public greetingsCount = 0;
  mapping(uint => Greeting) public greetings;

  struct Greeting {
    uint greetingId;
    string email;
    string message;
    string imageURL;
    address from;
  }

  event GreetingCreated (
    uint greetingId,
    string email,
    string message,
    string imageURL,
    address from
  );

  constructor() public {}

  function addGreeting(string memory _email, string memory _message, string memory _imageURL) public {
    greetingsCount++;
    greetings[greetingsCount] = Greeting(greetingsCount, _email, _message, _imageURL, msg.sender);

    emit GreetingCreated(greetingsCount, _email, _message, _imageURL, msg.sender);
  }
}
