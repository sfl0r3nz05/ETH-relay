const path = require("path");
var HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = 'scale rhythm elegant coast regular coil adjust wrap powder tornado sheriff say';

module.exports = {
  contracts_build_directory: path.join(__dirname, "../server/contracts"),
  networks: {
    ropsten: {
      provider: function () {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/ID")
      },
      network_id: 3
    }
  }
};