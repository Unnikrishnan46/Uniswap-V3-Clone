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
  USDCAddress,
  liquidityContractAddress,
  singleSwapTokenABI,
  swapMultiHopABI,
  transferContractABI,
  transferContractAddress,
} from "@/constants/constants";
import { ethers } from "ethers";
import { Token, BigintIsh, CurrencyAmount } from "@uniswap/sdk-core";
import {
  Pool,
  Position,
  nearestUsableTick,
  Route,
  Trade,
  TickMath,
  computePoolAddress,
  FeeAmount,
} from "@uniswap/v3-sdk";
import IUniswapV3Pool from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import INONFUNGIBLE_POSITION_MANAGER from "@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json";
import FactoryAbi from "@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json";
import JSBI from "jsbi";
import LiquidityManager from "@/constants/LiquidityManager.json";
import axios from "axios";
import { getTokenAmounts } from "./priceHelpers";


const connectingWithBooToken = async () => {
  try {
    // const provider = await new ethers.BrowserProvider((window as any).ethereum);
    // await provider.send("eth_requestAccounts", []);
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
    console.log(error);
  }
};

const connectingWithLifeToken = async () => {
  try {
    // const provider = await new ethers.BrowserProvider((window as any).ethereum);
    // await provider.send("eth_requestAccounts", []);
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
    console.log(error);
  }
};

const connectingWithSingleSwapToken = async () => {
  try {
    // const provider = await new ethers.BrowserProvider((window as any).ethereum);
    // await provider.send("eth_requestAccounts", []);
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
    console.log(error);
  }
};

const connectingWithSwapMultiHop = async () => {
  try {
    // const provider = await new ethers.BrowserProvider((window as any).ethereum);
    // await provider.send("eth_requestAccounts", []);
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
    console.log(error);
  }
};

const connectingWithIWETHToken = async () => {
  try {
    // const provider = await new ethers.BrowserProvider((window as any).ethereum);
    // await provider.send("eth_requestAccounts", []);
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
    console.log(error);
  }
};

const connectingWithDaiToken = async () => {
  try {
    // const provider = await new ethers.BrowserProvider((window as any).ethereum);
    // await provider.send("eth_requestAccounts", []);
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
    console.log(error);
  }
};

const connectingWithNthToken = async (tokenAddress) => {
  try {
    // const provider = await new ethers.BrowserProvider((window as any).ethereum);
    // await provider.send("eth_requestAccounts", []);
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
    console.log(error);
  }
};

// const getTokenData = async () => {
//   try {
//     const tokens = [BooTokenAddress, LifeTokenAddress];
//     const tokenData = [];
//     const provider = await new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
//     const signers = await provider.getSigner();
//     // const provider = await new ethers.BrowserProvider((window as any).ethereum);
//     // await provider.send("eth_requestAccounts", []);
//     // const signers = await provider.getSigner();
//     tokens.map(async (item, index) => {
//       const contract = await new ethers.Contract(item, ERC2.abi, signers);
//       const tokenBalance = await contract.balanceOf(signers.address);
//       const symbol = await contract.symbol();
//       const name = await contract.name();
//       tokenData.push({
//         name: name,
//         symbol: symbol,
//         tokenBalance: tokenBalance,
//       });
//     });

//     // WETH BALANCE
//     const wethContract = await connectingWithIWETHToken();
//     const wethBal = await wethContract.balanceOf(signers.address);
//     const convertedWethBal = await ethers.formatEther(wethBal.toString());

//     // DAI BALANCE
//     const daiContract = await connectingWithDaiToken();
//     const daiBal = await daiContract.balanceOf(signers.address);
//     const convertedDaiBal = await ethers.formatEther(daiBal.toString());
//   } catch (error) {
//     console.log(error);
//   }
// };

const checkTokenBalance = async (tokenInData, amountIn) => {
  try {
    // const provider = await new ethers.providers.JsonRpcProvider(
    //   "http://127.0.0.1:8545/"
    // );
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
    console.log(error);
  }
};

