import { ethers } from "ethers";

const ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

const ABI = [
  "function getAmountsOut(uint amountIn,address[] memory path) public view returns(uint[] memory amounts)",
];

const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
const router = new ethers.Contract(ADDRESS, ABI, provider);

export const getSpotPrice = async (tokenInData, tokenOutData, amountIn) => {
  if (tokenInData && tokenOutData && amountIn && amountIn > 0) {
    const path = [tokenInData.address, tokenOutData.address];
    const swapAmount = ethers.utils.parseUnits(
      amountIn.toString(),
      tokenInData.decimal
    );
    const amounts = await router.getAmountsOut(swapAmount, path);
    // const price = await ethers.formatUnits(amounts[1].toString(),6);
    const price = await ethers.utils.formatUnits(
      amounts[1].toString(),
      tokenOutData.decimal
    );
    return parseFloat(price).toFixed(2);
  }
};
