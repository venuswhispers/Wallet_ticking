pragma solidity ^0.5.2;
pragma experimental ABIEncoderV2;

// Storage
import "./storage/WtConstants.sol";

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


contract TicketFactory is ERC721Full, WtConstants, Ownable {

    constructor(
        string memory name, 
        string memory symbol,
        uint tokenId,
        string memory tokenURI
    ) 
        ERC721Full(name, symbol)
        public 
    {
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }


    function testFunc() public returns (bool) {
        return WtConstants.CONFIRMED;
    }

    function _totalSupply() public view returns (uint256) {
        return totalSupply();
    }
    

}
