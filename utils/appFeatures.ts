import {
  BooTokenABI,
  BooTokenAddress,
  DAIAddress,
  ERC2,
  IWETHABI,
  IWETHAddress,
  LifeTokenABI,
  LifeTokenAddress,
  SingleSwapTokenAddress,
  SwapMultiHopAddress,
  liquidityContractAddress,
  singleSwapTokenABI,
  swapMultiHopABI,
  transferContractABI,
  transferContractAddress,
} from "@/constants/constants";
import { ethers } from "ethers";
import { Token } from "@uniswap/sdk-core";
import {
  Pool,
  computePoolAddress,
  FeeAmount,
  Tick,
} from "@uniswap/v3-sdk";
import IUniswapV3Pool from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import INONFUNGIBLE_POSITION_MANAGER from "@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json";
import FactoryAbi from "@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json";
import LiquidityManager from "@/constants/LiquidityManager.json";
import axios from "axios";
import { getTokenAmounts } from "./priceHelpers";
import { getChartData, suii } from "./fetchChartData";
import { unixToDate } from "./date";
import { CoinList, HistoricalChart, SingleCoin } from "./api";

const connectingWithBooToken = async () => {
  try {
    const provider = await new ethers.providers.JsonRpcProvider(
      "http://127.0.0.1:8545/"
    );
    const signers = await provider.getSigner();
    const contractInstance = new ethers.Contract(
      BooTokenAddress,
      BooTokenABI,
      signers
    );
    return contractInstance;
  } catch (error) {
    // console.log(error);
  }
};

const connectingWithLifeToken = async () => {
  try {
    const provider = await new ethers.providers.JsonRpcProvider(
      "http://127.0.0.1:8545/"
    );
    const signers = await provider.getSigner();
    const contractInstance = new ethers.Contract(
      LifeTokenAddress,
      LifeTokenABI,
      signers
    );
    return contractInstance;
  } catch (error) {
    // console.log(error);
  }
};

const connectingWithSingleSwapToken = async () => {
  try {
    const provider = await new ethers.providers.JsonRpcProvider(
      "http://127.0.0.1:8545/"
    );
    const signers = await provider.getSigner();
    const contractInstance = new ethers.Contract(
      SingleSwapTokenAddress,
      singleSwapTokenABI,
      signers
    );
    return contractInstance;
  } catch (error) {
    // console.log(error);
  }
};

const connectingWithSwapMultiHop = async () => {
  try {
    const provider = await new ethers.providers.JsonRpcProvider(
      "http://127.0.0.1:8545/"
    );
    const signers = await provider.getSigner();
    const contractInstance = new ethers.Contract(
      SwapMultiHopAddress,
      swapMultiHopABI,
      signers
    );
    return contractInstance;
  } catch (error) {
    // console.log(error);
  }
};

const connectingWithIWETHToken = async () => {
  try {
    const provider = await new ethers.providers.JsonRpcProvider(
      "http://127.0.0.1:8545/"
    );
    const signers = await provider.getSigner();
    const contractInstance = new ethers.Contract(
      IWETHAddress,
      IWETHABI,
      signers
    );
    return contractInstance;
  } catch (error) {
    // console.log(error);
  }
};

const connectingWithDaiToken = async () => {
  try {
    const provider = await new ethers.providers.JsonRpcProvider(
      "http://127.0.0.1:8545/"
    );
    const signers = await provider.getSigner();
    const contractInstance = new ethers.Contract(
      "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      IWETHABI,
      signers
    );
    return contractInstance;
  } catch (error) {
    // console.log(error);
  }
};

const connectingWithNthToken = async (tokenAddress) => {
  try {
    const provider = await new ethers.providers.JsonRpcProvider(
      "http://127.0.0.1:8545/"
    );
    const signers = await provider.getSigner();
    const contractInstance = new ethers.Contract(
      tokenAddress,
      IWETHABI,
      signers
    );
    return contractInstance;
  } catch (error) {
    // console.log(error);
  }
};



const checkTokenBalance = async (tokenInData, amountIn) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider({
      url: "http://127.0.0.1:8545/",
    });
    const signers = await provider.getSigner();
    const signerAddress = await signers.getAddress();
    const etherBal = await provider.getBalance(signerAddress.toString());
    const convertedEthBal = await ethers.utils.formatEther(etherBal.toString());
    const tokenInContract = await connectingWithNthToken(tokenInData.address);
    const tokenInBalance = await tokenInContract.balanceOf(signerAddress);
    const convertedTokenInBal = await ethers.utils.formatUnits(
      tokenInBalance.toString(),
      tokenInData.decimal
    );
    if (
      tokenInData.address === IWETHAddress &&
      Math.floor(parseInt(convertedEthBal)) >= amountIn
    ) {
      return { success: true, balance: convertedTokenInBal };
    }
    if (convertedTokenInBal < amountIn) {
      return { success: false, balance: convertedTokenInBal };
    } else if (convertedTokenInBal > amountIn) {
      return { success: true, balance: convertedTokenInBal };
    }
  } catch (error) {
    // console.log(error);
  }
};

