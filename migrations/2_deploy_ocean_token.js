const OceanToken = artifacts.require('OceanToken');

let addressOfReceivingTotalSupply = '0x718E3ea0B8C2911C5e54Cb4b9B2075fdd87B55a7';

module.exports = async (deployer) => {
  await deployer.deploy(OceanToken, addressOfReceivingTotalSupply, );
}
