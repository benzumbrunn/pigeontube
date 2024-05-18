// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.20;

contract PigeonTube {
    struct Message {
        uint id;
        string text;
        address author;
        uint blockSubmitted;
        uint valueSent;
    }

    event MessageSubmitted(Message);

    Message[] public messages;
    address payable public previousHighestAddress;
    uint public previousHighestAmount;
    uint public messageCount;

    constructor() {
        previousHighestAddress = payable(msg.sender);
        previousHighestAmount = 0;
        messageCount = 0;
    }

    function getMessages() public view returns (Message[] memory) {
        return messages;
    }

    /* Store a message with value. The author of the previous highest value message receives the funds. */
    function sendMessageWithValue(string calldata incomingText) public payable {
        assert(msg.value > previousHighestAmount); // only accept messages of higher value than the previous sender

        Message memory message = Message({
            id: messageCount++,
            text: incomingText,
            author: msg.sender,
            blockSubmitted: block.number,
            valueSent: msg.value
        });

        messages.push(message);
        // store address and value of current message for next higher value message
        previousHighestAddress.transfer(msg.value);
        previousHighestAmount = msg.value;

        emit MessageSubmitted(message);
    }

    /* Store a message without value. */
    function sendMessage(string calldata message) public {
        messages.push(
            Message({
                id: messageCount++,
                text: message,
                author: msg.sender,
                blockSubmitted: block.number,
                valueSent: 0
            })
        );
    }
}
