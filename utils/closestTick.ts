import bn from "bignumber.js";
import { getPoolData } from "./appFeatures";
import IUniswapV3Pool from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import { ethers } from "ethers";
bn.config({ EXPONENTIAL_AT: 999999, DECIMAL_PLACES: 40 });

// let Decimal0 = 6;
// let Decimal1 = 18;
// let oneETH = 10 ** Decimal1;
// let oneUSDC = 10 ** Decimal0;

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


