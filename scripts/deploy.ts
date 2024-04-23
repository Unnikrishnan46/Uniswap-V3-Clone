import { ethers } from "hardhat";

async function main() {

  // ERC20 BOO TOKEN
  const BooToken = await ethers.getContractFactory("BooToken");
  const booToken = await BooToken.deploy();
  await booToken.waitForDeployment();
  console.log(`BooToken deployed to ${booToken.target}`,);

  // ERC20 LIFE TOKEN
  // const LifeToken = await ethers.getContractFactory("LifeToken");
  // const lifeToken = await LifeToken.deploy();
  // await lifeToken.waitForDeployment();
  // console.log(`LifeToken deployed to ${lifeToken.target}`);

    // SingleSwapToken
    const SingleSwapToken = await ethers.getContractFactory("SingleSwapToken");
    const singleSwapToken = await SingleSwapToken.deploy();
    await singleSwapToken.waitForDeployment();
    console.log(`singleSwapToken deployed to ${singleSwapToken.target}`,);

    // SwapMultiHop
    // const SwapMultiHop = await ethers.getContractFactory("SwapMultiHop");
    // const swapMultiHop = await SwapMultiHop.deploy();
    // await swapMultiHop.waitForDeployment();
    // console.log(`swapMultiHop deployed to ${swapMultiHop.target}`,);

    // LIQUDITY
    const Liqudity = await ethers.getContractFactory("LiquidityExamples");
    const liqudity = await Liqudity.deploy();
    await liqudity.waitForDeployment();
    console.log(`liquidity deployed to ${liqudity.target}`,);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


//0x31403b1e52051883f2Ce1B1b4C89f36034e1221D