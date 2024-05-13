"use client";
import Link from "next/link";
import UniswapLogo from "./uniswapLogo";
import { ChevronDown, SearchIcon, Slash } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentChain,
  setIsLoggedIn,
  setSelectedChain,
  setWalletAddress,
  setWalletBalance,
} from "@/lib/redux/walletState";
import { checkMetaMaskConnection, connectMetamask, handleChainChanged } from "@/context/metamask";
import { useEffect } from "react";
import { MetaMaskAvatar } from "react-metamask-avatar";
import { useRouter } from "next/navigation";
import { setPayTokenData, setRecieveTokenData, setSelectedPayTokenData, setSelectedRecieveTokenData } from "@/lib/redux/swapState";
import { contractAddress } from "@/context/contractAddress";

const chains = [
  {
    name: "Ethereum",
    image: "/images/Ethereum.png",
  },
  {
    name: "Arbitrum",
    image: "/images/Arbitrum.png",
  },
  {
    name: "Optimism",
    image: "/images/Optimism.png",
  },
  {
    name: "Polygon",
    image: "/images/Polygon.png",
  },
  {
    name: "Base",
    image: "/images/Base.png",
  },
  {
    name: "BNB Chain",
    image: "/images/BNB Chain.png",
  },
  {
    name: "Avalanche",
    image: "/images/Avalanche.png",
  },
  {
    name: "Celo",
    image: "/images/Celo.png",
  },
];

