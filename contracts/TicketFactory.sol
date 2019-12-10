pragma solidity ^0.5.2;
pragma experimental ABIEncoderV2;

// Storage
import "./storage/WtConstants.sol";

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


contract TicketFactory is ERC721Full, WtConstants, Ownable {

    uint256 ticketCap = 100;

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


    // @notice owner address of ERC721 token which is specified
    // @param _ticketId is tokenId
    function _ownerOf(uint _ticketId) public returns (address) {
        return ownerOf(_ticketId);
    }


    function mint() public returns (bool)  {

        require (ticketCap <= 100, "Ticket is sold out!");
        
        uint256 _tokenId = _totalSupply() + 1;
        _mint(msg.sender, _tokenId);
    }

    function _transferTicketFrom(address _from, address _to, uint256 _ticketId) public returns (bool) {
        transferFrom(_from , _to, _ticketId);
    }
    


}
