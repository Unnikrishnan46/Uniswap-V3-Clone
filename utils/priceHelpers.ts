import { JSBI } from "@uniswap/sdk";
import { ethers } from 'ethers'



const Q96 = JSBI.exponentiate(JSBI.BigInt(2), JSBI.BigInt(96)) as any;
const MIN_TICK = -887272;
const MAX_TICK = 887272;

function getTickAtSqrtRatio(sqrtPriceX96){
    let tick = Math.floor(Math.log((sqrtPriceX96/Q96)**2)/Math.log(1.0001));
    return tick;
}

export async function getTokenAmounts(liquidity,sqrtPriceX96,tickLow,tickHigh,token0Decimal,token1Decimal){
    let sqrtRatioA = Math.sqrt(1.0001**tickLow).toFixed(18) as any;
    let sqrtRatioB = Math.sqrt(1.0001**tickHigh).toFixed(18) as any;
    let currentTick = getTickAtSqrtRatio(sqrtPriceX96);
    let sqrtPrice = sqrtPriceX96 / Q96;
    let amount0wei = 0;
    let amount1wei = 0;
    if(currentTick < tickLow){
        amount0wei = Math.floor(liquidity*((sqrtRatioB-sqrtRatioA)/(sqrtRatioA*sqrtRatioB)));
    }
    if(currentTick >= tickHigh){
        amount1wei = Math.floor(liquidity*(sqrtRatioB-sqrtRatioA));
    }
    if(currentTick >= tickLow && currentTick < tickHigh){ 
        amount0wei = Math.floor(liquidity*((sqrtRatioB-sqrtPrice)/(sqrtPrice*sqrtRatioB)));
        amount1wei = Math.floor(liquidity*(sqrtPrice-sqrtRatioA));
    }
    
    let amount0Human = (amount0wei/(10**token0Decimal)).toFixed(token0Decimal);
    let amount1Human = (amount1wei/(10**token1Decimal)).toFixed(token1Decimal);

    // console.log("Amount Token0 wei: "+amount0wei);
    // console.log("Amount Token1 wei: "+amount1wei);
    // console.log("Amount Token0 : "+amount0Human);
    // console.log("Amount Token1 : "+amount1Human);
    return {token0Amount:amount0wei,token0Decimal:token0Decimal,token1Decimal:token1Decimal, token1Amount:amount1wei}
}
