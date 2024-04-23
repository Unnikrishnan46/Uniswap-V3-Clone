import { expect } from "chai";
import { ethers, network } from "hardhat";

describe("LiquidityManager", function () {
  let liquidityManager;

  let daiWhale;
  let usdcWhale;
  let daiContract;
  let usdcContract;
  let user;
  let usdcAmount;
  let daiAmount;
  let tokenId;

  // Replace this with the address of a DAI whale on the Ethereum mainnet
  const daiWhaleAddress = "0x97f991971a37D4Ca58064e6a98FC563F03A71E5c";
  const usdcWhaleAddress = "0x7713974908Be4BEd47172370115e8b1219F4A5f0";

  beforeEach(async function () {
    user = await ethers.getSigners();
    console.log("Pass 1 ",user[0].address);
    await network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [daiWhaleAddress],
    });

    await network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [usdcWhaleAddress],
    });
    console.log("Pass 2");
    const LiquidityManager = await ethers.getContractFactory(
      "LiquidityManager"
    );
    liquidityManager = await LiquidityManager.deploy();
    await liquidityManager.waitForDeployment()
    const dai = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    const usdc = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
    console.log("Pass 3");
    // Approve the contract to spend DAI on behalf of the whale
    daiContract = await ethers.getContractAt("IERC20", dai);
    daiWhale = await ethers.getSigner(daiWhaleAddress);
    usdcWhale = await ethers.getSigner(usdcWhaleAddress);
    usdcContract = await ethers.getContractAt("IERC20", usdc);
    console.log("Pass 4");
    daiAmount = ethers.parseEther("1");
    usdcAmount = ethers.parseUnits("100", 6);
    console.log("Pass 5");
    await daiContract.connect(daiWhale).transfer(user[0].address, daiAmount);
    console.log("Pass GG");
    await usdcContract.connect(usdcWhale).transfer(user[0].address, usdcAmount);
    console.log("Pass 6 ");
    await daiContract
      .connect(user[0])
      .approve(liquidityManager.target, ethers.MaxUint256);
    await usdcContract
      .connect(user[0])
      .approve(liquidityManager.target, ethers.MaxUint256);
      console.log("Pass 7");
    // transfer DAI and USDC to the contract
    daiAmount = ethers.parseEther("1");
    usdcAmount = ethers.parseUnits("100", 6);
    await daiContract
      .connect(user[0])
      .transfer(liquidityManager.target, daiAmount);
    await usdcContract
      .connect(user[0])
      .transfer(liquidityManager.target, usdcAmount);
      console.log("Pass 8");
  });
  
  it("should create a deposit for an ERC721 token", async function () {
    // Mint a new position
    console.log("Pass 9");
    const tx = await liquidityManager.mintNewPosition();
    console.log("Pass 10 ");
    const receipt = await tx.wait();
    console.log("Pass 11",receipt);
    const events = receipt.events?.filter((x) => x.event == "PositionMinted");
    console.log("Pass 12 ",events);
    if (events !== undefined && events.length > 0) {
      // At least one PositionMinted was emitted
      console.log("Pass 13");
      console.log("success");
      tokenId = events[0].args["tokenId"].toString();
      console.log(tokenId);
      // let collesctFee = await liquidityManager.collectAllFees(tokenId);
      // console.log(collesctFee);
    }

    console.log("Pass 14");
    // Get the deposit for the newly minted token
    // const deposit = await liquidityManager.deposits(tokenId);
    // // Check that the deposit was created correctly
    // console.log(deposit);

    // expect(deposit.owner).to.equal(await user[0].getAddress());
    // expect(deposit.liquidity).to.gt(0);
    // expect(deposit.token0).to.equal(
    //   "0x6B175474E89094C44Da98b954EedeAC495271d0F"
    // );
    // expect(deposit.token1).to.equal(
    //   "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
    // );
  });
});