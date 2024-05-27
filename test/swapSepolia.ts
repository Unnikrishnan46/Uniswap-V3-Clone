import { expect } from "chai";
import { ethers } from "hardhat";

const WETH9 = "0xfff9976782d46cc05630d1f6ebab18b2324d6b14";
const USDT = "0x58eb19ef91e8a6327fed391b51ae1887b833cc91";

describe("SingleSwapToken",()=>{
  let singleSwapToken;
  let accounts;
  let weth;
  let dai;
  let usdc;

  before(async()=>{
    accounts = await ethers.getSigners()
    console.log("Pass 1");
    
    const SingleSwapToken = await ethers.getContractFactory("TokenSwap");
    singleSwapToken = await SingleSwapToken.deploy();
    // await singleSwapToken.waitForDeployment();
    weth = await ethers.getContractAt("IWETH",WETH9);
    // dai = await ethers.getContractAt("IERC20",DAI);
    usdc = await ethers.getContractAt("IERC20",USDT);
  });

  it("swapExactInputSingle",async()=>{
    const amountIn = BigInt("1000000000000000000");
    // await weth.deposit({value:amountIn});
    await weth.approve(singleSwapToken.address,amountIn);
    console.log("Pass 2");
    
    await singleSwapToken.swapExactInputSingle(WETH9,USDT,amountIn);
    console.log("Success");
    
    // console.log("DAI balance : ",await dai.balanceOf(accounts[0].address));
    console.log("USDC balance : ",await usdc.balanceOf(accounts[0].address).toString());
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

