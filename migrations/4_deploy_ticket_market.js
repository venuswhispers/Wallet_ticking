const TicketFactory = artifacts.require('TicketFactory')
let ticketFactoryContract = TicketFactory.address

const Erc20TestToken = artifacts.require('Erc20TestToken')
let erc20TestTokenContract = Erc20TestToken.address
console.log('=== erc20TestTokenContract ===', erc20TestTokenContract)

const OceanToken = artifacts.require('OceanToken')
let oceanTokenContract = OceanToken.address
console.log('=== oceanTokenContract ===', oceanTokenContract)

const TicketMarket = artifacts.require('TicketMarket')


module.exports = async (deployer) => {
  await deployer.deploy(
    TicketMarket,
    ticketFactoryContract,
    erc20TestTokenContract,
    oceanTokenContract
  );
}
