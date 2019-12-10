pragma solidity ^0.5.2;

import 'openzeppelin-solidity/contracts/token/ERC20/ERC20Capped.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol';
import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';

/**
 * @dev Example of the ERC20 Token.
 */
contract OceanToken is Ownable, ERC20Detailed, ERC20Capped {

    using SafeMath for uint256;

    uint256 CAP = 1000000000;
    uint256 TOTALSUPPLY = CAP.mul(10 ** 18);

    constructor(address addressOfReceivingTotalSupply)
        public
        ERC20Detailed('OceanToken', 'OCEAN', 18)
        ERC20Capped(TOTALSUPPLY)
        //Ownable()
    {
        _mint(addressOfReceivingTotalSupply, TOTALSUPPLY);
        //_mint(msg.sender, TOTALSUPPLY);
    }


    function _transferFrom(address from, address to, uint256 value) public {
        transferFrom(from, to, value);
    }

    function _transfer(address to, uint256 value) public {
        transfer(to, value);
    }

    function _approve(address spender, uint256 value) public {
        approve(spender, value);
    }

    function _totalSupply() public view returns (uint256) {
        return totalSupply();
    }

    function _balanceOf(address who) public view returns (uint256) {
        return balanceOf(who);
    }

    function _allowance(address owner, address spender) public view returns (uint256) {
        return allowance(owner, spender);
    }
}