const singleSwapToken = async (tokenInData, tokenOutData, amountIn) => {
  let response;
  try {
    const checkBal = await checkTokenBalance(tokenInData, amountIn);
    if (checkBal.success) {
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
    if (response) {
      return response;
    }
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
};

const swapDAIToken = async (tokenIn, tokenOut, amountIn) => {
  console.log("swapDAIToken Condition worked");
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
    console.log(error);
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
    console.log("Pass 1");

    await tokenInContract.approve(
      await singleSwapToken.address,
      convertedAmountIn
    );
    console.log("Pass 2");
    const transaction = await singleSwapToken.swapExactInputSingle(
      tokenIn.address,
      tokenOut.address,
      convertedAmountIn
    );
    console.log("Pass 3");
    await transaction.wait();
    const balance = await tokenOutContract.balanceOf(signerAddress);
    const convertedBalance = await ethers.utils.formatUnits(
      balance.toString(),
      tokenOut.decimal
    );
    console.log(transaction);
    console.log(convertedBalance, " ", balance);
    console.log("success");
    return {
      status: "success",
      transaction: transaction,
      tokenOutBal: convertedBalance,
    };
  } catch (error) {
    console.log(error);
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
    console.log(error);
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
    console.log(error);
  }
};

function floorDivideBigInt(numerator: bigint, denominator: bigint): bigint {
  return numerator / denominator - (numerator % denominator < 0 ? 1n : 0n);
}

// async function getPoolData() {
//   const provider = await new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
//   const signers = await provider.getSigner();
//   console.log("Pass 1");
//   const uniswapV3Factory = "0x1F98431c8aD98523631AE4a59f267346ea31F984";

//   const WETH9 = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
//   const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
//   // const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F"
//   const factoryContract = new ethers.Contract(
//     uniswapV3Factory,
//     FactoryAbi.abi,
//     signers
//   );
//   const poolAddress = await factoryContract.getPool(WETH9, USDC, 100);
//   const poolContract = new ethers.Contract(
//     poolAddress,
//     IUniswapV3Pool.abi,
//     signers
//   );
//   const slot0 = await poolContract.slot0();
//   const currentTick = slot0.tick;
//   const tickSpacing = await poolContract.tickSpacing();
//   const tickLow = floorDivideBigInt(currentTick, tickSpacing) * tickSpacing;
//   const tickHigh = tickLow + tickSpacing;

//   console.log(
//     `currentTick: ${currentTick}, tickLow: ${tickLow}, tickHigh: ${tickHigh}`
//   );
//   await getToken0Amounts(1, currentTick, tickLow, tickHigh, 18, 6);
// }

function tickToPrice(tick, token0Decimals, token1Decimals) {
  // Convert BigInt to Number
  let tickNum = Number(tick);
  let token0DecimalsNum = Number(token0Decimals);
  let token1DecimalsNum = Number(token1Decimals);

  let price0 =
    1.0001 ** tickNum / 10 ** (token1DecimalsNum - token0DecimalsNum);
  return 1 / price0;
}

async function getPoolData() {
  const provider = await new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545/"
  );
  const signers = await provider.getSigner();
  console.log("Pass 1");

  const uniswapV3Factory = "0x1F98431c8aD98523631AE4a59f267346ea31F984";
  const WETH9 = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

  const factoryContract = new ethers.Contract(
    uniswapV3Factory,
    FactoryAbi.abi,
    signers
  );
  const poolAddress = await factoryContract.getPool(WETH9, USDC, 100);
  const poolContract = new ethers.Contract(
    poolAddress,
    IUniswapV3Pool.abi,
    signers
  );

  const tokenOne = new Token(1, WETH9, 18);
  const tokenTwo = new Token(1, USDC, 6);

  const [token0, token1, fee, liquidity, slot0] = await Promise.all([
    poolContract.token0(),
    poolContract.token1(),
    poolContract.fee(),
    poolContract.liquidity(),
    poolContract.slot0(),
  ]);

  console.log(token0);
  console.log(token1);
  console.log(fee);
  console.log(liquidity);
  console.log(slot0.sqrtPriceX96);

  console.log("Pass 2");
  const pool = await new Pool(
    tokenOne,
    tokenTwo,
    500,
    slot0.sqrtPriceX96,
    liquidity,
    slot0.tick
  );
  const tickLower: number = -100;
  const tickUpper: number = 200;
  const Liquidity: JSBI = JSBI.BigInt("1000000000000000000");
  console.log("Pass 3");

  const position = new Position({
    pool,
    liquidity,
    tickLower,
    tickUpper,
  });

  console.log(position.amount0);
  console.log(position.amount1);
}