const singleSwapToken = async (tokenInData, tokenOutData, amountIn) => {
  let response;
  try {
    const checkBal = await checkTokenBalance(tokenInData, amountIn);
    if (checkBal.success) {
      if(tokenInData.symbol === "ETH" && tokenOutData.symbol === "WETH"){
        await swapETHToken(
          tokenInData.address,
          tokenOutData.address,
          amountIn
        ).then((res) => {
          response = res;
        });  
      }else{
      switch (tokenInData.address) {
        case DAIAddress:
          await swapDAIToken(
            tokenInData.address,
            tokenOutData.address,
            amountIn
          ).then((res) => {
            response = res;
          });
          break;
        case IWETHAddress:
          await swapWETHToken(
            tokenInData.address,
            tokenOutData.address,
            amountIn
          ).then((res) => {
            response = res;
          });
          break;
        default:
          await defaultSwapToken(tokenInData, tokenOutData, amountIn).then(
            (res) => {
              response = res;
            }
          );
          break;
      }
    }
    }
    if (response) {
      return response;
    }
  } catch (error) {
    // console.log(error);
  }
};

const swapETHToken = async (tokenIn, tokenOut, amountIn) => {
  try {
    const provider = await new ethers.providers.JsonRpcProvider(
      "http://127.0.0.1:8545/"
    );
    const signers = await provider.getSigner();
    const signerAddress = await signers.getAddress();
    const tokenInContract = await connectingWithNthToken(tokenIn);
    const tokenOutContract = await connectingWithNthToken(tokenOut);
    const singleSwapToken = await connectingWithSingleSwapToken();
    const decimal0 = 18;
    const convertedAmountIn = await ethers.utils.parseUnits(
      amountIn.toString(),
      decimal0
    );
    const transaction = await tokenInContract.deposit({ value: convertedAmountIn });
    await tokenInContract.approve(
      await singleSwapToken.address,
      convertedAmountIn
    );
    // const transaction = await singleSwapToken.swapExactInputSingle(
    //   tokenIn,
    //   tokenOut,
    //   convertedAmountIn
    // );

    // await transaction.wait();
    const balance = await tokenOutContract.balanceOf(signerAddress);
    const convertedBalance = await ethers.utils.formatEther(balance.toString());
    return {
      status: "success",
      transaction: transaction,
      tokenOutBal: convertedBalance,
    };
  } catch (error) {
    // console.log(error);
  }
};

const swapWETHToken = async (tokenIn, tokenOut, amountIn) => {
  try {
    const provider = await new ethers.providers.JsonRpcProvider(
      "http://127.0.0.1:8545/"
    );
    const signers = await provider.getSigner();
    const signerAddress = await signers.getAddress();
    const tokenInContract = await connectingWithNthToken(tokenIn);
    const tokenOutContract = await connectingWithNthToken(tokenOut);
    const singleSwapToken = await connectingWithSingleSwapToken();
    const decimal0 = 18;
    const convertedAmountIn = await ethers.utils.parseUnits(
      amountIn.toString(),
      decimal0
    );
    await tokenInContract.deposit({ value: convertedAmountIn });
    await tokenInContract.approve(
      await singleSwapToken.address,
      convertedAmountIn
    );
    const transaction = await singleSwapToken.swapExactInputSingle(
      tokenIn,
      tokenOut,
      convertedAmountIn
    );

    await transaction.wait();
    const balance = await tokenOutContract.balanceOf(signerAddress);
    const convertedBalance = await ethers.utils.formatEther(balance.toString());
    return {
      status: "success",
      transaction: transaction,
      tokenOutBal: convertedBalance,
    };
  } catch (error) {
    // console.log(error);
  }
};

const swapDAIToken = async (tokenIn, tokenOut, amountIn) => {
  try {
    const provider = await new ethers.providers.JsonRpcProvider(
      "http://127.0.0.1:8545/"
    );
    const signers = await provider.getSigner();
    const signerAddress = await signers.getAddress();
    const tokenInContract = await connectingWithNthToken(tokenIn);
    const tokenOutContract = await connectingWithNthToken(tokenOut);
    const singleSwapToken = await connectingWithSingleSwapToken();
    const decimal0 = 18;
    const convertedAmountIn = await ethers.utils.parseUnits(
      amountIn.toString(),
      decimal0
    );
    await tokenInContract.approve(
      await singleSwapToken.address,
      convertedAmountIn
    );
    const transaction = await singleSwapToken.swapExactInputSingle(
      tokenIn,
      tokenOut,
      convertedAmountIn
    );
    await transaction.wait();
    const balance = await tokenOutContract.balanceOf(signerAddress);
    const convertedBalance = await ethers.utils.formatEther(balance.toString());
    return {
      status: "success",
      transaction: transaction,
      tokenOutBal: convertedBalance,
    };
  } catch (error) {
    // console.log(error);
  }
};

const defaultSwapToken = async (tokenIn, tokenOut, amountIn) => {
  try {
    const provider = await new ethers.providers.JsonRpcProvider(
      "http://127.0.0.1:8545/"
    );
    const signers = await provider.getSigner();
    const signerAddress = await signers.getAddress();
    const tokenInContract = await connectingWithNthToken(tokenIn.address);
    const tokenOutContract = await connectingWithNthToken(tokenOut.address);
    const singleSwapToken = await connectingWithSingleSwapToken();
    const decimal0 = tokenIn.decimal;
    const convertedAmountIn = await ethers.utils.parseUnits(
      amountIn.toString(),
      6
    );
    // await tokenInContract.deposit({ value: convertedAmountIn.toString() });
    await tokenInContract.approve(
      await singleSwapToken.address,
      convertedAmountIn
    );
    const transaction = await singleSwapToken.swapExactInputSingle(
      tokenIn.address,
      tokenOut.address,
      convertedAmountIn
    );
    await transaction.wait();
    const balance = await tokenOutContract.balanceOf(signerAddress);
    const convertedBalance = await ethers.utils.formatUnits(
      balance.toString(),
      tokenOut.decimal
    );
    return {
      status: "success",
      transaction: transaction,
      tokenOutBal: convertedBalance,
    };
  } catch (error) {
    // console.log(error);
  }
};

