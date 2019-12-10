pragma solidity ^0.5.0;


contract WtObjects {

    struct PurchasableTicket {
        bool forSale;
        address acceptedToken;
        uint PurchasePrice;
    }


    struct ExampleObject {
        uint exampleId;
        string exampleName;
        address exampleAddr;
    }

}
