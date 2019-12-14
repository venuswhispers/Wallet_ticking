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
        bool isIssued,
        string walletConnectSignature
    );

    event SaveAddtionalIssuedInfo(
        uint256 indexed ticketId,
        address ticketOwner,
        uint256 issuedTimestamp,
        string issuedTxHash
    );


    event ExampleEvent (
        uint exampleId,
        string exampleName,
        address exampleAddr
    );

}
