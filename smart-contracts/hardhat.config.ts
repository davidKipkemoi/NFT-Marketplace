import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    // Add other networks as needed (e.g., mainnet, goerli)
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
    // Add coinmarketcap: process.env.COINMARKETCAP_API_KEY if you want USD conversion
  },
  // Remove or update the ignition configuration as it's related to the viem toolbox
  // ignition: {
  //   solidityAnalyzer: false,
  // },
};

export default config;
