// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

contract GreetingNFT {
  uint public templateCount = 0;
  mapping(uint => Template) public templates;
  uint public greetingsCount = 0;
  mapping(uint => Greeting) public greetings;

  struct Template {
    uint templateId;
    string title;
    uint price;
    string imageURL;
    address from;
  }

  event TemplateCreated (
    uint templateId,
    string title,
    uint price,
    string imageURL,
    address from
  );

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

  function addTemplate(string memory _title, uint _price, string memory _imageURL) public {
    templateCount++;
    templates[templateCount] = Template(templateCount, _title, _price, _imageURL, msg.sender);

    emit TemplateCreated(templateCount, _title, _price, _imageURL, msg.sender);
  }

  function addGreeting(string memory _email, string memory _message, string memory _imageURL) public {
    greetingsCount++;
    greetings[greetingsCount] = Greeting(greetingsCount, _email, _message, _imageURL, msg.sender);

    emit GreetingCreated(greetingsCount, _email, _message, _imageURL, msg.sender);
  }
}
