import { expect } from "chai";
import { ethers } from "hardhat";



const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const WETH9 = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

describe("TokenTransfer",()=>{
  let tokenTransfer;
  let accounts;
  let weth;
  let dai;
  let usdc;

  before(async()=>{
    accounts = await ethers.getSigners();
    const TokenTransfer = await ethers.getContractFactory("TokenTransfer");
    tokenTransfer = await TokenTransfer.deploy();
    weth = await ethers.getContractAt("IWETH",WETH9);
    dai = await ethers.getContractAt("IERC20",DAI);
    usdc = await ethers.getContractAt("IERC20",USDC);
  });

  it("TokenTransfer",async()=>{
    console.log(`Dai balance in ${accounts[1].address}`, await dai.balanceOf(accounts[1].address));
    console.log("Pass 1");
    await dai.approve(await tokenTransfer.address,2);
    console.log("Pass 2");
    // const tx = await tokenTransfer.transferToken(DAI,accounts[1].address,2);
    // console.log(tx);
    console.log(`Dai balance in ${accounts[1].address}`, await dai.balanceOf("0x70997970C51812dc3A010C7d01b50e0d17dc79C8"));
  });
});
