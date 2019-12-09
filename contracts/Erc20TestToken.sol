pragma solidity ^0.5.2;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract Erc20TestToken is ERC20, ERC20Detailed {

    constructor(address testAccount) ERC20Detailed("TestToken", "TTK", 18) public {
        _mint(msg.sender, 1e18);
        _transfer(msg.sender, testAccount, 1e17);
    }


    function _transferFrom(address from, address to, uint256 value) public returns(bool) {
        transferFrom(from, to, value);
    }
}
