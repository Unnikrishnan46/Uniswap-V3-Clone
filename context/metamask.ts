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
        console.log("MetaMask is installed, but not connected to any account.");
        return null;
      }
    } catch (error) {
      console.error("Error checking MetaMask connection:", error);
      return null;
    }
  } else {
    console.log("MetaMask not detected.");
    return null;
  }
};

async function connectMetamask() {
  if (await checkMetaMask()) {
    try {
      const provider = await new ethers.BrowserProvider(
        (window as any).ethereum
      );
      await provider.send("eth_requestAccounts", []);
      const signers = await provider.getSigner();
      const address = await signers.getAddress();
      const balance = await provider.getBalance(address);
      const balanceInEther = await ethers.formatEther(balance);
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
      console.log(error);
      throw error.info.error.message;
    }
  } else {
    throw "Install Metamask";
  }
}

async function handleChainChanged(chainId:any) {
  if (await checkMetaMask()) {
    try {
      const provider = await new ethers.BrowserProvider(
        (window as any).ethereum
      );
      await provider.send("eth_requestAccounts", []);
      const signers = await provider.getSigner();
      const address = await signers.getAddress();
      const balance = await provider.getBalance(address);
      const balanceInEther = await ethers.formatEther(balance);
      const network = await provider._network;
      const chainId = await provider.send("eth_chainId", []);
      console.log(network.name, balance, balanceInEther, chainId);

      return {
        address: address,
        loggedIn: true,
        provider: provider,
        balance: balanceInEther,
        network: network.name,
      };
    } catch (error: any) {
      console.log(error);
      throw error.info.error.message;
    }
  } else {
    throw "Install Metamask";
  }
}

