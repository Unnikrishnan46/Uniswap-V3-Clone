export const privateKey1 =
  "1fbe1187bc6b0d9330d8d410da29db902fba78c970a1e95c63afdbdf49d3f9c8";
export const privateKey2 =
  "5df13f025665e8384426d6ecc053af0dae1488badc2d03ec280e9d589b49b436";

import booToken from "./BooToken.json";
import lifeToken from "./LifeToken.json";
import singleSwapToken from "./TokenSwap.json";
import swapMultiHop from "./SwapMultiHop.json";
import IWETH from "./IWETH.json";
import ERC20 from "./ERC20.json";
import transferToken from "./TokenTransfer.json"

export const ERC2 = ERC20;

// BOO TOKEN
export const BooTokenAddress = "0xD56e6F296352B03C3c3386543185E9B8c2e5Fd0b";
export const BooTokenABI = booToken.abi;

// LIFE TOKEN
export const LifeTokenAddress = "0x876939152C56362e17D508B9DEA77a3fDF9e4083";
export const LifeTokenABI = lifeToken.abi;

// SINGLESWAPTOKEN
export const SingleSwapTokenAddress =
  "0x82A9286dB983093Ff234cefCea1d8fA66382876B";
export const singleSwapTokenABI = singleSwapToken.abi;


// LIQUIDITY CONTRACT
export const liquidityContractAddress = "0x41219a0a9C0b86ED81933c788a6B63Dfef8f17eE";

// TRANSFER CONTRACT
export const transferContractAddress = "0x1d460d731Bd5a0fF2cA07309dAEB8641a7b175A1";
export const transferContractABI = transferToken.abi

// SWAPMULTIHOP
export const SwapMultiHopAddress = "0xEC7cb8C3EBE77BA6d284F13296bb1372A8522c5F";
export const swapMultiHopABI = swapMultiHop.abi;

// IWETH
export const IWETHAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
export const IWETHABI = IWETH.abi;

// DAI
export const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
export const USDCAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";


// BooToken deployed to 0x24EcC5E6EaA700368B8FAC259d3fBD045f695A08
// LifeToken deployed to 0x876939152C56362e17D508B9DEA77a3fDF9e4083
// singleSwapToken deployed to 0xD56e6F296352B03C3c3386543185E9B8c2e5Fd0b
// swapMultiHop deployed to 0xEC7cb8C3EBE77BA6d284F13296bb1372A8522c5F
