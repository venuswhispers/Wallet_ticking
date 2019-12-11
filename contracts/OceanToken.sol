pragma solidity ^0.5.2;


//import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

//import 'openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';
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


    // function transferFrom(address from, address to, uint256 value) public returns(bool) {
    //     _transferFrom(from, to, value);
    //     return true;
    // }

    // function transfer(address to, uint256 value) public returns (bool) {
    //     _transfer(to, value);
    //     return true;
    // }

    // function _approve(address spender, uint256 value) public returns(bool) {
    //     return approve(spender, value);
    // }

    // function _totalSupply() public view returns (uint256) {
    //     return totalSupply();
    // }

    // function _balanceOf(address who) public view returns (uint256) {
    //     return balanceOf(who);
    // }

    // function _allowance(address owner, address spender) public view returns (uint256) {
    //     return allowance(owner, spender);
    // }




    // //////////////////////////
    // /// Internal
    // //////////////////////////
    // /**
    // * @dev Transfer token for a specified address
    // * @param to The address to transfer to.
    // * @param value The amount to be transferred.
    // */
    // function _transfer(address to, uint256 value) internal {
    //     _balances[msg.sender] = _balances[msg.sender].sub(value);
    //     _balances[to] = _balances[to].add(value);
    //     emit Transfer(msg.sender, to, value);
    // }

    // /**
    // * @dev Transfer tokens from one address to another
    // * @param from address The address which you want to send tokens from
    // * @param to address The address which you want to transfer to
    // * @param value uint256 the amount of tokens to be transferred
    // */
    // function _transferFrom(
    //     address from,
    //     address to,
    //     uint256 value
    // )
    //     internal
    // {
    //     _balances[from] = _balances[from].sub(value);
    //     _balances[to] = _balances[to].add(value);
    //     _allowed[from][msg.sender] = _allowed[from][msg.sender].sub(value);
    //     emit Transfer(from, to, value);
    // }

    // /**
    // * @dev Internal function that mints an amount of the token and assigns it to
    // * an account. This encapsulates the modification of balances such that the
    // * proper events are emitted.
    // * @param account The account that will receive the created tokens.
    // * @param amount The amount that will be created.
    // */
    // function _mint(address account, uint256 amount) internal {
    //     require(account != address(0));
    //     _totalSupply = _totalSupply.add(amount);
    //     _balances[account] = _balances[account].add(amount);
    //     emit Transfer(address(0), account, amount);
    // }

    // /**
    // * @dev Internal function that burns an amount of the token of a given
    // * account.
    // * @param account The account whose tokens will be burnt.
    // * @param amount The amount that will be burnt.
    // */
    // function _burn(address account, uint256 amount) internal {
    //     require(amount <= _balances[account]);

    //     _totalSupply = _totalSupply.sub(amount);
    //     _balances[account] = _balances[account].sub(amount);
    //     emit Transfer(account, address(0), amount);
    // }

    // /**
    // * @dev Internal function that burns an amount of the token of a given
    // * account, deducting from the sender's allowance for said account. Uses the
    // * internal burn function.
    // * @param account The account whose tokens will be burnt.
    // * @param value The amount that will be burnt.
    // */
    // function _burnFrom(address account, uint256 value) internal {
    //     require(value <= _allowed[account][msg.sender]);

    //     // Should https://github.com/OpenZeppelin/zeppelin-solidity/issues/707 be accepted,
    //     // this function needs to emit an event with the updated approval.
    //     _allowed[account][msg.sender] = _allowed[account][msg.sender].sub(
    //     value);
    //     _burn(account, value);
    // }
}
