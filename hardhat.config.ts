import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { privateKey1, privateKey2 } from "./constants/constants";


const config: HardhatUserConfig = {
  solidity: {
    version:"0.7.6",
    settings:{
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    }
  },
  networks:{
    hardhat:{
      forking:{
        url:"https://mainnet.infura.io/v3/42237fbfbd2a472c88e935a4bfac5aac"
      },
    }
  },
};

export default config;