const getTokenInBal = async (tokenInData) => {
  try {
    const provider = await new ethers.providers.JsonRpcProvider(
      "http://127.0.0.1:8545/"
    );
    const signers = await provider.getSigner();
    const signerAddress = await signers.getAddress();
    const etherBal = await signers.provider.getBalance(signerAddress);
    const convertedEthBal = await ethers.utils.formatEther(etherBal.toString());
    if (tokenInData?.address && tokenInData?.symbol !== "ETH") {
      const tokenInContract = await connectingWithNthToken(tokenInData.address);
      const tokenInBalance = await tokenInContract.balanceOf(signerAddress);
      const convertedTokenInBal = await ethers.utils.formatUnits(
        tokenInBalance.toString(),
        tokenInData.decimal
      );
      return parseFloat(convertedTokenInBal).toFixed(2);
    } else if (tokenInData?.symbol === "ETH") {
      return parseFloat(convertedEthBal).toFixed(2);
    }
  } catch (error) {
    // console.log(error);
  }
};

const getTokenOutBal = async (tokenOutData) => {
  try {
    const provider = await new ethers.providers.JsonRpcProvider(
      "http://127.0.0.1:8545/"
    );
    const signers = await provider.getSigner();
    const signerAddress = await signers.getAddress();
    const etherBal = await signers.provider.getBalance(signerAddress);
    const convertedEthBal = await ethers.utils.formatEther(etherBal.toString());
    if (tokenOutData?.address && tokenOutData?.symbol !== "ETH") {
      const tokenOutContract = await connectingWithNthToken(
        tokenOutData?.address
      );
      const tokenOutBalance = await tokenOutContract.balanceOf(signerAddress);
      const convertedTokenOutBal = await ethers.utils.formatUnits(
        tokenOutBalance.toString(),
        tokenOutData.decimal
      );
      return parseFloat(convertedTokenOutBal).toFixed(2);
    } else if (tokenOutData?.symbol === "ETH") {
      return parseFloat(convertedEthBal).toFixed(2);
    }
  } catch (error) {
    // console.log(error);
  }
};

const pleaseDude = async () => {
  const provider = await new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545/"
  );
  const signers = await provider.getSigner();
  const uniswapV3Factory = "0x1F98431c8aD98523631AE4a59f267346ea31F984";
  const WETH9 = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
  const tokenOne = new Token(1, WETH9, 18);
  const tokenTwo = new Token(1, USDC, 6);

  const token0: Token = tokenOne;
  const token1: Token = tokenTwo;
  const fee: FeeAmount = 500;
  const POOL_FACTORY_CONTRACT_ADDRESS: string =
    "0x1F98431c8aD98523631AE4a59f267346ea31F984";

  const currentPoolAddress = computePoolAddress({
    factoryAddress: POOL_FACTORY_CONTRACT_ADDRESS,
    tokenA: token0,
    tokenB: token1,
    fee: fee,
  });

  const poolContract = new ethers.Contract(
    currentPoolAddress,
    IUniswapV3Pool.abi,
    signers
  );
  const [liquidity, slot0] = await Promise.all([
    poolContract.liquidity(),
    poolContract.slot0(),
  ]);

  const configuredPool = new Pool(
    token0,
    token1,
    fee,
    slot0.sqrtPriceX96.toString(),
    liquidity.toString(),
    slot0.tick
  );
};

const handleAddLiquidity = async (
  token0Data,
  token1Data,
  amount0ToMint,
  amount1ToMint,
  selectedPercentage,
  lowPrice,
  highPrice
) => {
  try {
    const provider = await new ethers.providers.JsonRpcProvider(
      "http://127.0.0.1:8545/"
    );
    const signers = await provider.getSigner();
    const liquidityContract = await new ethers.Contract(
      liquidityContractAddress,
      LiquidityManager.abi,
      signers
    );
    const signerAddress = await signers.getAddress();
    const token0Contract = await new ethers.Contract(
      token0Data.address,
      ERC2.abi,
      signers
    );
    const token1Contract = await new ethers.Contract(
      token1Data.address,
      ERC2.abi,
      signers
    );
    
    const poolFee = selectedPercentage.fee;
    const token0Amount = ethers.utils.parseUnits(
      amount0ToMint.toString(),
      token0Data.decimal
    );
    const token1Amount = ethers.utils.parseUnits(
      amount1ToMint.toString(),
      token1Data.decimal
    );

    const tokenETHStatus = await checkTokenETH(
      token0Data,
      token1Data,
      token0Amount,
      token1Amount
    );

    if (tokenETHStatus.success) {
      const tickData = await getNearestPriceTick(
        token0Data,
        token1Data,
        poolFee
      );
      const token1Bal = await token1Contract.balanceOf(signerAddress);
      const token0Bal = await token0Contract.balanceOf(signerAddress);

      const convertedToken0Bal = await ethers.utils.formatUnits(token0Bal,token0Data.decimal)
      const convertedToken1Bal = await ethers.utils.formatUnits(token1Bal,token1Data.decimal)

      const tick1 = priceToTick(lowPrice, token0Data.decimal, token1Data.decimal);
       const lowPriceTick = await nearestDivisibleNumbers(tick1, tickData.tickSpacing);

      const tick2 = priceToTick(highPrice, token0Data.decimal, token1Data.decimal);
       const highPriceTick = await nearestDivisibleNumbers(tick2, tickData.tickSpacing);
       
       if(lowPriceTick >= highPriceTick){throw {status:"fail",error:"Low price is higher than high price"}}
       if(amount0ToMint > token0Bal.toString()){throw {status:"fail",error:`Not enough ${token0Data.symbol} token`}}
       if(amount1ToMint > token1Bal.toString()){throw {status:"fail",error:`Not enough ${token1Data.symbol} token`}}

      await token0Contract.approve(
        liquidityContractAddress,
        ethers.constants.MaxUint256
      );
      await token1Contract.approve(
        liquidityContractAddress,
        ethers.constants.MaxUint256
      );

      await token0Contract.transfer(liquidityContractAddress, token0Amount);
      await token1Contract.transfer(liquidityContractAddress, token1Amount);

      const tx = await liquidityContract.mintNewPosition(
        token0Data.address,
        token1Data.address,
        token0Amount.toString(),
        token1Amount.toString(),
        poolFee,
        lowPriceTick,
        highPriceTick
      );
      const receipt = await tx.wait();
      if(receipt){
        return {status:"Success",message:"Position minted successfully",receipt:receipt}
      }
    }
  } catch (error) {
    // console.log(error);
    throw error;
  }
};

