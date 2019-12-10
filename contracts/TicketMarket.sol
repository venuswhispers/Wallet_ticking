pragma solidity ^0.5.2;
pragma experimental ABIEncoderV2;

import "./TicketFactory.sol";

// Storage
import "./storage/WtConstants.sol";
import "./storage/WtStorage.sol";

import "./Erc20TestToken.sol";
import "./OceanToken.sol";



contract TicketMarket is WtStorage, WtConstants {

    TicketFactory public factory;
    Erc20TestToken public erc20Token;
    OceanToken public oceanToken;


    constructor(address _ticketFactoryContract, address _erc20TestTokenContract, address _oceanTokenContract) public {
        factory = TicketFactory(_ticketFactoryContract);
        erc20Token = Erc20TestToken(_erc20TestTokenContract);
        oceanToken = OceanToken(_oceanTokenContract);
    }


    function testFunc() public returns (bool) {
        return WtConstants.CONFIRMED;
    }

    // @notice owner address of ERC721 token which is specified
    // @param _ticketId is tokenId
    function ownerOfTicket(uint _ticketId) public returns (address) {
        return factory._ownerOf(_ticketId);
    }
    

    // @notice test of inherited mint() from TicketFactory.sol
    function factoryMint() public {
        factory.mint();
    }
    


    /// @notice buys a certificate
    /// @param _ticketId the id of the ticket 
    function buyTicket(uint _ticketId) public {
        _buyTicket(_ticketId, msg.sender);
    }



    function totalSupplyERC20() public view returns (uint256) {
        return oceanToken._totalSupply();
    }
    

    function testTransferFrom(address from, address to, uint256 value) public returns(bool) {
        uint purchasePrice = 10;

        //return erc20Token._transferFrom(from, to, value);
        oceanToken.transferFrom(from, to, value);
        return true;
    }
    

    function testTransfer(address to, uint256 value) public returns(bool) {
        //return erc20Token._transferFrom(from, to, value);
        oceanToken.transfer(to, value);
        return true;
    }


    function getPurchasableTicket(uint ticketId)
        public view returns (PurchasableTicket memory)
    {

        return purchasableTickets[ticketId];
    }


    /**********************
     * internal functions
    ***********************/

    function _buyTicket(uint _ticketId, address buyer) public {
        //PurchasableTicket memory pTicket = getPurchasableTicket(_ticketId);
        uint purchasePrice = 10;

        //IERC20 erc20 = IERC20(erc20Token);
        //erc20Token._transferFrom(buyer, ownerOfTicket(_ticketId), purchasePrice);
        //erc20Token.transferFrom(buyer, factory._ownerOf(_ticketId), purchasePrice);
        //erc20.transferFrom(buyer, factory.ownerOf(_ticketId), pTicket.PurchasePrice);
   
        factory._transferTicketFrom(ownerOfTicket(_ticketId), buyer, _ticketId);
        //factory.transferFrom(factory.ownerOf(_ticketId), buyer, _ticketId);
        
        //_removeTokenAndPrice(_ticketId);

        //unpublishForSale(_ticketId);

        factory.mint();
    }

}
