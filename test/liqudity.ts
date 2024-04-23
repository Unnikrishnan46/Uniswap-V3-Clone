import { expect } from "chai";
import { ethers, network } from "hardhat";

const DAI = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const DAI_WHALE = "0x4e68Ccd3E89f51C3074ca5072bbAC773960dFa36";
const USDC_WHALE = "0xb4dB55a20E0624eDD82A0Cf356e3488B4669BD27";
// "0x97f991971a37D4Ca58064e6a98FC563F03A71E5c"
describe("LiquidityExamples", () => {
  let liquidityExamples;
  let accounts;
  let dai;
  let usdc;

  before(async () => {
    accounts = await ethers.getSigners();
    const LiquidityExamples = await ethers.getContractFactory(
      "LiquidityExamples"
    );
    liquidityExamples = await LiquidityExamples.deploy();
    await liquidityExamples.waitForDeployment();
    dai = await ethers.getContractAt("IERC20", DAI);
    usdc = await ethers.getContractAt("IERC20", USDC);


    await network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [DAI_WHALE],
    });

    const daiWhale = await ethers.getSigner(DAI_WHALE);

    await network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [USDC_WHALE],
    });

    const usdcWhale = await ethers.getSigner(USDC_WHALE);

    const daiAmount = BigInt("100");
    const usdcAmount = BigInt("1000000");

    console.log(
      "USDC Whale balance before transfer: ",
      (await usdc.balanceOf(usdcWhale.address)).toString()
    );
    console.log("USDC Amount to transfer: ", usdcAmount.toString());

    console.log("DAI Balance : ", await dai.balanceOf(accounts[0].address));
    console.log("USDC Balance : ", await usdc.balanceOf(accounts[0].address));

    // expect(await dai.balanceOf(daiWhale.address)).to.gte(daiAmount);
    expect(await usdc.balanceOf(usdcWhale.address)).to.gte(usdcAmount);
    const balance = await ethers.provider.getBalance(accounts[0]);
    console.log("Ether Balance :", balance);
    console.log("Pass 1");
    // await dai.connect(daiWhale).transfer(accounts[0].address, daiAmount);
    console.log("Pass 2");
    await usdc.connect(usdcWhale).transfer(accounts[0].address, usdcAmount);
    console.log("pass 3");
  });

  it("mintNewPosition", async () => {
    const daiAmount = BigInt("100000000000000000");
    const usdcAmount = BigInt("100000");
    console.log("Pass 4",accounts[0].address);
    await dai.connect(accounts[0]).transfer(liquidityExamples.target, daiAmount);
    console.log("Pass 5");
    await usdc.connect(accounts[0]).transfer(liquidityExamples.target, usdcAmount);
    console.log("Pass 6");
    await liquidityExamples.mintNewPosition();
    console.log("Pass 7");
    console.log(
      "DAI balance after add liquidity : ",
      await dai.balanceOf(accounts[0].address)
    );
    console.log(
      "USDC balance after add liquidity : ",
      await usdc.balanceOf(accounts[0].address)
    );
  });
});
