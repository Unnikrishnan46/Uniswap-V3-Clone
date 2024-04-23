import { BooTokenABI, BooTokenAddress } from "@/constants/constants";
import { ethers } from "ethers";

async function exicute() {
  try {
    const provider = await new ethers.BrowserProvider((window as any).ethereum);
     await provider.send("eth_requestAccounts", []);
    // const provider = await new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
    const signers = await provider.getSigner();
    const contractInstance = new ethers.Contract(
      BooTokenAddress,
      BooTokenABI,
      signers
    );
    
  } catch (error) {
    console.log(error);
  }
}

export { exicute };
