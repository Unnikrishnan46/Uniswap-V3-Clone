import { ethers, BigNumberish } from "ethers";
import ERC20_ABI from "@/constants/ERC20.json";
import {
  computePoolAddress,
  FeeAmount,
  Position,
  Pool,
  nearestUsableTick,
} from "@uniswap/v3-sdk";
import { Token, ChainId, BigintIsh } from "@uniswap/sdk-core";
import IUniswapV3PoolABI from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";

const NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS =
  "0xC36442b4a4522E871399CD717aBDD847Ab11FE88";

async function getTokenTransferApproval(address: string, amount: BigNumberish) {
  const provider = await new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
  const signers = await provider.getSigner();
  const tokenContract = new ethers.Contract(address, ERC20_ABI.abi, signers);
  return tokenContract.approve(
    NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS,
    amount
  );
}

const token0: Token = new Token(
  ChainId.MAINNET,
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  18
);
const token1: Token = new Token(
  ChainId.MAINNET,
  "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  6
);
const fee: FeeAmount = 500;
const POOL_FACTORY_CONTRACT_ADDRESS: string =
  "0x1F98431c8aD98523631AE4a59f267346ea31F984";

const currentPoolAddress = computePoolAddress({
  factoryAddress: POOL_FACTORY_CONTRACT_ADDRESS,
  tokenA: token0,
  tokenB: token1,
  fee: fee,
});

export const getData = async () => {
  const provider = await new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
  const signers = await provider.getSigner();

  const poolContract = new ethers.Contract(
    currentPoolAddress,
    IUniswapV3PoolABI.abi,
    signers
  );
  const [liquidity, slot0] = await Promise.all([
    poolContract.liquidity(),
    poolContract.slot0(),
  ]);

  console.log(liquidity, Number(slot0.tick));

  const configuredPool = new Pool(
    token0,
    token1,
    fee,
    slot0.sqrtPriceX96.toString(),
    liquidity.toString(),
    Number(slot0.tick)
  );

  // The maximum token amounts we want to provide. BigIntish accepts number, string or JSBI
  const amount0: BigintIsh = "1000000000000000000";
  const amount1: BigintIsh = "1000000";

  const position = Position.fromAmounts({
    pool: configuredPool,
    tickLower:
      nearestUsableTick(
        configuredPool.tickCurrent,
        configuredPool.tickSpacing
      ) -
      configuredPool.tickSpacing * 2,
    tickUpper:
      nearestUsableTick(
        configuredPool.tickCurrent,
        configuredPool.tickSpacing
      ) +
      configuredPool.tickSpacing * 2,
    amount0: amount0,
    amount1: amount1,
    useFullPrecision: true,
  });

  console.log(position);
};