const pleaseDude = async () => {
  const provider = await new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545/"
  );
  const signers = await provider.getSigner();
  console.log("Pass 1");
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

  console.log("Pass 1");

  const currentPoolAddress = computePoolAddress({
    factoryAddress: POOL_FACTORY_CONTRACT_ADDRESS,
    tokenA: token0,
    tokenB: token1,
    fee: fee,
  });
  console.log("Pass 2");
  const poolContract = new ethers.Contract(
    currentPoolAddress,
    IUniswapV3Pool.abi,
    signers
  );
  console.log("Pass 3");
  const [liquidity, slot0] = await Promise.all([
    poolContract.liquidity(),
    poolContract.slot0(),
  ]);
  console.log(
    "Pass 4",
    liquidity,
    slot0,
    fee,
    slot0.sqrtPriceX96.toString(),
    slot0.tick
  );
  const configuredPool = new Pool(
    token0,
    token1,
    fee,
    slot0.sqrtPriceX96.toString(),
    liquidity.toString(),
    slot0.tick
  );
  console.log("Pass 5");
  console.log(configuredPool.liquidity);
};

const handleAddLiquidity = async (
  token0Data,
  token1Data,
  amount0ToMint,
  amount1ToMint,
  selectedPercentage
) => {
  const provider = await new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545/"
  );
  const signers = await provider.getSigner();
  const liquidityContract = await new ethers.Contract(
    liquidityContractAddress,
    LiquidityManager.abi,
    signers
  );
  console.log("Pass 1");
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
  const token1Bal = await token1Contract.balanceOf(signerAddress);
  const token0Bal = await token0Contract.balanceOf(signerAddress);
  const poolFee = selectedPercentage.fee;
  const token0Amount = ethers.utils.parseUnits(
    amount0ToMint,
    token0Data.decimal
  );
  const token1Amount = ethers.utils.parseUnits(
    amount1ToMint,
    token1Data.decimal
  );

  // if(token0Data.symbol === "ETH"){
  //   const tokenInContract = await connectingWithNthToken(token0Data.address);
  //   await tokenInContract.deposit({ value: token0Amount });
  //   await tokenInContract.approve(
  //     await liquidityContractAddress,
  //     token0Amount
  //   );
  // }

  console.log(
    `${token0Data.symbol} balance available  :   `,
    ethers.utils.formatUnits(token0Bal, token0Data.decimal)
  );
  console.log(
    `${token1Data.symbol} balance available  :   `,
    ethers.utils.formatUnits(token1Bal, token1Data.decimal)
  );

  console.log("Pass 1 ");

  await token0Contract.approve(
    liquidityContractAddress,
    ethers.constants.MaxUint256
  );
  console.log("Pass 2");
  await token1Contract.approve(
    liquidityContractAddress,
    ethers.constants.MaxUint256
  );
  console.log("Pass 3");

  console.log("Pass 4 ");
  await token0Contract.transfer(liquidityContractAddress, token0Amount);
  console.log("Pass 5");
  await token1Contract.transfer(liquidityContractAddress, token1Amount);
  console.log(
    "Pass 6 ",
    token0Data.address,
    token1Data.address,
    token0Amount.toString(),
    token1Amount.toString(),
    poolFee
  );
  const tx = await liquidityContract.mintNewPosition(
    token0Data.address,
    token1Data.address,
    token0Amount.toString(),
    token1Amount.toString(),
    poolFee
  );
  console.log("Pass 7");
  const receipt = await tx.wait();
  return receipt;
};

