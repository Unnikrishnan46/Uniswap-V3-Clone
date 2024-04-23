import { imagePaths } from "@/constants/imagePaths";

export const contractAddress = {
  mainnet: [
    {
      name:"Ether",
      symbol: "ETH",
      ETH: "0x0000000000000000000000000000000000000000",
      address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      icon:imagePaths.ethereum
    },
    {
      name:"Wrapped Ether",
      symbol: "WETH",
      WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      icon:imagePaths.weth
    },
    {
      name:"USDC Token",
      symbol: "USDC",
      USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      icon:imagePaths.usdc
    },
    {
      name:"DAI Token",
      symbol: "DAI",
      DAI: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      icon:imagePaths.dai
    },
    {
      name:"USDT Token",
      symbol: "USDT",
      USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      icon:imagePaths.usdt
    },
  ],
  sepolia: [
    {
        name:"Ether",
        symbol: "ETH",
        ETH: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
        address: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
        icon:imagePaths.ethereum
      },
    {
      name:"Wrapped Ether",
      symbol: "WETH",
      WETH: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
      address: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
      icon:imagePaths.weth
    },
    {
      name:"USDC Token",
      symbol: "USDC",
      USDC: "0x6f14C02Fc1F78322cFd7d707aB90f18baD3B54f5",
      address: "0x6f14C02Fc1F78322cFd7d707aB90f18baD3B54f5",
      icon:imagePaths.usdc
    },
    {
      name:"DAI Token",
      symbol: "DAI",
      DAI: "0x7AF17A48a6336F7dc1beF9D485139f7B6f4FB5C8",
      address: "0x7AF17A48a6336F7dc1beF9D485139f7B6f4FB5C8",
      icon:imagePaths.dai
    },
    {
      name:"ChainLink Token",
      symbol: "LINK",
      LINK: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
      address: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
      icon:imagePaths.link
    },
  ],
};
