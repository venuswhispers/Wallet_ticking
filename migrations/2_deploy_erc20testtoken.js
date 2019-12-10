const Erc20TestToken = artifacts.require("./Erc20TestToken");
let testAccount = '0x718E3ea0B8C2911C5e54Cb4b9B2075fdd87B55a7'

module.exports = function(deployer) {
  deployer.deploy(Erc20TestToken, testAccount);
};
