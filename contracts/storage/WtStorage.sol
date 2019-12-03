pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

import "./WtObjects.sol";
import "./WtEvents.sol";


// shared storage
contract WtStorage is WtObjects, WtEvents, Ownable {

    //mapping(uint256 => CreateLoan) public loans;  // Notice: This is from CreateLoan.sol

    mapping (uint => ExampleObject) examples;

}

