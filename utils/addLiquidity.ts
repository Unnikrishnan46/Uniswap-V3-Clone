import JSBI from "jsbi";
import { ethers } from "ethers";
import {
  Pool,
  Position,
  nearestUsableTick,
  Route,
  Trade,
  TickMath,
  computePoolAddress,
  FeeAmount,
  FullMath,
} from "@uniswap/v3-sdk";
import UniswapV3FactoryABI from "@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json";
import IUniswapV3Pool from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
const RPC_URL = "JSON_RPC_URL";
const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"; // quote
const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"; // base
// const provider = new ethers.JsonRpcProvider(RPC_URL);

const uniswapV3Factory = "0x1F98431c8aD98523631AE4a59f267346ea31F984";

const suii = async () => {
  const provider = await new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
  const signers = await provider.getSigner();

  const factoryContract = new ethers.Contract(
    uniswapV3Factory,
    UniswapV3FactoryABI.abi,
    provider
  );

  return factoryContract;
};

async function getSqrtPriceX96(fee) {
  const factoryContract = await suii();
  const provider = await new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
  // const provider = await provider.getSigner();
  const poolAddress = await factoryContract.getPool(WETH, USDC, fee);
  const poolContract = new ethers.Contract(
    poolAddress,
    IUniswapV3Pool.abi,
    provider
  );

  console.log(poolAddress);

  const slot0 = await poolContract.slot0();
  const sqrtPriceX96 = JSBI.BigInt(parseInt(slot0.sqrtPriceX96));

  return sqrtPriceX96;
}

async function main(inputAmount, baseTokenDecimals, quoteTokenDecimals, fee) {
  const sqrtPriceX96 = await getSqrtPriceX96(fee);

  const ratioX192 = JSBI.multiply(sqrtPriceX96, sqrtPriceX96);

  const baseAmount = JSBI.BigInt(inputAmount * 10 ** baseTokenDecimals);

  const shift = JSBI.leftShift(JSBI.BigInt(1), JSBI.BigInt(192));

  const quoteAmount = FullMath.mulDivRoundingUp(ratioX192, baseAmount, shift);
  console.log(
    `${inputAmount} USDC: `,
    quoteAmount.toString() as any / 10 ** quoteTokenDecimals,
    "WETH"
  );
  console.log(
    `${inputAmount} WETH: `,
    inputAmount / (quoteAmount.toString() as any / 10 ** quoteTokenDecimals),
    "USDC"
  );
}

const fee = 100; // 100 for 0.01% fee-tier, 3000 for 0.3% fee-tier, etc.
const amount = 1;
// (amount, 6, 18, fee);
export {main}
