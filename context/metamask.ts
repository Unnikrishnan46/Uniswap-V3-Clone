import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";

const checkMetaMask = async () => {
  const provider = await detectEthereumProvider();
  return provider?.isMetaMask;
};

const checkMetaMaskConnection = async () => {
  if ((window as any).ethereum) {
    try {
      const accounts = await (window as any).ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length > 0) {
        const connectedAccount = accounts[0];
        return connectedAccount;
      } else {
        // console.log("MetaMask is installed, but not connected to any account.");
        return null;
      }
    } catch (error) {
      // console.error("Error checking MetaMask connection:", error);
      return null;
    }
  } else {
    // console.log("MetaMask not detected.");
    return null;
  }
};

async function connectMetamask() {
  if (await checkMetaMask()) {
    try {
      const provider = new ethers.providers.JsonRpcProvider({
        url: "http://127.0.0.1:8545/",
      });
      const signers = await provider.getSigner();
      const address = await signers.getAddress();
      const balance = await provider.getBalance(address);
      const balanceInEther = await ethers.utils.formatEther(balance);

      const network = await provider._network;
      const chainId = await provider.send("eth_chainId", []);
      return {
        address: address,
        loggedIn: true,
        provider: provider,
        balance: balanceInEther,
        network: network.name,
      };
    } catch (error: any) {
      // console.log(error);
      throw error.info.error.message;
    }
  } else {
    throw "Install Metamask";
  }
}



async function handleChainChanged(chainId:any) {
  if (await checkMetaMask()) {
    try {
      const provider = await new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      await provider.send("eth_requestAccounts", []);
      const signers = await provider.getSigner();
      const address = await signers.getAddress();
      const balance = await provider.getBalance(address);
      const balanceInEther = await ethers.utils.formatEther(balance);
      const network = await provider._network;
      const chainId = await provider.send("eth_chainId", []);
      // console.log(network.name, balance, balanceInEther, chainId);

      return {
        address: address,
        loggedIn: true,
        provider: provider,
        balance: balanceInEther,
        network: network.name,
      };
    } catch (error: any) {
      // console.log(error);
      throw error.info.error.message;
    }
  } else {
    throw "Install Metamask";
  }
}





export {
  connectMetamask,
  checkMetaMaskConnection,
  handleChainChanged,
};