const handleSwapToken = async (tokenInData, tokenOutData, amountIn) => {
  try {
    console.log("Pass 1");
    const checkBal = await checkTokenBalance(tokenInData, amountIn);
    console.log("Pass 2", checkBal);
    const tokenInBal = await ethers.utils.parseUnits(
      checkBal.balance.toString(),
      tokenInData.decimal
    );
    console.log("Pass 3");
    console.log(tokenInBal);
    const tokenOutBal = await checkTokenBalance(tokenOutData, amountIn);
    const tokenOutBalCon = await ethers.utils.parseUnits(
      tokenOutBal.balance.toString(),
      tokenOutData.decimal
    );
    console.log(tokenOutBalCon);

    const provider = await new ethers.providers.JsonRpcProvider(
      "http://127.0.0.1:8545/"
    );
    const signers = await provider.getSigner();
    const signerAddress = await signers.getAddress();
    const tokenInContract = await connectingWithNthToken(tokenInData.address);
    const tokenOutContract = await connectingWithNthToken(tokenOutData.address);
    const singleSwapToken = await connectingWithSingleSwapToken();
    console.log("Pass 4");
    const convertedAmountIn = await ethers.utils.parseUnits(
      amountIn.toString(),
      tokenInData.decimal
    );
    await tokenInContract.deposit({ value: convertedAmountIn });
    console.log("Pass 5");
    await tokenInContract.approve(
      await singleSwapToken.getAddress(),
      convertedAmountIn
    );
    console.log("Pass 6");
    const transaction = await singleSwapToken.swapExactInputSingle(
      tokenInData.address,
      tokenOutData.address,
      convertedAmountIn
    );
    console.log("Pass 7");
    await transaction.wait();
    console.log("Pass 8 ", transaction);
    const balance = await tokenOutContract.balanceOf(signerAddress);
    const convertedBalance = await ethers.utils.parseUnits(
      balance.toString(),
      tokenOutData.decimal
    );
    console.log(convertedBalance);
  } catch (error) {
    console.log(error);
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
    console.log(allPositions);
    console.log(allPositions[0].liquidity.toString());
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
        currentLiquiditystatus: await getCurrentLiquidityStatus(allPositions[i].token0,allPositions[i].token1,allPositions[i].fee,allPositions[i].tickLower,allPositions[i].tickUpper,allPositions[i].liquidity.toString()),
        positionId: positionIds[i],
        minXvalue:(await minXandMaxY(allPositions[i].tickLower,allPositions[i].tickUpper)).x,
        maxYvalue:(await minXandMaxY(allPositions[i].tickLower,allPositions[i].tickUpper)).y
      };
      finalPositions.push(obj);
    }
    const allFinalPositions = await Promise.all(finalPositions);
    console.log(allFinalPositions);
    return allFinalPositions;
  } catch (error) {
    console.log(error);
  }
};

const minXandMaxY = async(tickLower,tickUpper)=>{
  try {
  const base = 1.0001;
  let x = Math.pow(base, tickLower); // Min: x DAI per USDC
  let y = Math.pow(base, tickUpper); // Max: y DAI per USDC
  let xString = x.toString();
  let yString = y.toString();
  
    let [xInteger, xDecimal] = xString.split('.');
    let [yInteger, yDecimal] = yString.split('.');

    x = parseFloat(`${xInteger}.${xDecimal.slice(0, 2)}`);
    y = parseFloat(`${yInteger}.${yDecimal.slice(0, 2)}`);
    
  return {x:x,y:y}
  } catch (error) {
    console.log(error);
  }
}

const getCurrentLiquidityStatus = async(token0,token1,fee,tickLower,tickUpper,liquidity)=>{
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

    const poolAddress = await factoryContract.getPool(
      token0,
      token1,
      fee
    );

    const poolContract = new ethers.Contract(
      poolAddress,
      IUniswapV3Pool.abi,
      signers
    );
    const slot0 = await poolContract.slot0();
    const currentTick = slot0[1];

    if(liquidity <= 0){
      return "Closed"
    }
    if (currentTick >= tickLower && currentTick <= tickUpper) {
      return "In Range"
    } else {
      return "Out of Range"
    }

  } catch (error) {
    console.log(error);
  }
}

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
    console.log(error);
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
    console.log(error);
  }
};

const getLiquidityInfo = async(positionId)=>{
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
    const token0Amount = await ethers.utils.formatUnits(AmountOfTokensDeposited.token0Amount.toString(),AmountOfTokensDeposited.token0Decimal).toString();
    const token1Amount = await ethers.utils.formatUnits(AmountOfTokensDeposited.token1Amount.toString(),AmountOfTokensDeposited.token1Decimal).toString();
    const liquidityInUSD = await getLiquidityInUSD(data.token0,data.token1,token0Amount,token1Amount,AmountOfTokensDeposited.token0Decimal,AmountOfTokensDeposited.token1Decimal);
    const positionStatus = await getCurrentLiquidityStatus(data.token0,data.token1,data.fee,data.tickLower,data.tickUpper,data.liquidity.toString());
    const token0LogoURL = await getLogoUrl(data.token0);
    const token1LogoURL = await getLogoUrl(data.token1);
    const token0Symbol = await getTokenSymbol(data.token0);
    const token1Symbol = await getTokenSymbol(data.token1);
    const tokensOwed0 = data.tokensOwed0.toString();
    const tokenOwned1 = data.tokensOwed1.toString();
    const liquidityFeeUsd = await getLiquidityFeeInUSD(data.token0,data.token1,tokensOwed0,tokenOwned1,AmountOfTokensDeposited.token0Decimal,AmountOfTokensDeposited.token1Decimal)

    const LiquidityInfo = {
      liquidityPositionData : data,
      token0Amount:token0Amount,
      token1Amount:token1Amount,
      liquidityInUSD:liquidityInUSD,
      token0LogoURL:token0LogoURL,
      token1LogoURL:token1LogoURL,
      token0Symbol:token0Symbol,
      token1Symbol:token1Symbol,
      positionStatus:positionStatus,
      tokensOwed0:tokensOwed0,
      tokenOwned1:tokenOwned1,
      imageData:imageData,
      liquidityFeeUsd:liquidityFeeUsd
    }
    return LiquidityInfo;
  } catch (error) {
    console.log(error);
  }
}