function priceToTick(price, tokenDecimals, token1Decimals) {
  const adjustedPrice = price * Math.pow(10, token1Decimals - tokenDecimals);
  const tick = Math.log(adjustedPrice) / Math.log(1.0001);
  return Math.round(tick);
}

function nearestDivisibleNumbers(tick, tickSpacing) {
  const nearest = Math.round(tick / tickSpacing) * tickSpacing;
  const lower = Math.floor(tick / tickSpacing) * tickSpacing;
  const higher = Math.ceil(tick / tickSpacing) * tickSpacing;
  return nearest;
}

const getAmount1FromAmount0 = async (
  token0Data,
  token1Data,
  inputAmount0,
  poolFee
) => {
  try {
    const tickData = await getNearestPriceTick(
      token0Data,
      token1Data,
      poolFee.fee
    );
    const amount1Price = await getAmount1(
      tickData.TickU,
      tickData.TickL,
      tickData.currentTick,
      inputAmount0,
      token0Data.decimal,
      token1Data.decimal
    );
    return amount1Price;
  } catch (error) {
    // console.log(error);
  }
};

const checkTokenETH = async (
  token0Data,
  token1Data,
  token0Amount,
  token1Amount
) => {
  try {
    if (token0Data.symbol === "ETH" || token1Data.symbol === "ETH") {
      if (token0Data.symbol === "ETH") {
        const token0Contract = await connectingWithNthToken(token0Data.address);
        await token0Contract.deposit({ value: token0Amount });
        await token0Contract.approve(liquidityContractAddress, token0Amount);
        return { success: true };
      }
      if (token1Data.symbol === "ETH") {
        const token1Contract = await connectingWithNthToken(token1Data.address);
        await token1Contract.deposit({ value: token1Amount });
        const tx = await token1Contract.approve(
          liquidityContractAddress,
          token1Amount
        );
        return { success: true };
      }
    } else {
      return { success: true };
    }
  } catch (error) {
    // console.log(error);
    return { success: false };
  }
};

const handleSwapToken = async (tokenInData, tokenOutData, amountIn) => {
  try {
    const checkBal = await checkTokenBalance(tokenInData, amountIn);
    const tokenInBal = await ethers.utils.parseUnits(
      checkBal.balance.toString(),
      tokenInData.decimal
    );
    const tokenOutBal = await checkTokenBalance(tokenOutData, amountIn);
    const tokenOutBalCon = await ethers.utils.parseUnits(
      tokenOutBal.balance.toString(),
      tokenOutData.decimal
    );

    const provider = await new ethers.providers.JsonRpcProvider(
      "http://127.0.0.1:8545/"
    );
    const signers = await provider.getSigner();
    const signerAddress = await signers.getAddress();
    const tokenInContract = await connectingWithNthToken(tokenInData.address);
    const tokenOutContract = await connectingWithNthToken(tokenOutData.address);
    const singleSwapToken = await connectingWithSingleSwapToken();
    const convertedAmountIn = await ethers.utils.parseUnits(
      amountIn.toString(),
      tokenInData.decimal
    );
    await tokenInContract.deposit({ value: convertedAmountIn });
    await tokenInContract.approve(
      await singleSwapToken.getAddress(),
      convertedAmountIn
    );
    const transaction = await singleSwapToken.swapExactInputSingle(
      tokenInData.address,
      tokenOutData.address,
      convertedAmountIn
    );
    await transaction.wait();
    const balance = await tokenOutContract.balanceOf(signerAddress);
    const convertedBalance = await ethers.utils.parseUnits(
      balance.toString(),
      tokenOutData.decimal
    );
  } catch (error) {
    // console.log(error);
  }
};