const Navbar = () => {
  const walletState = useSelector((state: any) => state.walletState);
  const dispatch = useDispatch();
  const router = useRouter();

  const connect = async () => {
    try {
      const data = await connectMetamask();
      dispatch(setWalletAddress(data.address));
      dispatch(setIsLoggedIn(data.loggedIn));
      dispatch(setWalletBalance(data.balance));
      dispatch(setCurrentChain(data.network))
      if(data.network === "matic"){
        dispatch(setSelectedChain("Polygon"));
      }
      if(data.network === "mainnet"){
        dispatch(setSelectedChain("Ethereum"));
        dispatch(setPayTokenData(contractAddress.mainnet));
        dispatch(setSelectedPayTokenData(contractAddress.mainnet[0]));
        dispatch(setRecieveTokenData(contractAddress.mainnet));
        // dispatch(setSelectedRecieveTokenData(contractAddress.mainnet))
      }
      if(data.network === "arbitrum"){
        dispatch(setSelectedChain("Arbitrum"));
      }
      if(data.network === "base"){
        dispatch(setSelectedChain("Base"));
      }
      if(data.network === "bnb"){
        dispatch(setSelectedChain("BNB Chain"));
      }
      if(data.network === "sepolia"){
        dispatch(setPayTokenData(contractAddress.sepolia));
        dispatch(setSelectedPayTokenData(contractAddress.sepolia[0]));
        dispatch(setRecieveTokenData(contractAddress.sepolia));
        // dispatch(setSelectedRecieveTokenData(contractAddress.sepolia[0]));
      }
      if(data.network === "unknown"){
        dispatch(setSelectedChain("Ethereum"));
        dispatch(setPayTokenData(contractAddress.mainnet));
        dispatch(setSelectedPayTokenData(contractAddress.mainnet[0]));
        dispatch(setRecieveTokenData(contractAddress.mainnet));
        // dispatch(setSelectedRecieveTokenData(contractAddress.mainnet))
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  const check = async () => {
    await checkMetaMaskConnection()
      .then(async (response) => {
        if (response != null) {
          await connect();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    check();
    const navigationEntries = window.performance.getEntriesByType("navigation");
    if (
      navigationEntries.length > 0 &&
      (navigationEntries as any)[0].type === "reload"
    ) {
      check();
    }
  }, []);

  const toShortAddress = (address: any) => {
    const fullAddress = address;
    const shortAddress = address.slice(0, 7) + "..." + address.slice(-5);
    return { fullAddress: fullAddress, shortAddress: shortAddress };
  };

  // const handleChainChange = (value) => {
  //   dispatch(setSelectedChain(value));
  //   if(value === "Ethereum"){
  //     connectToEthereumMainnet();
  //   }
  //   if(value === "Polygon"){
  //     connectToPolygonMainnet();
  //   }
  //   if(value === "Arbitrum"){
  //     connectToArbitrumMainnet();
  //   }
  //   if(value === "Optimism"){
  //     connectToOptimismMainnet();
  //   }
  //   if(value === "Base"){
  //     connectToBaseMainnet();
  //   }
  //   if(value === "BNB Chain"){
  //     connectToBNBMainnet();
  //   }
  //   if(value === "Avalanche"){
  //     connectToAvalancheMainnet();
  //   }
  //   if(value === "Celo"){
  //     connectToCeloMainnet();
  //   }
  // };


  // (window as any).ethereum.on("chainChanged", async(chainId)=>{
  //   try {
  //     const data = await handleChainChanged(chainId);
  //     dispatch(setWalletAddress(data.address));
  //     dispatch(setIsLoggedIn(data.loggedIn));
  //     dispatch(setWalletBalance(data.balance));
  //     dispatch(setCurrentChain(data.network));
  //     if(data.network === "matic"){
  //       dispatch(setSelectedChain("Polygon"));
  //     }
  //     if(data.network === "mainnet"){
  //       dispatch(setSelectedChain("Ethereum"));
  //     }
  //     if(data.network === "arbitrum"){
  //       dispatch(setSelectedChain("Arbitrum"));
  //     }
  //     if(data.network === "base"){
  //       dispatch(setSelectedChain("Base"));
  //     }
  //     if(data.network === "bnb"){
  //       dispatch(setSelectedChain("BNB Chain"));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });



  return (
    <nav className="flex p-2 items-center justify-between">
      <div className="flex items-center font-medium text-sm text-gray-500 gap-4">
        <UniswapLogo />
        <Link className="px-3 py-2 hover:bg-gray-100 rounded-lg" href={"/swap"}>
          Swap
        </Link>
        <Link
          className="px-3 py-2 hover:bg-gray-100 rounded-lg"
          href={"/explore"}
        >
          Explore
        </Link>
        <Link className="px-3 py-2 hover:bg-gray-100 rounded-lg" href={"/nfts"}>
          NFTs
        </Link>
        <Link className="px-3 py-2 hover:bg-gray-100 rounded-lg" href={"/pool"}>
          Pool
        </Link>
        <ChevronDown className="hover:bg-gray-100 rounded-lg" color="gray" />
      </div>
      <div className="flex items-center justify-between border rounded-full px-3 py-2 w-[35%]">
        <div className="flex items-center gap-3 w-full">
          <SearchIcon color="gray" />
          <input
            type="search"
            placeholder="Search tokens and NFT collections"
            className="focus:outline-none placeholder:text-sm w-full"
          />
        </div>
        <div className="flex justify-center items-center p-1 bg-gray-100">
          <Slash size={"10"} />
        </div>
      </div>
      <div className="flex items-center gap-4 px-4">
        <Select
        value={walletState.selectedChain}
          onValueChange={(value) => {
            // handleChainChange(value);
          }}
        >
          <SelectTrigger className="border-none">
            <SelectValue
              placeholder={
                <div className="flex items-center justify-between gap-4 pr-3">
                  <img
                    className="h-6 w-6"
                    src={`/images/Ethereum.png`}
                    alt={walletState.selectedChain}
                  />
                </div>
              }
            />
          </SelectTrigger>

          <SelectContent className="w-[220px]">
            <SelectGroup>
              {chains.map((item: any, index: any) => (
                <SelectItem key={index} value={item.name}>
                  <div className="flex items-center justify-between gap-4 pr-8">
                    <img className="h-8 w-8" src={item.image} alt="ethereum" />
                    <p>{item.name}</p>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {!walletState.isLoggedIn && (
          <Button
            onClick={connect}
            className="rounded-full bg-[#FFEFFF] text-pink-400"
          >
            Connect
          </Button>
        )}
        {walletState.isLoggedIn && (
          <div className="flex gap-2 px-2 py-1 hover:bg-gray-100 cursor-pointer rounded-full">
            <MetaMaskAvatar address={walletState?.walletAddress} size={24} />
            {toShortAddress(walletState?.walletAddress).shortAddress}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
