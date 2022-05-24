//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Captchain is Ownable {

    event CaptchaAttempt(address _user, address captchaAddress, string customId, bool _success);

    string private name;
    string private customId;
    string private result; // Shared variable (possibly could be map)
    string private callbackUrl;

    constructor(string memory _name, string memory _customId, string memory _callbackUrl, string memory _initialResult) {
        name = _name;
        result = _initialResult;
        callbackUrl = _callbackUrl;
        customId = _customId;
    }

    function compareStrings(string memory a, string memory b) public pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }

    // If a successful attempt, return the callback url.
    function attempt(string memory _result) public returns (string memory) {
        bool correct = compareStrings(_result, result); // TODO: set result dynamically.
        if (!correct) {
            // Log the failure and raise an exception.
            emit CaptchaAttempt(msg.sender, address(this), customId, false);
            require(correct, "Incorrect");
        }
        // Successful scenario (no exception).
        emit CaptchaAttempt(msg.sender, address(this), customId, true);
        return callbackUrl;
    }

}