const getAllPositions = async () => {
  try {
    const provider = await new ethers.providers.JsonRpcProvider(
      "http://127.0.0.1:8545/"
    );
    const signers = await provider.getSigner();
    const signerAddress = await signers.getAddress();
    const NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS =
      "0xC36442b4a4522E871399CD717aBDD847Ab11FE88";
    const nfpmContract = new ethers.Contract(
      NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS,
      INONFUNGIBLE_POSITION_MANAGER.abi,
      signers
    );
    const numPositions = await nfpmContract.balanceOf(signerAddress);
    const calls = [];
    for (let i = 0; i < numPositions; i++) {
      calls.push(nfpmContract.tokenOfOwnerByIndex(signerAddress, i));
    }
    const positionIds = await Promise.all(calls);
    const positions = [];
    for (let i = 0; i < positionIds.length; i++) {
      positions.push(nfpmContract.positions(positionIds[i]));
    }
    const allPositions = await Promise.all(positions);
    const finalPositions = [];
    for (let i = 0; i < allPositions.length; i++) {
      let obj = {
        token0Symbol: await getTokenSymbol(allPositions[i].token0),
        token1Symbol: await getTokenSymbol(allPositions[i].token1),
        token0Address: allPositions[i].token0,
        token1Address: allPositions[i].token1,
        fee: allPositions[i].fee / 10000,
        token0_logo_url: await getLogoUrl(allPositions[i].token0),
        token1_logo_url: await getLogoUrl(allPositions[i].token1),
        currentLiquiditystatus: await getCurrentLiquidityStatus(
          allPositions[i].token0,
          allPositions[i].token1,
          allPositions[i].fee,
          allPositions[i].tickLower,
          allPositions[i].tickUpper,
          allPositions[i].liquidity.toString()
        ),
        positionId: positionIds[i],
        minXvalue: (await minXandMaxY(allPositions[i].tickLower,allPositions[i].tickUpper)).x,
        maxYvalue: (await minXandMaxY(allPositions[i].tickLower,allPositions[i].tickUpper)).y,
      };
      finalPositions.push(obj);
    }
    const allFinalPositions = await Promise.all(finalPositions);
    return allFinalPositions;
  } catch (error) {
    // console.log(error);
  }
};

const minXandMaxY = async (tickLower, tickUpper) => {
  try {
    const base = 1.0001;
    let x = Math.pow(base, tickLower); // Min: x DAI per USDC
    let y = Math.pow(base, tickUpper); // Max: y DAI per USDC
    let xString = x.toString();
    let yString = y.toString();

    let [xInteger, xDecimal] = xString.split(".");
    let [yInteger, yDecimal] = yString.split(".");

    x = parseFloat(`${xInteger}.${xDecimal.slice(0, 2)}`);
    y = parseFloat(`${yInteger}.${yDecimal.slice(0, 2)}`);

    return { x: x, y: y };
  } catch (error) {
    // console.log(error);
  }
};

const getCurrentLiquidityStatus = async (
  token0,
  token1,
  fee,
  tickLower,
  tickUpper,
  liquidity
) => {
  try {
    const provider = await new ethers.providers.JsonRpcProvider(
      "http://127.0.0.1:8545/"
    );
    const signers = await provider.getSigner();
    const uniswapV3Factory = "0x1F98431c8aD98523631AE4a59f267346ea31F984";

    const factoryContract = new ethers.Contract(
      uniswapV3Factory,
      FactoryAbi.abi,
      signers
    );

    const poolAddress = await factoryContract.getPool(token0, token1, fee);

    const poolContract = new ethers.Contract(
      poolAddress,
      IUniswapV3Pool.abi,
      signers
    );
    const slot0 = await poolContract.slot0();
    const currentTick = slot0[1];

    if (liquidity <= 0) {
      return "Closed";
    }
    if (currentTick >= tickLower && currentTick <= tickUpper) {
      return "In Range";
    } else {
      return "Out of Range";
    }
  } catch (error) {
    // console.log(error);
  }
};

const getLogoUrl = async (tokenAddress) => {
  const API_KEY =
    "ea8f6951c3479ebe8bbae60ab38f0fb60466b01bdf548f6eba4d778b9f54cce8";
  try {
    const url = `https://data-api.cryptocompare.com/onchain/v1/data/by/address?address=${tokenAddress}&chain_symbol=ETH&api_key=${API_KEY}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Apikey ${API_KEY}`,
      },
    });
    return response.data.Data.LOGO_URL;
  } catch (error) {
    // console.log(error);
  }
};

const getTokenSymbol = async (tokenAddress) => {
  try {
    const provider = await new ethers.providers.JsonRpcProvider(
      "http://127.0.0.1:8545/"
    );
    const signers = await provider.getSigner();
    const tokenContract = new ethers.Contract(tokenAddress, ERC2.abi, signers);
    const symbol = await tokenContract.symbol();
    return symbol;
  } catch (error) {
    // console.log(error);
  }
};

