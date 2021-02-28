const ImmoDApp = artifacts.require("ImmoDApp");

module.exports = function(deployer) {
  deployer.deploy(ImmoDApp);
};