const getAmountOfTokensDeposited = async(data)=>{
  const uniswapV3Factory = "0x1F98431c8aD98523631AE4a59f267346ea31F984";
  try {
    const provider = await new ethers.providers.JsonRpcProvider(
      "http://127.0.0.1:8545/"
    );
    const signers = await provider.getSigner();
    let FactoryContract = new ethers.Contract(uniswapV3Factory, FactoryAbi.abi, signers);
    let V3pool = await FactoryContract.getPool(data.token0, data.token1, data.fee);
    let poolContract = new ethers.Contract(V3pool, IUniswapV3Pool.abi, signers);

    let slot0 = await poolContract.slot0();
    const token0Contract = new ethers.Contract(data.token0, ERC2.abi, signers);
    const token1Contract = new ethers.Contract(data.token1, ERC2.abi, signers);
    const t0d = await token0Contract.decimals();
    const t1d = await token1Contract.decimals();
    const response = await getTokenAmounts(data.liquidity.toString(),slot0.sqrtPriceX96.toString(),data.tickLower,data.tickUpper,t0d,t1d);
    return response;
  } catch (error) {
    console.log(error);
  }
}

const getLiquidityInUSD = async(token0Address,token1Address,token0Amount,token1Amount,token0Decimal,token1Decimal)=>{
  try {
    const token0PriceInUSD = await getTokenCurrentPriceInUSD({address:token0Address},token0Amount);
    const token1PriceInUSD  = await getTokenCurrentPriceInUSD({address:token1Address},token1Amount);
    const liquidityInUSD = token0PriceInUSD + token1PriceInUSD;
    return liquidityInUSD;
  } catch (error) {
    console.log(error);
  }
}

const getTokenCurrentPriceInUSD = async(tokenData,priceEntered)=>{
  try {
    const API_KEY = "ea8f6951c3479ebe8bbae60ab38f0fb60466b01bdf548f6eba4d778b9f54cce8";
    const url = `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${tokenData.address}&vs_currencies=usd`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Apikey ${API_KEY}`,
      },
    });
    
    const tokenAddress = tokenData.address;
    const tokenPriceUSD =  response.data[tokenAddress.toLowerCase()]?.usd;
    return tokenPriceUSD * parseInt(priceEntered);
    
  } catch (error) {
    console.log(error);
  }
}

const transferToken = async(tokenData,recipientAddress,priceEntered)=>{
  try {
    const provider = await new ethers.providers.JsonRpcProvider(
      "http://127.0.0.1:8545/"
    );
    const signers = await provider.getSigner();
    const transferContract = await new ethers.Contract(transferContractAddress,transferContractABI,signers);
    const transferTokenContract = await connectingWithNthToken(tokenData.address);
    await transferTokenContract.approve(
      transferContractAddress,
      priceEntered
    );
    const tx = await transferContract.transferToken(tokenData.address,recipientAddress,priceEntered);
    await tx.wait();
    console.log(tx);
    if(tx){
      return {status:"success",transactionData:tx}
    }
  } catch (error) {
    throw {error:"Some thing went wrong"}
  }
}

const collectLiquidityFee = async(positionId)=>{
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
    console.log(tx);
  } catch (error) {
    console.log(error);
  }
}

const getLiquidityFeeInUSD = async(token0Address,token1Address,token0Amount,token1Amount,token0Decimal,token1Decimal)=>{
  try {
    const token0PriceInUSD = await getTokenCurrentPriceInUSD({address:token0Address},token0Amount);
    const token1PriceInUSD  = await getTokenCurrentPriceInUSD({address:token1Address},token1Amount);
    const liquidityInUSD = token0PriceInUSD + token1PriceInUSD;
    return liquidityInUSD;
  } catch (error) {
    console.log(error);
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
  collectLiquidityFee
};