const getLiquidityInfo = async (positionId) => {
  try {
    const provider = await new ethers.providers.JsonRpcProvider(
      "http://127.0.0.1:8545/"
    );
    const signers = await provider.getSigner();
    const signerAddress = await signers.getAddress();
    const NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS =
      "0xC36442b4a4522E871399CD717aBDD847Ab11FE88";
    const nfpmContract = new ethers.Contract(
      NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS,
      INONFUNGIBLE_POSITION_MANAGER.abi,
      signers
    );
    const uri = await nfpmContract.tokenURI(positionId);
    const response = await fetch(uri);
    const imagedata = await response.json();
    const imageData = imagedata.image;
    const data = await nfpmContract.positions(positionId);
    const AmountOfTokensDeposited = await getAmountOfTokensDeposited(data);
    const token0Amount = await ethers.utils
      .formatUnits(
        AmountOfTokensDeposited.token0Amount.toString(),
        AmountOfTokensDeposited.token0Decimal
      )
      .toString();
    const token1Amount = await ethers.utils
      .formatUnits(
        AmountOfTokensDeposited.token1Amount.toString(),
        AmountOfTokensDeposited.token1Decimal
      )
      .toString();
    const liquidityInUSD = await getLiquidityInUSD(
      data.token0,
      data.token1,
      token0Amount,
      token1Amount,
      AmountOfTokensDeposited.token0Decimal,
      AmountOfTokensDeposited.token1Decimal
    );
    const positionStatus = await getCurrentLiquidityStatus(
      data.token0,
      data.token1,
      data.fee,
      data.tickLower,
      data.tickUpper,
      data.liquidity.toString()
    );
    const token0LogoURL = await getLogoUrl(data.token0);
    const token1LogoURL = await getLogoUrl(data.token1);
    const token0Symbol = await getTokenSymbol(data.token0);
    const token1Symbol = await getTokenSymbol(data.token1);
    const tokensOwed0 = data.tokensOwed0.toString();
    const tokenOwned1 = data.tokensOwed1.toString();
    const liquidityFeeUsd = await getLiquidityFeeInUSD(
      data.token0,
      data.token1,
      tokensOwed0,
      tokenOwned1,
      AmountOfTokensDeposited.token0Decimal,
      AmountOfTokensDeposited.token1Decimal
    );

    await getEventData(positionId);

    const LiquidityInfo = {
      liquidityPositionData: data,
      token0Amount: token0Amount,
      token1Amount: token1Amount,
      liquidityInUSD: liquidityInUSD,
      token0LogoURL: token0LogoURL,
      token1LogoURL: token1LogoURL,
      token0Symbol: token0Symbol,
      token1Symbol: token1Symbol,
      positionStatus: positionStatus,
      tokensOwed0: tokensOwed0,
      tokenOwned1: tokenOwned1,
      imageData: imageData,
      liquidityFeeUsd: liquidityFeeUsd,
    };
    return LiquidityInfo;
  } catch (error) {
    // console.log(error);
  }
};

async function getEventData(tokenId) {
  const provider = await new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545/"
  );
  const signers = await provider.getSigner();
  const contract = await new ethers.Contract(
    liquidityContractAddress,
    LiquidityManager.abi,
    signers
  );
  const event = contract.filters.PositionMinted(tokenId);

  // Get the event logs
  const logs = await contract.queryFilter(event);

}

const getAmountOfTokensDeposited = async (data) => {
  const uniswapV3Factory = "0x1F98431c8aD98523631AE4a59f267346ea31F984";
  try {
    const provider = await new ethers.providers.JsonRpcProvider(
      "http://127.0.0.1:8545/"
    );
    const signers = await provider.getSigner();
    let FactoryContract = new ethers.Contract(
      uniswapV3Factory,
      FactoryAbi.abi,
      signers
    );
    let V3pool = await FactoryContract.getPool(
      data.token0,
      data.token1,
      data.fee
    );
    let poolContract = new ethers.Contract(V3pool, IUniswapV3Pool.abi, signers);

    let slot0 = await poolContract.slot0();
    const token0Contract = new ethers.Contract(data.token0, ERC2.abi, signers);
    const token1Contract = new ethers.Contract(data.token1, ERC2.abi, signers);
    const t0d = await token0Contract.decimals();
    const t1d = await token1Contract.decimals();
    const response = await getTokenAmounts(
      data.liquidity.toString(),
      slot0.sqrtPriceX96.toString(),
      data.tickLower,
      data.tickUpper,
      t0d,
      t1d
    );
    return response;
  } catch (error) {
    // console.log(error);
  }
};

const getLiquidityInUSD = async (
  token0Address,
  token1Address,
  token0Amount,
  token1Amount,
  token0Decimal,
  token1Decimal
) => {
  try {
    const token0PriceInUSD = await getTokenCurrentPriceInUSD(
      { address: token0Address },
      token0Amount
    );
    const token1PriceInUSD = await getTokenCurrentPriceInUSD(
      { address: token1Address },
      token1Amount
    );
    const liquidityInUSD = token0PriceInUSD + token1PriceInUSD;
    return liquidityInUSD;
  } catch (error) {
    // console.log(error);
  }
};

