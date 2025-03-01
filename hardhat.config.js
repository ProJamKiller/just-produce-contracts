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
    // Local Hardhat network for testing
    hardhat: {
      chainId: 31337,
    },
    // Optimism Mainnet (for Hardhat compatibility, optional for Thirdweb CLI)
    optimism: {
      url: OPTIMISM_RPC_URL || "https://mainnet.optimism.io",
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 10,
    },
  },
  // For verifying contracts on Optimism Etherscan
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
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};