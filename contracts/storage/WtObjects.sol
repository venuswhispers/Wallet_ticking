pragma solidity ^0.5.0;


contract WtObjects {

    struct PurchasableTicket {
        bool forSale;
        uint256 sellingPrice;
    }


    struct ExampleObject {
        uint exampleId;
        string exampleName;
        address exampleAddr;
    }

}