const getTokenCurrentPriceInUSD = async (tokenData, priceEntered) => {
  try {
    const API_KEY =
      "ea8f6951c3479ebe8bbae60ab38f0fb60466b01bdf548f6eba4d778b9f54cce8";
    const url = `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${tokenData.address}&vs_currencies=usd`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Apikey ${API_KEY}`,
      },
    });

    const tokenAddress = tokenData.address;
    const tokenPriceUSD = response.data[tokenAddress.toLowerCase()]?.usd;
    return tokenPriceUSD * parseInt(priceEntered);
  } catch (error) {
    // console.log(error);
  }
};

const transferToken = async (tokenData, recipientAddress, priceEntered) => {
  try {
    const provider = await new ethers.providers.JsonRpcProvider(
      "http://127.0.0.1:8545/"
    );
    const signers = await provider.getSigner();
    const transferContract = await new ethers.Contract(
      transferContractAddress,
      transferContractABI,
      signers
    );
    const transferTokenContract = await connectingWithNthToken(
      tokenData.address
    );
    await transferTokenContract.approve(transferContractAddress, priceEntered);
    const tx = await transferContract.transferToken(
      tokenData.address,
      recipientAddress,
      priceEntered
    );
    await tx.wait();
    if (tx) {
      return { status: "success", transactionData: tx };
    }
  } catch (error) {
    throw { error: "Some thing went wrong" };
  }
};

const collectLiquidityFee = async (positionId) => {
  try {
    const provider = await new ethers.providers.JsonRpcProvider(
      "http://127.0.0.1:8545/"
    );
    const signers = await provider.getSigner();
    const signerAddress = await signers.getAddress();
    const liquidityContract = await new ethers.Contract(
      liquidityContractAddress,
      LiquidityManager.abi,
      signers
    );
    const tx = await liquidityContract.collectAllFees(positionId);
  } catch (error) {
    // console.log(error);
  }
};

const getLiquidityFeeInUSD = async (
  token0Address,
  token1Address,
  token0Amount,
  token1Amount,
  token0Decimal,
  token1Decimal
) => {
  try {
    const token0PriceInUSD = await getTokenCurrentPriceInUSD(
      { address: token0Address },
      token0Amount
    );
    const token1PriceInUSD = await getTokenCurrentPriceInUSD(
      { address: token1Address },
      token1Amount
    );
    const liquidityInUSD = token0PriceInUSD + token1PriceInUSD;
    return liquidityInUSD;
  } catch (error) {
    // console.log(error);
  }
};

async function getPoolData(token0Address, token1Address, poolFee) {
  const provider = await new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545/"
  );
  const signers = await provider.getSigner();
  const uniswapV3Factory = "0x1F98431c8aD98523631AE4a59f267346ea31F984";
  const WETH9 = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

  const factoryContract = new ethers.Contract(
    uniswapV3Factory,
    FactoryAbi.abi,
    signers
  );
  const poolAddress = await factoryContract.getPool(
    token0Address,
    token1Address,
    poolFee
  );
  return poolAddress;
}

const getData = async () => {
  const provider = await new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545/"
  );
  const signers = await provider.getSigner();
  try {
    const poolAddress = await getPoolData(
      "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      100
    );
    const poolContract = new ethers.Contract(
      poolAddress,
      IUniswapV3Pool.abi,
      signers
    );
    const slot0 = await poolContract.slot0();
    const liquidity = await poolContract.liquidity();
    const tokenOne = new Token(
      1,
      "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      18
    );
    const tokenTwo = new Token(
      1,
      "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      6
    );

    interface GraphTick {
      tickIdx: string;
      liquidityGross: string;
      liquidityNet: string;
    }

    const graphTicks = await suii(poolAddress, 0);

    const sdkTicks = graphTicks.map((graphTick: GraphTick) => {
      return new Tick({
        index: +graphTick.tickIdx,
        liquidityGross: graphTick.liquidityGross,
        liquidityNet: graphTick.liquidityNet,
      });
    });

    const fullPool = new Pool(
      tokenOne,
      tokenTwo,
      100,
      slot0.sqrtPriceX96,
      liquidity,
      slot0.tick,
      sdkTicks
    );
    await getChartData(poolAddress, 0, fullPool, tokenOne, tokenTwo);
  } catch (error) {
    // console.log(error);
  }
};

const getNearestPriceTick = async (token0Data, token1Data, poolFee) => {
  const provider = await new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545/"
  );
  const signers = await provider.getSigner();
  const uniswapV3Factory = "0x1F98431c8aD98523631AE4a59f267346ea31F984";

  const factoryContract = new ethers.Contract(
    uniswapV3Factory,
    FactoryAbi.abi,
    signers
  );

  const poolAddress = await factoryContract.getPool(
    token0Data.address,
    token1Data.address,
    poolFee
  );

  const poolContract = new ethers.Contract(
    poolAddress,
    IUniswapV3Pool.abi,
    signers
  );
  const S0 = (await poolContract.slot0()) as any;
  const CT = parseInt(S0.tick);
  const Tsp = parseInt((await poolContract.tickSpacing()) as any);
  // const NLT = Math.floor(CT / Tsp) * Tsp;
  const NLT = Math.floor(CT / Tsp) * Tsp;
  const NHT = Math.floor(CT / Tsp) * Tsp + Tsp;
  const TickL = NLT.toString() as any; //Nearest usable lower tick This would have the current tick range Liquidity
  const TickU = NHT.toString() as any; //Nearest usable upper tick
  return { TickL: TickL, TickU: TickU, currentTick: CT ,tickSpacing:Tsp};
};

const getNearestPriceRange = async (token0Data, token1Data, poolFee) => {
  try {
    const tickData = await getNearestPriceTick(token0Data, token1Data, poolFee);
    let lowPrice = calculatePriceFromTick(
      tickData.TickL,
      token0Data.decimal,
      token1Data.decimal
    );
    let highPrice = calculatePriceFromTick(
      tickData.TickU,
      token0Data.decimal,
      token1Data.decimal
    );
    return { lowPrice: highPrice.toFixed(2), highPrice: lowPrice.toFixed(2) };
  } catch (error) {
    // console.log(error);
  }
};

const calculatePriceFromTick = (
  tick: number,
  token0Decimal: number,
  token1Decimal: number
): number => {
  const sqrtPrice = Math.pow(1.0001, tick);
  const mulNumber = token0Decimal - token1Decimal;
  const conPrice = sqrtPrice * 10 ** mulNumber;
  const inversedPrice = 1 / conPrice;
  return inversedPrice;
};

const getAmount0FromAmount1 = async (
  token0Data,
  token1Data,
  inputAmount1,
  poolFee
) => {
  try {
    const tickData = await getNearestPriceTick(
      token0Data,
      token1Data,
      poolFee.fee
    );
    const amount1Price = await getAmount0(
      tickData.TickU,
      tickData.TickL,
      tickData.currentTick,
      inputAmount1,
      token0Data.decimal,
      token1Data.decimal
    );
    return amount1Price;
  } catch (error) {
    // console.log(error);
  }
};

function getAmount1(
  tickUpper: number,
  tickLower: number,
  currentTick: number,
  amount0: number,
  decimals0: number,
  decimals1: number
): number {
  let priceLower = Math.pow(1.0001, tickLower);
  let priceUpper = Math.pow(1.0001, tickUpper);
  let currentPrice = Math.pow(1.0001, currentTick);
  let liquidity =
    (amount0 * Math.pow(10, decimals0)) /
    ((Math.sqrt(priceUpper) - Math.sqrt(currentPrice)) /
      (Math.sqrt(currentPrice) * Math.sqrt(priceUpper)));
  let amount1 =
    (liquidity * (Math.sqrt(currentPrice) - Math.sqrt(priceLower))) /
    Math.pow(10, decimals1);
  return amount1;
}

function getAmount0(
  tickUpper: number,
  tickLower: number,
  currentTick: number,
  amount1: number,
  decimals: number,
  decimals1: number
) {
  let priceLower = 1.0001 ** tickLower;
  let priceUpper = 1.0001 ** tickUpper;
  let currentPrice = 1.0001 ** currentTick;
  let liquidity =
    (amount1 * 10 ** decimals1) /
    (Math.sqrt(currentPrice) - Math.sqrt(priceLower));
  let amount0 =
    (liquidity *
      ((Math.sqrt(priceUpper) - Math.sqrt(currentPrice)) /
        (Math.sqrt(currentPrice) * Math.sqrt(priceUpper)))) /
    10 ** decimals;
  return amount0;
}

const getTick = async (token0Data, token1Data, poolFee) => {
  const provider = await new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545/"
  );
  const signers = await provider.getSigner();
  const uniswapV3Factory = "0x1F98431c8aD98523631AE4a59f267346ea31F984";

  const factoryContract = new ethers.Contract(
    uniswapV3Factory,
    FactoryAbi.abi,
    signers
  );

  const poolAddress = await factoryContract.getPool(
    token0Data.address,
    token1Data.address,
    poolFee.fee
  );

  const poolContract = new ethers.Contract(
    poolAddress,
    IUniswapV3Pool.abi,
    signers
  );
  const S0 = (await poolContract.slot0()) as any;
  const CT = parseInt(S0.tick);
  const Tsp = parseInt((await poolContract.tickSpacing()) as any);
  const NearestLowPriceTick = getNearestLowPriceTick(1000, 60);
};

function getNearestLowPriceTick(price, tickSpacing) {
  // Constants
  const LOG_BASE = 1.0001;

  // Calculate the tick index using the given price
  const rawTickIndex = Math.log(price) / Math.log(LOG_BASE);

  // Adjust the tick index to the nearest lower multiple of tickSpacing
  const nearestLowPriceTick =
    Math.floor(rawTickIndex / tickSpacing) * tickSpacing;

  return nearestLowPriceTick;
}

function calculateTick(price: number, tickSpacing: number): number {
  const tick = Math.floor(
    ((1 / tickSpacing) * Math.log(price)) / Math.log(1.0001)
  );
  return tick;
}

function calculateValue(tick, token0Decimal, token1Decimal): number {
  let numerator = Math.pow(1.0001, tick);
  let denominator = Math.pow(10, token1Decimal - token0Decimal);
  let result = numerator / denominator;
  return result;
}

const getSubgraphData = async()=>{
  try {
    const URL = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3";
    const query = `
    query uniswapDayDatas($startTime: Int!, $skip: Int!) {
      uniswapDayDatas(
        first: 1000
        skip: $skip
        subgraphError: allow
        where: { date_gt: $startTime }
        orderBy: date
        orderDirection: asc
      ) {
        id
        date
        volumeUSD
        tvlUSD
      }
    }
    `;

    const response = await axios.post(URL,{query:query,variables:{
      "startTime": 1630423606,
      "skip": 0
    }});


    const chartData = response.data.data.uniswapDayDatas;    
    const formattedVolumeData = await chartData.map((day) => {
        return day.tvlUSD
      });
      const volumeLabels = await chartData.map((day)=>{
        return unixToDate(day.date)
      });

      const totalVolumes = await chartData.map((day) => {
        return day.volumeUSD
      });
      const finalData = formattedVolumeData.slice(-30)
      const finalLabels = volumeLabels.slice(-30)
      const finalTotalVolume = totalVolumes.slice(-30);
      return {finalData:finalData,finalLabels:finalLabels,finalTotalVolume:finalTotalVolume};
  } catch (error) {
    // console.log(error);
  }
}

const fetchCoinData = async()=>{
  try {
    const {data} = await axios.get(CoinList("usd"));    
    return data ;
  } catch (error) {
    // console.log(error);
  }
}

const getSingleCoinData = async(id)=>{
  try {
    const {data} = await axios.get(SingleCoin(id));
    return data
  } catch (error) {
    // console.log(error);
  }
}

const getHistoricalChartData = async(id,days,currency)=>{
  try {
    const {data} = await axios.get(HistoricalChart(id,days,currency));
    return data
  } catch (error) {
    // console.log(error);
  }
}

export {
  connectingWithBooToken,
  connectingWithLifeToken,
  connectingWithSingleSwapToken,
  connectingWithSwapMultiHop,
  connectingWithIWETHToken,
  connectingWithDaiToken,
  singleSwapToken,
  getTokenInBal,
  getTokenOutBal,
  getPoolData,
  handleAddLiquidity,
  pleaseDude,
  handleSwapToken,
  getAllPositions,
  getLiquidityInfo,
  getTokenCurrentPriceInUSD,
  transferToken,
  collectLiquidityFee,
  getData,
  getNearestPriceRange,
  getAmount1FromAmount0,
  getAmount0FromAmount1,
  getTick,
  getSubgraphData,
  fetchCoinData,
  getSingleCoinData,
  getHistoricalChartData
};
