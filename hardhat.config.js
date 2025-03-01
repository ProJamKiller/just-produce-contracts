require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { PRIVATE_KEY, OPTIMISM_RPC_URL, OPTIMISM_API_KEY } = process.env;

module.exports = {
  solidity: {
    version: "0.8.19", // Matches MojoClaim.sol
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    optimism: {
      url: OPTIMISM_RPC_URL || "https://mainnet.optimism.io",
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 10,
    },
  },
  etherscan: {
    apiKey: {
      optimism: OPTIMISM_API_KEY,
    },
    customChains: [
      {
        network: "optimism",
        chainId: 10,
        urls: {
          apiURL: "https://api-optimistic.etherscan.io/api",
          browserURL: "https://optimistic.etherscan.io",
        },
      },
    ],
  },
  paths: {
    sources: "./contracts",      // Matches your contracts/ folder
    scripts: "./scripts",        // Matches your scripts/ folder
    cache: "./cache",           // Default cache location
    artifacts: "./artifacts",   // Matches your artifacts/ folder
    tests: "./test",            // Add this folder if you plan to write tests
  },
};