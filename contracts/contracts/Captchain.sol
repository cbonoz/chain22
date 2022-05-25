//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

// https://covalenthq.notion.site/Chainlink-Example-39506743f5104d0da8a89f7e331fa8c0j
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract Captchain is Ownable, ChainlinkClient {
    using Chainlink for Chainlink.Request;

    event CaptchaAttempt(address _user, address captchaAddress, string name, bool _success);

    // Used for validation
    uint256 private value;
    string private keyword; // Shared variable (possibly could be map)

    uint256 private MARGIN = 100; // Margin of error on value.
    string private API_URL = "https://api.covalenthq.com/v1/pricing/tickers/?quote-currency=USD&format=JSON&tickers=ETH&key="

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    string private name;
    string private callbackUrl;

    constructor(string memory _name, string memory _callbackUrl, string memory _keyword) {
        name = _name;
        keyword = _keyword;

        value = 0; // init value (should be loaded via chainlink call).

        callbackUrl = _callbackUrl;

        setPublicChainlinkToken();
        // BSC Devrel node information.
        // https://market.link/jobs/c314932c-2ee7-449b-b9f7-c2ba8fcf0ad2
        oracle = 0x19f7f3bF88CB208B0C422CC2b8E2bd23ee461DD1;
        jobId = "9b32442f55d74362b26c608c6e9bb80c";
        fee = 0.0001 * 10 ** 18; // (Varies by network and job)
    }

    function compareStrings(string memory a, string memory b) public pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }

    // If a successful attempt, return the callback url.
    // TODO: add rate limiting for failed attempts.
    function attempt(uint256 _value, string memory _keyword) public returns (string memory) {
        bool correct = compareStrings(_keyword, keyword) && _value >= value - MARGIN && _value <= value - MARGIN;
        if (!correct) {
            // Log the failure and raise an exception.
            emit CaptchaAttempt(msg.sender, address(this), name, false);
            require(correct, "Incorrect");
        }
        // Successful scenario (no exception).
        emit CaptchaAttempt(msg.sender, address(this), name, true);
        return callbackUrl;
    }

        function loadValue(string memory _covalentKey) public returns (bytes32 requestId) 
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        string memory url = string.concat(API_URL, _covalentKey);
        
        // Set the URL to perform the GET request using the Covalent API
        request.add("get", url);

        // Parse the response.	
        string[] memory path = new string[](4);
        path[0] = "data";
        path[1] = "items";
        path[2] = "0";
        path[3] = "quote_rate";
        request.addStringArray("path", path);
        
        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }
    
    /**
     * Receive the response in the form of uint256
     */ 
    function fulfill(bytes32 _requestId, uint256 _price) public recordChainlinkFulfillment(_requestId)
    {
        value = _price;
    }

}