var Ownable = artifacts.require("./zeppelin/ownership/Ownable.sol");
var StarMarket = artifacts.require("./StarMarket.sol");

module.exports = function(deployer) {
  deployer.link(Ownable, StarMarket);
  deployer.deploy(StarMarket);
};
