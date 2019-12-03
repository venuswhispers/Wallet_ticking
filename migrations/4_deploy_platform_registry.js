const TicketRegistry = artifacts.require('TicketRegistry')


module.exports = async (deployer) => {
  await deployer.deploy(
    TicketRegistry
  );
}
