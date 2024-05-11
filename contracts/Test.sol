// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract Test {

    struct Message {
        string text;
        address author;
        uint blockSubmitted;
    }

    address private owner;
    Message[] public messages;

    constructor() {
        owner = msg.sender;
    }

    function getMessages() view public returns (Message[] memory) {
        return messages;
    }

    function sendMessage(string calldata message) public {
        messages.push(Message({text: message, author: msg.sender, blockSubmitted: block.number}));
    }

    function getOwner() view public returns (address) {
        return owner;
    }
}
