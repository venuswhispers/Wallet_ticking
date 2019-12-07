pragma solidity ^0.5.2;
pragma experimental ABIEncoderV2;

import "./TicketFactory.sol";

// Storage
import "./storage/WtConstants.sol";
import "./storage/WtStorage.sol";


contract TicketMarket is ERC721Full, WtConstants, WtStorage, Ownable {

    TicketFactory public factory;

    constructor(address _ticketFactoryContract) public {
        factory = TicketFactory(_ticketFactoryContract);
    }


    function testFunc() public returns (bool) {
        return WtConstants.CONFIRMED;
    }


    /// @notice buys a certificate
    /// @param _certificateId the id of the certificate
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
        PurchasableTicket memory pTicket = getPurchasableCertificate(_ticketId);

        IERC20 erc20 = IERC20(_erc20TestToken);
        erc20.transferFrom(buyer, factory.ownerOf(_ticketId), pTicket.PurchasePrice);
   

        factory.transferFrom(factory.ownerOf(_ticketId), buyer, _ticketId);
        //_removeTokenAndPrice(_ticketId);

        //unpublishForSale(_ticketId);
    }

}
