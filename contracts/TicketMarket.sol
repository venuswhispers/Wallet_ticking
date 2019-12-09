pragma solidity ^0.5.2;
pragma experimental ABIEncoderV2;

import "./TicketFactory.sol";

// Storage
import "./storage/WtConstants.sol";
import "./storage/WtStorage.sol";

import "./Erc20TestToken.sol";

import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";


contract TicketMarket is WtStorage, WtConstants {

    TicketFactory public factory;
    Erc20TestToken public erc20Token;

    constructor(address _ticketFactoryContract, address _erc20TestTokenContract) public {
        factory = TicketFactory(_ticketFactoryContract);
        erc20Token = Erc20TestToken(_erc20TestTokenContract);
    }


    function testFunc() public returns (bool) {
        return WtConstants.CONFIRMED;
    }


    /// @notice buys a certificate
    /// @param _ticketId the id of the ticket 
    function buyTicket(uint _ticketId) public {
        _buyTicket(_ticketId, msg.sender);
    }


    function getPurchasableTicket(uint ticketId)
        public view returns (PurchasableTicket memory)
    {

        return purchasableTickets[ticketId];
    }


    /**********************
     * internal functions
    ***********************/

    function _buyTicket(uint _ticketId, address buyer) internal {
        //PurchasableTicket memory pTicket = getPurchasableTicket(_ticketId);
        uint purchasePrice = 10;

        IERC20 erc20 = IERC20(erc20Token);
        erc20.transferFrom(buyer, factory.ownerOf(_ticketId), purchasePrice);
        //erc20.transferFrom(buyer, factory.ownerOf(_ticketId), pTicket.PurchasePrice);
   

        factory.transferFrom(factory.ownerOf(_ticketId), buyer, _ticketId);
        //_removeTokenAndPrice(_ticketId);

        //unpublishForSale(_ticketId);

        factory.mint();
    }

}
