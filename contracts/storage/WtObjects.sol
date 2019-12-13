pragma solidity ^0.5.0;


contract WtObjects {

    struct PurchasableTicket {
        uint256 ticketId;
        bool forSale;
        uint256 sellingPrice;
        bool isIssued;
        string issuedSignature;
    }


    struct ExampleObject {
        uint exampleId;
        string exampleName;
        address exampleAddr;
    }

}
