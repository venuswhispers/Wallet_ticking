pragma solidity ^0.5.0;


contract WtEvents {

    event RegisterTicketPrice(uint256 sellingPriceOfTicket);

    event LogPublishForSale(uint indexed _ticketId, uint _price, address _token);

    event ExampleEvent (
        uint exampleId,
        string exampleName,
        address exampleAddr
    );

}
