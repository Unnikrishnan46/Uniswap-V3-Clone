import { expect } from "chai";
import { ethers, network } from "hardhat";

describe("LiquidityManager", function () {
  let liquidityManager;
  let token0Contract;
  let token1Contract;
  let token0Decimal;
  let token1Decimal
  let user;
  let token0Amount;
  let token1Amount;
  let tokenId;

  // let token0Address = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"; // WETH
  // let token1Address = "0xdAC17F958D2ee523a2206206994597C13D831ec7"; // USDT

  // let token0Address = "0x6B175474E89094C44Da98b954EedeAC495271d0F";  // DAI
  // let token1Address = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";  // USDC

//   let token0Address = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";  // USDC
//   let token1Address = "0xdAC17F958D2ee523a2206206994597C13D831ec7";  // USDT

  let token0Address = "0x94a9d9ac8a22534e3faca9f4e7f2e2cf85d5e4c8";  // USDC
  let token1Address = "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14";  // WETH

  token0Decimal = 6;
  token1Decimal = 18;


  beforeEach(async function () {
    user = await ethers.getSigners();
    const LiquidityManager = await ethers.getContractFactory(
      "LiquidityManager"
    );
    // liquidityManager = await LiquidityManager.deploy();
    // await liquidityManager.deployed();
    const liquidityManagerAddress = "0x112bc7db7efBcAD8e1801339653638A3ae3215cB";
    liquidityManager = await LiquidityManager.attach(liquidityManagerAddress);
    console.log(liquidityManager.address);
    
    console.log("Pass 1");
    token0Contract = await ethers.getContractAt("IERC20", token0Address);
    token1Contract = await ethers.getContractAt("IERC20", token1Address);
    
    console.log(user[0].address);
    console.log("tokenZero balance : ",await token0Contract.balanceOf(user[0].address));
    console.log("tokenOne balance : ",await token0Contract.balanceOf(user[0].address));

    console.log("Pass 2");
    token0Amount = ethers.utils.parseUnits("1",token0Decimal);
    token1Amount = ethers.utils.parseUnits("1", token1Decimal);
    console.log("Pass 3");
    await token0Contract.connect(user[0]).approve(liquidityManager.address, ethers.constants.MaxUint256);
    console.log("Pass 4");
    await token1Contract.connect(user[0]).approve(liquidityManager.address, ethers.constants.MaxUint256);
    console.log("Pass 5");
    await token0Contract.connect(user[0]).transfer(liquidityManager.address, token0Amount);
    console.log("Pass 6");
    // await token1Contract.connect(user[0]).transfer(liquidityManager.address, token1Amount);
    console.log("Pass 7");
  });
  
  it("mintNewPosition", async function () {
    console.log("mintNewPosition working");
    const amount0ToMint = token0Amount;
    const amount1ToMint = token1Amount;
    console.log("Pass 9 ",amount0ToMint,amount1ToMint);
    const tx = await liquidityManager.mintNewPosition(token0Address,token1Address,amount0ToMint,amount1ToMint,100,-887272,887272);
    console.log("Pass 10 ");
    const receipt = await tx.wait();
    console.log("Pass 11",receipt);
    const events = receipt.events?.filter((x) => x.event == "PositionMinted");
    console.log("Pass 12 ",events);
    if (events !== undefined && events.length > 0) {
      tokenId = events[0].args["tokenId"].toString();
      console.log(tokenId);
    }
  });
});