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
  let fee;
  let TickL
  let TickU
  let tokenId;

  // let token0Address = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"; // WETH
  // let token1Address = "0xdAC17F958D2ee523a2206206994597C13D831ec7"; // USDT

  // let token0Address = "0x6B175474E89094C44Da98b954EedeAC495271d0F";  // DAI
  // let token1Address = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";  // USDC

  // let token0Address = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";  // USDC
  // let token1Address = "0xdAC17F958D2ee523a2206206994597C13D831ec7";  // USDT

  let token0Address = "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984";  // UNI
  let token1Address = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";  // WETH

    // let token0Address = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";  // USDC
    // let token1Address = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"; // WETH

    // let token0Address = "0x6B175474E89094C44Da98b954EedeAC495271d0F";  // DAI
    // let token1Address = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"; // WETH

  token0Decimal = 18;
  token1Decimal = 18;
  fee = 3000;


  beforeEach(async function () {
    user = await ethers.getSigners();
    const LiquidityManager = await ethers.getContractFactory(
      "LiquidityManager"
    );
    liquidityManager = await LiquidityManager.deploy();
    await liquidityManager.deployed();
    console.log("Pass 1");
    token0Contract = await ethers.getContractAt("IERC20", token0Address);
    token1Contract = await ethers.getContractAt("IERC20", token1Address);
    console.log("Pass 2");
    token0Amount = ethers.utils.parseUnits("1",token0Decimal);
    token1Amount = ethers.utils.parseUnits("100", token1Decimal);

    const uniswapV3Factory = "0x1F98431c8aD98523631AE4a59f267346ea31F984";
    const factoryContract = await ethers.getContractAt(
      "IUniswapV3Factory",
      uniswapV3Factory
    );
    const poolAddress = await factoryContract.getPool(
      token0Address,
      token1Address,
      fee
    );

    const poolContract = await ethers.getContractAt("IUniswapV3Pool",poolAddress);
    const S0 = await poolContract.slot0() as any;
    console.log(S0);
    
var CT = parseInt(S0.tick);
var Tsp = parseInt(await poolContract.tickSpacing() as any);
var NLT = (Math.floor(CT/Tsp))*Tsp;
var NHT = ((Math.floor(CT/Tsp))*Tsp)+Tsp;
TickL = NLT.toString();  //Nearest usable lower tick This would have the current tick range Liquidity
TickU = NHT.toString();  //Nearest usable upper tick   
    
console.log(CT,Tsp,NLT,NHT);

  console.log(TickL,TickU);
  
    console.log("Pass 3");
    await token0Contract.connect(user[0]).approve(liquidityManager.address, ethers.constants.MaxUint256);
    console.log("Pass 4");
    await token1Contract.connect(user[0]).approve(liquidityManager.address, ethers.constants.MaxUint256);
    console.log("Pass 5");
    await token0Contract.connect(user[0]).transfer(liquidityManager.address, token0Amount);
    console.log("Pass 6");
    await token1Contract.connect(user[0]).transfer(liquidityManager.address, token1Amount);
    console.log("Pass 7");
  });
  
  it("mintNewPosition", async function () {
    console.log("mintNewPosition working");
    const amount0ToMint = token0Amount;
    const amount1ToMint = token1Amount;
    console.log("Pass 9 ",amount0ToMint,amount1ToMint);
    const tx = await liquidityManager.mintNewPosition(token0Address,token1Address,amount0ToMint,amount1ToMint,fee,TickL,TickU);
    console.log("Pass 10 ");
    const receipt = await tx.wait();
    // console.log("Pass 11",receipt);
    const events = receipt.events?.filter((x) => x.event == "PositionMinted");
    // console.log("Pass 12 ",events);
    if (events !== undefined && events.length > 0) {
      tokenId = events[0].args["tokenId"].toString();
      console.log(tokenId);
    }
  });
});