pragma solidity ^0.5.0;


contract WtEvents {

    event RegisterTicketPrice(
        uint256 indexed ticketId,
        bool forSale, 
        uint256 sellingPrice,
        bool isIssued,
        string issuedSignature
    );


    event IssueOnTicket(
        uint256 indexed ticketId, 
        string walletConnectSignature
    );
    


    event ExampleEvent (
        uint exampleId,
        string exampleName,
        address exampleAddr
    );

}
