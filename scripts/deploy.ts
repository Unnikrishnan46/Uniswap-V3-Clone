import { ethers } from "hardhat";

async function main() {

  // ERC20 BOO TOKEN
  // const BooToken = await ethers.getContractFactory("BooToken");
  // const booToken = await BooToken.deploy();
  // await booToken._deployed();
  // console.log(`BooToken deployed to ${booToken.address}`,);

  // ERC20 LIFE TOKEN
  // const LifeToken = await ethers.getContractFactory("LifeToken");
  // const lifeToken = await LifeToken.deploy();
  // await lifeToken.waitForDeployment();
  // console.log(`LifeToken deployed to ${lifeToken.target}`);

    // SingleSwapToken
    const SingleSwapToken = await ethers.getContractFactory("TokenSwap");
    const singleSwapToken = await SingleSwapToken.deploy();
    await singleSwapToken.deployed();
    console.log(`singleSwapToken deployed to ${singleSwapToken.address}`,);

    // SwapMultiHop
    // const SwapMultiHop = await ethers.getContractFactory("SwapMultiHop");
    // const swapMultiHop = await SwapMultiHop.deploy();
    // await swapMultiHop.waitForDeployment();
    // console.log(`swapMultiHop deployed to ${swapMultiHop.target}`,);

    // LIQUDITY
    const Liqudity = await ethers.getContractFactory("LiquidityManager");
    const liqudity = await Liqudity.deploy();
    await liqudity.deployed();
    console.log(`liquidity deployed to ${liqudity.address}`,);

    // TOKEN TRANSFER
    const TokenTransfer = await ethers.getContractFactory("TokenTransfer");
    const tokenTransfer = await TokenTransfer.deploy();
    await tokenTransfer.deployed();
    console.log(`tokenTransfer deployed to ${tokenTransfer.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
