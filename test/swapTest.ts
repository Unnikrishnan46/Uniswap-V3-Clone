import { expect } from "chai";
import { ethers } from "hardhat";

const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const WETH9 = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

describe("SingleSwapToken",()=>{
  let singleSwapToken;
  let accounts;
  let weth;
  let dai;
  let usdc;

  before(async()=>{
    accounts = await ethers.getSigners()
    const SingleSwapToken = await ethers.getContractFactory("TokenSwap");
    singleSwapToken = await SingleSwapToken.deploy();
    // await singleSwapToken.waitForDeployment();
    weth = await ethers.getContractAt("IWETH",WETH9);
    dai = await ethers.getContractAt("IERC20",DAI);
    usdc = await ethers.getContractAt("IERC20",USDC);
  });

  it("swapExactInputSingle",async()=>{
    const amountIn = BigInt("1000000000000000000");
    await weth.deposit({value:amountIn});
    await weth.approve(singleSwapToken.address,amountIn);
    await singleSwapToken.swapExactInputSingle(WETH9,USDC,amountIn);
    console.log("DAI balance : ",await dai.balanceOf(accounts[0].address));
    console.log("USDC balance : ",await usdc.balanceOf(accounts[0].address));
  });

  // it("swapExactInputMultihop",async()=>{
  //   const wethAmountInMax = BigInt("1000000000000000000");
  //   const daiAmountOut = BigInt("100000000000000000000");
  //   await weth.deposit({value:wethAmountInMax});
  //   await weth.approve(singleSwapToken.getAddress(),wethAmountInMax);

  //   await singleSwapToken.swapExactOutputSingle(daiAmountOut,wethAmountInMax);
  //   console.log("Dai balance", await dai.balanceOf(accounts[0].address));
  // })
});

