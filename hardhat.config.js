require("@nomicfoundation/hardhat-toolbox");
require("@thirdweb-dev/hardhat-deploy");

const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    ethereum: {
      url:
        process.env.ETHEREUM_RPC_URL ||
        "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID",
      accounts: process.env.PRIVATE_KEY
        ? [process.env.PRIVATE_KEY]
        : [],
    },
    polygon: {
      url:
        process.env.POLYGON_RPC_URL ||
        "https://polygon-mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID",
      accounts: process.env.PRIVATE_KEY
        ? [process.env.PRIVATE_KEY]
        : [],
    },
  },
  thirdweb: {
    deployer: {
      default: process.env.WALLET_ADDRESS,
    },
  },
};
