import axios from "axios";
import { TICK_SPACINGS, tickToPrice, TickMath } from "@uniswap/v3-sdk";
import JSBI from "jsbi";

interface TickProcessed {
  tickIdx: number;
  liquidityActive: JSBI;
  liquidityNet: JSBI;
  price0: string;
  price1: string;
  isCurrent: boolean;
}

export interface GraphTick {
  tickIdx: string;
  liquidityGross: string;
  liquidityNet: string;
}

export const getChartData = async (poolAddress, skip, pool, tokenA, tokenB) => {
  try {
    const response = await axios.post(
      "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
      {
        query: `{ ticks(
                  where: {poolAddress: "${poolAddress.toLowerCase()}", liquidityNet_not: "0"}
                  first: 1000,
                  skip: ${skip},
                  orderBy: tickIdx,
                  orderDirection: asc
                ) {
                  tickIdx
                  liquidityGross
                  liquidityNet
                }
              }`,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const ticks = response.data.data.ticks;
    const tickSpacing = TICK_SPACINGS[100];
    const tickIdxToTickDictionary: Record<string, GraphTick> =
      Object.fromEntries(
        ticks.map((graphTick) => [graphTick.tickIdx, graphTick])
      );
    const activeTickIdx =
      Math.floor(pool.tickCurrent / tickSpacing) * tickSpacing;

    const activeTickProcessed: TickProcessed = {
      tickIdx: activeTickIdx,
      liquidityActive: pool.liquidity,
      liquidityNet: JSBI.BigInt(0),
      price0: tickToPrice(tokenA, tokenB, activeTickIdx).toFixed(6),
      price1: tickToPrice(tokenB, tokenA, activeTickIdx).toFixed(6),
      isCurrent: true,
    };
    const currentTickInitialized = tickIdxToTickDictionary[activeTickIdx];
    if (currentTickInitialized !== undefined) {
      activeTickProcessed.liquidityNet = JSBI.BigInt(
        currentTickInitialized.liquidityNet
      );
    }
    

    let previousTickProcessed = {
        ...activeTickProcessed
    }
    
    let processedTicks: TickProcessed[] = []
    
    for (let i = 0; i < 100; i++) {
        const currentTickIdx = previousTickProcessed.tickIdx + tickSpacing
    
        if (currentTickIdx > TickMath.MAX_TICK) {
            break
        }
    
        const currentTickProcessed = {
            liquidityActive: previousTickProcessed.liquidityActive,
            tickIdx: currentTickIdx,
            liquidityNet: JSBI.BigInt(0),
            price0: tickToPrice(tokenA, tokenB, currentTickIdx).toFixed(6),
            price1: tickToPrice(tokenA, tokenB, currentTickIdx).toFixed(6),
            isCurrent: false
        }

        for (let i = 0; i < 100; i++) {    
            const currentTickInitialized = tickIdxToTickDictionary[currentTickIdx]
        
            if (currentTickInitialized !== undefined) {
                currentTickProcessed.liquidityNet = JSBI.BigInt(currentTickInitialized.liquidityNet)
                currentTickProcessed.liquidityActive = JSBI.add(
                    previousTickProcessed.liquidityActive,
                    JSBI.BigInt(currentTickInitialized.liquidityNet)
                )
            }
        
            processedTicks.push(currentTickProcessed)
            previousTickProcessed = currentTickProcessed
            // const allProcessedTicks = previousTickProcessed.concat(activeTickProcessed).concat(subsequentTicks)
        }
        
    }
    


    

  } catch (error) {
    console.log(error);
  }
};

export const suii = async (poolAddress, skip) => {
  const response = await axios.post(
    "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
    {
      query: `{ ticks(
                    where: {poolAddress: "${poolAddress.toLowerCase()}", liquidityNet_not: "0"}
                    first: 1000,
                    skip: ${skip},
                    orderBy: tickIdx,
                    orderDirection: asc
                  ) {
                    tickIdx
                    liquidityGross
                    liquidityNet
                  }
                }`,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const ticks = response.data.data.ticks;
  return ticks;
};
