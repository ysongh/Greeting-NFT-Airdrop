const GreetingNFT = artifacts.require("GreetingNFT");

module.exports = function (deployer) {
  deployer.deploy(GreetingNFT);
};