async function connectToEthereumMainnet() {
  try {
    const provider = (window as any).ethereum;
    await provider.send("eth_requestAccounts", []);
    const ethereumMainnetChainId = "0x1";
    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: ethereumMainnetChainId }],
      });
      console.log("You have succefully switched to Ethereum Main network");
    } catch (switchError) {
      if (switchError.code === 4902) {
        console.log(
          "This network is not available in your metamask, please add it"
        );
      }
      console.log("Failed to switch to the network");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function connectToPolygonMainnet() {
  try {
    const provider = (window as any).ethereum;
    await provider.send("eth_requestAccounts", []);
    const polygonMainnetChainId = "137";
    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: ethers.toBeHex(polygonMainnetChainId) }],
      });
      console.log("You have succefully switched to Polygon Main network");
    } catch (switchError) {
      if (switchError.code === 4902) {
        await provider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: ethers.toBeHex(polygonMainnetChainId),
              chainName: "Polygon Mainnet",
              nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18,
              },
              rpcUrls: ["https://polygon-rpc.com"],
              blockExplorerUrls: ["https://polygonscan.com/"],
            },
          ],
        });
        console.log("Polygon Mainnet chain added to MetaMask");
      }
      console.log("Failed to switch to the network");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function connectToArbitrumMainnet() {
  try {
    const provider = (window as any).ethereum;
    await provider.send("eth_requestAccounts", []);
    const arbitrumMainnetChainId = "42161";
    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: ethers.toBeHex(arbitrumMainnetChainId) }],
      });
      console.log("You have succefully switched to Arbitrum Main network");
    } catch (switchError) {
      if (switchError.code === 4902) {
        await provider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: ethers.toBeHex(arbitrumMainnetChainId),
              chainName: "Arbitrum One",
              nativeCurrency: {
                name: "ETH",
                symbol: "ETH",
                decimals: 18,
              },
              rpcUrls: ["https://arbitrum-mainnet.infura.io"],
            },
          ],
        });
        console.log("Polygon Mainnet chain added to MetaMask");
      }
      console.log("Failed to switch to the network");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function connectToOptimismMainnet() {
  try {
    const provider = (window as any).ethereum;
    await provider.send("eth_requestAccounts", []);
    const optimismMainnetChainId = "0x10";
    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: ethers.toBeHex(optimismMainnetChainId)}],
      });
      console.log("You have succefully switched to Optimism Main network");
    } catch (switchError) {
      if (switchError.code === 4902) {
        await provider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: ethers.toBeHex(optimismMainnetChainId),
              chainName: "OP Mainnet",
              nativeCurrency: {
                name: "ETH",
                symbol: "ETH",
                decimals: 18,
              },
              rpcUrls: ["https://optimism-mainnet.infura.io"],
            },
          ],
        });
        console.log("Optimism Mainnet chain added to MetaMask");
      }
      console.log("Failed to switch to the network");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function connectToBaseMainnet() {
  try {
    const provider = (window as any).ethereum;
    await provider.send("eth_requestAccounts", []);
    const baseMainnetChainId = "8453";
    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: ethers.toBeHex(baseMainnetChainId) }],
      });
      console.log("You have succefully switched to Base Main network");
    } catch (switchError) {
      if (switchError.code === 4902) {
        await provider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: ethers.toBeHex(baseMainnetChainId),
              chainName: "Base",
              nativeCurrency: {
                name: "ETH",
                symbol: "ETH",
                decimals: 18,
              },
              rpcUrls: ["https://mainnet.base.org/"],
            },
          ],
        });
        console.log("Base Mainnet chain added to MetaMask");
      }
      console.log("Failed to switch to the network");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function connectToBNBMainnet() {
  try {
    const provider = (window as any).ethereum;
    await provider.send("eth_requestAccounts", []);
    const BNBMainnetChainId = "56";
    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: ethers.toBeHex(BNBMainnetChainId) }],
      });
      console.log("You have succefully switched to BNB Main network");
    } catch (switchError) {
      if (switchError.code === 4902) {
        await provider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: ethers.toBeHex(BNBMainnetChainId),
              chainName: "BNB Smart Chain Mainnet",
              nativeCurrency: {
                name: "BNB",
                symbol: "BNB",
                decimals: 18,
              },
              rpcUrls: ["https://bsc-dataseed1.bnbchain.org"],
            },
          ],
        });
        console.log("BNB Mainnet chain added to MetaMask");
      }
      console.log("Failed to switch to the network");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function connectToAvalancheMainnet() {
  try {
    const provider = (window as any).ethereum;
    await provider.send("eth_requestAccounts", []);
    const AvalancheMainnetChainId = "43114";
    const AVALANCHE_MAINNET_PARAMS = {
      chainId: "0xA86A",
      chainName: "Avalanche Mainnet C-Chain",
      nativeCurrency: {
        name: "Avalanche",
        symbol: "AVAX",
        decimals: 18,
      },
      rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
      blockExplorerUrls: ["https://snowtrace.io/"],
    };
    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: ethers.toBeHex(AvalancheMainnetChainId) }],
      });
      console.log("You have succefully switched to Avalanche Main network");
    } catch (switchError) {
      if (switchError.code === 4902) {
        await provider.request({
          method: "wallet_addEthereumChain",
          params: [
            AVALANCHE_MAINNET_PARAMS
          ],
        });
        console.log("Avalanche Mainnet chain added to MetaMask");
      }
      console.log("Failed to switch to the network");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function connectToCeloMainnet() {
  try {
    const provider = (window as any).ethereum;
    await provider.send("eth_requestAccounts", []);
    const celoMainnetChainId = "0xa4ec";
    const CELO_PARAMS = {
      chainId: "0xa4ec",
      chainName: "Celo",
      nativeCurrency: { name: "Celo", symbol: "CELO", decimals: 18 },
      rpcUrls: ["https://forno.celo.org"],
      blockExplorerUrls: ["https://explorer.celo.org/"],
      iconUrls: ["future"],
    };
    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: ethers.toBeHex(celoMainnetChainId) }],
      });
      console.log("You have succefully switched to celo Main network");
    } catch (switchError) {
      if (switchError.code === 4902) {
        await provider.request({
          method: "wallet_addEthereumChain",
          params: [CELO_PARAMS
          ],
        });
        console.log("celo Mainnet chain added to MetaMask");
      }
      console.log("Failed to switch to the network");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export {
  connectMetamask,
  checkMetaMaskConnection,
  handleChainChanged,
  connectToEthereumMainnet,
  connectToPolygonMainnet,
  connectToArbitrumMainnet,
  connectToOptimismMainnet,
  connectToBaseMainnet,
  connectToBNBMainnet,
  connectToAvalancheMainnet,
  connectToCeloMainnet
};
