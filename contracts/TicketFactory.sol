pragma solidity ^0.5.2;
pragma experimental ABIEncoderV2;

// Storage
import "./storage/WtConstants.sol";

import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721Enumerable.sol";

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


contract TicketFactory is ERC721, ERC721Enumerable, WtConstants, Ownable {

    constructor() public {}

    function testFunc() public returns (bool) {
        return WtConstants.CONFIRMED;
    }

}
