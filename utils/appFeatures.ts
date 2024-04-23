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
  singleSwapTokenABI,
  swapMultiHopABI,
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
import FactoryAbi from "@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json";
import JSBI from "jsbi";
import LiquidityExamples from "@/constants/LiquidityExamples.json";

const connectingWithBooToken = async () => {
  try {
    // const provider = await new ethers.BrowserProvider((window as any).ethereum);
    // await provider.send("eth_requestAccounts", []);
    const provider = await new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
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
    const provider = await new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
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
    const provider = await new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
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
    const provider = await new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
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
    const provider = await new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
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
    const provider = await new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
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
    const provider = await new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
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

const checkTokenBalance = async (tokenIn, amountIn) => {
  try {
    const provider = await new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
    const signers = await provider.getSigner();
    const etherBal = await signers.provider.getBalance(await signers.address);
    const convertedEthBal = await ethers.formatEther(etherBal.toString());
    const tokenInContract = await connectingWithNthToken(tokenIn);
    const tokenInBalance = await tokenInContract.balanceOf(signers.address);
    const convertedTokenInBal = await ethers.formatEther(
      tokenInBalance.toString()
    );
    if (tokenIn == IWETHAddress && convertedEthBal >= amountIn) {
      return true;
    }
    if (convertedTokenInBal < amountIn) {
      return false;
    } else if (convertedTokenInBal > amountIn) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

const singleSwapToken = async (tokenInData, tokenOutData, amountIn) => {
  try {
    const checkBal = await checkTokenBalance(tokenInData.address, amountIn);
    if (checkBal) {
      switch (tokenInData.address) {
        case DAIAddress:
          await swapDAIToken(
            tokenInData.address,
            tokenOutData.address,
            amountIn
          );
          break;
        case IWETHAddress:
          await swapWETHToken(
            tokenInData.address,
            tokenOutData.address,
            amountIn
          );
          break;
        default:
          console.log("default");
          break;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const swapWETHToken = async (tokenIn, tokenOut, amountIn) => {
  console.log("swapWETHToken working");
  try {
    const provider = await new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
    const signers = await provider.getSigner();
    const tokenInContract = await connectingWithNthToken(tokenIn);
    const tokenOutContract = await connectingWithNthToken(tokenOut);
    const singleSwapToken = await connectingWithSingleSwapToken();
    const decimal0 = 18;
    const convertedAmountIn = await ethers.parseUnits(
      amountIn.toString(),
      decimal0
    );
    await tokenInContract.deposit({ value: convertedAmountIn });
    await tokenInContract.approve(
      await singleSwapToken.getAddress(),
      convertedAmountIn
    );
    const transaction = await singleSwapToken.swapExactInputSingle(
      tokenIn,
      tokenOut,
      convertedAmountIn
    );

    await transaction.wait();
    const balance = await tokenOutContract.balanceOf(signers.address);
    const convertedBalance = await ethers.formatEther(balance.toString());
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

const swapDAIToken = async (tokenIn, tokenOut, amountIn) => {
  try {
    const provider = await new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
    const signers = await provider.getSigner();
    const tokenInContract = await connectingWithNthToken(tokenIn);
    const tokenOutContract = await connectingWithNthToken(tokenOut);
    const singleSwapToken = await connectingWithSingleSwapToken();
    const decimal0 = 18;
    const convertedAmountIn = await ethers.parseUnits(
      amountIn.toString(),
      decimal0
    );
    await tokenInContract.approve(
      await singleSwapToken.getAddress(),
      convertedAmountIn
    );
    const transaction = await singleSwapToken.swapExactInputSingle(
      tokenIn,
      tokenOut,
      convertedAmountIn
    );
    await transaction.wait();
    const balance = await tokenOutContract.balanceOf(signers.address);
    const convertedBalance = await ethers.formatEther(balance.toString());
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
    const provider = await new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
    const signers = await provider.getSigner();
    const etherBal = await signers.provider.getBalance(await signers.address);
    const convertedEthBal = await ethers.formatEther(etherBal.toString());
    if (tokenInData?.address && tokenInData?.symbol !== "ETH") {
      const tokenInContract = await connectingWithNthToken(tokenInData.address);
      const tokenInBalance = await tokenInContract.balanceOf(signers.address);
      const convertedTokenInBal = await ethers.formatEther(
        tokenInBalance.toString()
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
    const provider = await new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
    const signers = await provider.getSigner();
    const etherBal = await signers.provider.getBalance(await signers.address);
    const convertedEthBal = await ethers.formatEther(etherBal.toString());
    if (tokenOutData?.address && tokenOutData?.symbol !== "ETH") {
      const tokenOutContract = await connectingWithNthToken(
        tokenOutData?.address
      );
      const tokenOutBalance = await tokenOutContract.balanceOf(signers.address);
      const convertedTokenOutBal = await ethers.formatEther(
        tokenOutBalance.toString()
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

function getToken0Amounts(
  token1Amount,
  currentTick,
  tickLow,
  tickHigh,
  decimal0,
  decimal1
) {
  let Pa = tickToPrice(tickHigh, decimal0, decimal1);
  let Pb = tickToPrice(tickLow, decimal0, decimal1);
  let Price = tickToPrice(currentTick, decimal0, decimal1);

  console.log(Pb);
  console.log(Price);
  console.log(Pa);

  let Lx =
    token1Amount *
    ((Math.sqrt(Price) * Math.sqrt(Pb)) / (Math.sqrt(Pb) - Math.sqrt(Price)));

  let x = Math.floor(Lx * (Math.sqrt(Price) - Math.sqrt(Pa)));
  console.log(x);
  return x;
}

async function getPoolData() {
  const provider = await new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
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
  const provider = await new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
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
  const POOL_FACTORY_CONTRACT_ADDRESS: string = "0x1F98431c8aD98523631AE4a59f267346ea31F984";

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
  )
  console.log("Pass 3");
  const [liquidity, slot0] =
    await Promise.all([
      poolContract.liquidity(),
      poolContract.slot0(),
    ]);
    console.log("Pass 4",liquidity,slot0,fee,slot0.sqrtPriceX96.toString(),slot0.tick);
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

const handleAddLiquidity = async () => {
  const provider = await new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
  const signers = await provider.getSigner();
  const liquidityContractAddress = "0x4c04377f90Eb1E42D845AB21De874803B8773669";
  const liquidityContract = await new ethers.Contract(
    liquidityContractAddress,
    LiquidityExamples.abi,
    signers
  );
  console.log("Pass 1");
  const mintNewPosition = await liquidityContract.mintNewPosition();
  console.log(mintNewPosition);
};

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
  pleaseDude
};
