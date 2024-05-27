import { BigNumber } from "ethers";
import { JSBI } from "@uniswap/sdk";
import {
  TICK_SPACINGS,
  tickToPrice,
  TickMath,
  Pool,
  Tick,
} from "@uniswap/v3-sdk";
import { Token, BigintIsh, CurrencyAmount } from "@uniswap/sdk-core";
import bn from "bignumber.js";
import { getPoolData } from "./appFeatures";
import IUniswapV3Pool from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import { suii } from "./fetchChartData";
import { ethers } from "ethers";
bn.config({ EXPONENTIAL_AT: 999999, DECIMAL_PLACES: 40 });

// this example will be focused on the v3 USDC_WETH 0.3% pool with a 60 tick spacing

// there will be an upper and lower tick for each price example moving to closest tick. Ticks above price should lean to higher price and vice versa

// With every pool there are two prices. The price of token 0 in relation to token 1 and vice versa

// so in this example you will have the price of WETH in USDC and the price of USDC in WETH

// ex. current price of ETH is 1873.27 so the price of WETH in USDC would be that for 1 WETH you would get 1873.271470 (rounded but 6 decimals in USDC)

// so now the revesre price the price of USDC in WETH is 0.000532325000000000 (rounded but 18 decimals for WETH)

// getting perfect percision is extremely difficult, without having extreme percision in the price (try the byOne math without toFixed to see more percision

let Decimal0 = 6;
let Decimal1 = 18;
let oneETH = 10 ** Decimal1;
let oneUSDC = 10 ** Decimal0;

export interface GraphTick {
  tickIdx: string;
  liquidityGross: string;
  liquidityNet: string;
}

export const getPoolDetails = async () => {
  try {
    const provider = await new ethers.providers.JsonRpcProvider(
      "http://127.0.0.1:8545/"
    );
    const signers = await provider.getSigner();
    const poolAddress = await getPoolData(
      "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      100
    );
    const poolContract = new ethers.Contract(
      poolAddress,
      IUniswapV3Pool.abi,
      signers
    );
    const Slot0 = await poolContract.slot0();
    const liquidity = await poolContract.liquidity();


    let CurrentTick = parseInt(Slot0.tick);
    let TickSpacing = parseInt(await poolContract.tickSpacing());
    let NearestLowTick = (Math.floor( CurrentTick / TickSpacing )) * TickSpacing;
    let NearestHighTick = ((Math.floor( CurrentTick / TickSpacing )) * TickSpacing) + TickSpacing;
    
  } catch (error) {
    console.log(error);
  }
};




// let TickLow_WETH_USDC = 1350.5;
// let TickHigh_WETH_USDC = 2500.5;

// // note that tick High and Tick low values switch when switching token view

// let TickLow_USDC_WETH = 0.001;
// let TickHigh_USDC_WETH = 0.0001;

// let CurrentSqrtPriceX96 = 1830538970152745512274303159949645;

// let CurrentPriceWETH_USDCwei = 1873273587;
// let CurrentPriceUSDC_WETHwei = 533824854607276;

// let buyOneOfToken0 =
//   (CurrentSqrtPriceX96 / 2 ** 96) ** 2 /
//   ((10 ** Decimal1 / 10 ** Decimal0) as any).toFixed(Decimal1);
// let buyOneOfToken1 = (1 / buyOneOfToken0).toFixed(Decimal0);

// const Q96 = JSBI.exponentiate(JSBI.BigInt(2), JSBI.BigInt(96)) as any;
// const MIN_TICK = -887272;
// const MAX_TICK = 887272;
// const tickSpacing = 1; // 0.3% == 60 tick spacing, 0.01% == 1 tick spacing, 0.05 == 10 tick spacing, 1% == 200 tick spacing

// function getTickAtSqrtRatio(sqrtPriceX96) {
//   let tick = Math.floor(Math.log((sqrtPriceX96 / Q96) ** 2) / Math.log(1.0001));
//   return tick;
// }

// function encodePriceSqrt(reserve1, reserve0) {
//   return BigNumber.from(
//     new bn(reserve1.toString())
//       .div(reserve0.toString())
//       .sqrt()
//       .multipliedBy(new bn(2).pow(96))
//       .integerValue(3)
//       .toString()
//   );
// }

// //--------------------------------------------------------------------------------------------------------
// function showGetCurrentSqrtPriceX96usdc() {
//   let sqrt = encodePriceSqrt(oneETH, CurrentPriceWETH_USDCwei).toString();
//   let tick = getTickAtSqrtRatio(sqrt);
//   console.log(sqrt);
//   console.log(tick);
//   console.log("");
// }
// showGetCurrentSqrtPriceX96usdc();

// function showGetCurrentSqrtPriceX96weth() {
//   let sqrt = encodePriceSqrt(CurrentPriceUSDC_WETHwei, oneUSDC).toString();
//   let tick = getTickAtSqrtRatio(sqrt);
//   console.log(sqrt);
//   console.log(tick);
//   console.log("");
// }
// showGetCurrentSqrtPriceX96usdc();
// //--------------------------------------------------------------------------------------------------------

// function getSqrtPriceX96fromLowerTickUSDC() {
//   let sqrt = encodePriceSqrt(oneETH, TickLow_WETH_USDC * oneUSDC).toString();
//   let tick = getTickAtSqrtRatio(sqrt);
//   let closest = Math.floor(tick / tickSpacing) * tickSpacing;
//   console.log(sqrt);
//   console.log(tick);
//   console.log(closest);
//   console.log("");
// }
// getSqrtPriceX96fromLowerTickUSDC();

// function getSqrtPriceX96fromUpperTickUSDC() {
//   let sqrt = encodePriceSqrt(oneETH, TickHigh_WETH_USDC * oneUSDC).toString();
//   let tick = getTickAtSqrtRatio(sqrt);
//   let closest = Math.floor(tick / tickSpacing) * tickSpacing + tickSpacing;
//   console.log(sqrt);
//   console.log(tick);
//   console.log(closest);
//   console.log("");
// }
// getSqrtPriceX96fromUpperTickUSDC();

// //--------------------------------------------------------------------------------------------

// function getSqrtPriceX96fromLowerTickWETH() {
//   let sqrt = encodePriceSqrt(TickLow_USDC_WETH * oneETH, oneUSDC).toString();
//   let tick = getTickAtSqrtRatio(sqrt);
//   let closest = Math.floor(tick / tickSpacing) * tickSpacing;
//   console.log(sqrt);
//   console.log(tick);
//   console.log(closest);
//   console.log("");
// }
// getSqrtPriceX96fromLowerTickWETH();

// function getSqrtPriceX96fromUpperTickWETH() {
//   let sqrt = encodePriceSqrt(TickHigh_USDC_WETH * oneETH, oneUSDC).toString();
//   let tick = getTickAtSqrtRatio(sqrt);
//   let closest = Math.floor(tick / tickSpacing) * tickSpacing + tickSpacing;
//   console.log(sqrt);
//   console.log(tick);
//   console.log(closest);
//   console.log("");
// }
// getSqrtPriceX96fromUpperTickWETH();
