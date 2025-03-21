
require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */

const SEPOLIA_URL =process.env.SEPOLIA_URL;
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY;

const GANACHE_URL =process.env.GANACHE_URL;
const GANACHE_PRIVATE_KEY = process.env.GANACHE_PRIVATE_KEY;

module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [SEPOLIA_PRIVATE_KEY]
    },
    ganache: {
      url: GANACHE_URL,
      accounts: [GANACHE_PRIVATE_KEY]
    }
  }
};

// npx hardhat compile
// npx hardhat run scripts/deploy.js --network ganache            To deploy the contract on ganache
// npx hardhat run scripts/deploy.js --network sepolia            To deploy the contract on sepolia