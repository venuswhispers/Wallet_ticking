pragma solidity ^0.5.2;
pragma experimental ABIEncoderV2;

// Storage
import "./storage/WtConstants.sol";

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


contract TicketRegistry is Ownable, WtConstants {

    constructor() public {}

    function testFunc() public returns (bool) {
        return WtConstants.CONFIRMED;
    }

}
