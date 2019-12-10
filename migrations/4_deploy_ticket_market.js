const TicketFactory = artifacts.require('TicketFactory')
let ticketFactoryContract = TicketFactory.address

const Erc20TestToken = artifacts.require('Erc20TestToken')
let erc20TestTokenContract = Erc20TestToken.address

const OceanToken = artifacts.require('OceanToken')
let oceanTokenContract = OceanToken.address

const TicketMarket = artifacts.require('TicketMarket')


module.exports = async (deployer) => {
  await deployer.deploy(
    TicketMarket,
    ticketFactoryContract,
    erc20TestTokenContract,
    oceanTokenContract
  );
}
