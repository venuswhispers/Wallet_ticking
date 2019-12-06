const TicketFactory = artifacts.require('TicketFactory')

const name = "WcTicket";
const symbol = "TCK";
const tokenId = 1;
const tokenURI = "http://localhost:3000";
//const tokenURI = "https://ipfs.io/ipfs/QmYMYdJqSrTNB3iwXzmYfGdjAymuXvHAJuum9zzT7RV7N1";

module.exports = async (deployer) => {
  await deployer.deploy(
    TicketFactory,
    name,
    symbol,
    tokenId,
    tokenURI
  );
}
