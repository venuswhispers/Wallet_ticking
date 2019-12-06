const TicketFactory = artifacts.require('TicketFactory')


module.exports = async (deployer) => {
  await deployer.deploy(
    TicketFactory
  );
}
