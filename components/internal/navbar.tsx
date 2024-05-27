"use client";
import Link from "next/link";
import UniswapLogo from "./uniswapLogo";
import {
  ChevronDown,
  Power,
  SearchIcon,
  Slash,
  TrendingUp,
} from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentChain,
  setIsLoggedIn,
  setProvider,
  setSelectedChain,
  setWalletAddress,
  setWalletBalance,
} from "@/lib/redux/walletState";
import {
  checkMetaMaskConnection,
  connectMetamask,
} from "@/context/metamask";
import { useEffect, useRef, useState } from "react";
import { MetaMaskAvatar } from "react-metamask-avatar";
import { useRouter } from "next/navigation";
import {
  setPayTokenData,
  setRecieveTokenData,
  setSelectedPayTokenData,
  setSelectedRecieveTokenData,
} from "@/lib/redux/swapState";
import { contractAddress } from "@/context/contractAddress";
import { imagePaths } from "@/constants/imagePaths";
import { NavDropdownMenu } from "./navDropDownMenu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fetchCoinData } from "@/utils/appFeatures";
import { cn } from "@/lib/utils";


const Navbar = () => {
  const walletState = useSelector((state: any) => state.walletState);
  const dispatch = useDispatch();
  const router = useRouter();
  const [coinData, setCoinData] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchQuery,setSearchQuery] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const connect = async () => {
    try {
      const data = await connectMetamask();
      dispatch(setWalletAddress(data.address));
      dispatch(setIsLoggedIn(data.loggedIn));
      dispatch(setWalletBalance(data.balance));
      dispatch(setCurrentChain(data.network));
      if (data.network === "matic") {
        dispatch(setSelectedChain("Polygon"));
      }
      if (data.network === "mainnet") {
        dispatch(setSelectedChain("Ethereum"));
        dispatch(setPayTokenData(contractAddress.mainnet));
        dispatch(setSelectedPayTokenData(contractAddress.mainnet[0]));
        dispatch(setRecieveTokenData(contractAddress.mainnet));
        // dispatch(setSelectedRecieveTokenData(contractAddress.mainnet))
      }
      if (data.network === "arbitrum") {
        dispatch(setSelectedChain("Arbitrum"));
      }
      if (data.network === "base") {
        dispatch(setSelectedChain("Base"));
      }
      if (data.network === "bnb") {
        dispatch(setSelectedChain("BNB Chain"));
      }
      if (data.network === "sepolia") {
        dispatch(setPayTokenData(contractAddress.sepolia));
        dispatch(setSelectedPayTokenData(contractAddress.sepolia[0]));
        dispatch(setRecieveTokenData(contractAddress.sepolia));
        // dispatch(setSelectedRecieveTokenData(contractAddress.sepolia[0]));
      }
      if (data.network === "unknown") {
        dispatch(setSelectedChain("Ethereum"));
        dispatch(setPayTokenData(contractAddress.mainnet));
        dispatch(setSelectedPayTokenData(contractAddress.mainnet[0]));
        dispatch(setRecieveTokenData(contractAddress.mainnet));
        // dispatch(setSelectedRecieveTokenData(contractAddress.mainnet))
      }
    } catch (error) {
      // console.log(error);
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
        // console.log(error);
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

  const disconnectMetamask = () => {
    try {
      dispatch(setWalletAddress(""));
      dispatch(setWalletBalance(null));
      dispatch(setProvider(null));
      dispatch(setIsLoggedIn(false));
    } catch (error) {}
  };

  const getData = async () => {
    setIsLoading(true);
    try {
      const coinData = await fetchCoinData();
      setCoinData(coinData);
    } catch (error) {
      // console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (e) => {
    setSearchQuery(e.target.value);
    const searchQuery = e.target.value;
    const result = await searchCoin(coinData, searchQuery);
    // console.log(result);
    setSearchResult(result);
  };

  const searchCoin = (coins, searchTerm) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        coin.symbol.toLowerCase().includes(lowerCaseSearchTerm)
    );
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const handleCoinClick = (id)=>{
    router.push(`/token/${id}`);
    setIsDropdownVisible(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <nav className="flex p-2 items-center justify-between">
      <div className="flex items-center font-medium text-sm text-gray-500 gap-4">
        <Link href={"/"}>
          <UniswapLogo />
        </Link>
        <Button
          variant="secondary"
          size="icon"
          className="pl-2 pr-2 items-center h-8 w-14 justify-center hidden max-md:flex"
        >
          <img className="h-6 w-6" src={imagePaths.ethereum} alt="" />
          <ChevronDown color="gray" />
        </Button>
        <Link
          className="px-3 py-2 hover:bg-gray-100 rounded-lg max-md:hidden"
          href={"/swap"}
        >
          Swap
        </Link>
        <Link
          className="px-3 py-2 hover:bg-gray-100 rounded-lg max-md:hidden"
          href={"/explore"}
        >
          Explore
        </Link>
        <Link
          className="px-3 py-2 hover:bg-gray-100 rounded-lg max-md:hidden"
          href={"/nfts"}
        >
          NFTs
        </Link>
        <Link
          className="px-3 py-2 hover:bg-gray-100 rounded-lg max-lg:hidden"
          href={"/pool"}
        >
          Pool
        </Link>
        <NavDropdownMenu />
      </div>
      <div className="flex items-center justify-between border rounded-full px-3 py-2 w-[30%] max-lg:hidden">
        <div className="flex items-center gap-3 w-full relative">
          <SearchIcon color="gray" />
          <input
          ref={inputRef}
            onChange={(e) => {
              handleSearch(e);
            }}
            onFocus={() => setIsDropdownVisible(true)}
            type="search"
            placeholder="Search tokens and NFT collections"
            className="focus:outline-none placeholder:text-sm w-full"
          />
          <div ref={dropdownRef} className={cn(`w-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-3xl bg-white absolute top-10 z-10`,isDropdownVisible ? "": "hidden")}>
            {!searchQuery ? 
            <div>
              <span className="flex gap-2 font-medium items-center text-gray-400 text-sm p-4 pb-0">
                <TrendingUp /> Popular tokens
              </span>
              {coinData?.slice(0, 3).map((coin, index) => {
                const profit = coin.price_change_percentage_24h > 0;
                return (
                  <div
                  onClick={()=>{handleCoinClick(coin?.id)}}
                    className="flex items-center justify-between p-4 hover:bg-slate-100 cursor-pointer rounded-lg"
                    key={index}
                  >
                    <div className="flex items-center gap-2">
                      <img className="h-10 w-10" src={coin?.image} alt="" />
                      <div className="flex flex-col gap-2">
                        <h1 className="text-black text-base font-medium">
                          {coin?.name}
                        </h1>
                        <p className="text-gray-400 text-sm">{coin?.symbol}</p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-end items-end">
                      <p className="text-black text-base">
                        ${numberWithCommas(coin?.current_price.toFixed(2))}
                      </p>
                      <p
                        className={cn(
                          "font-sm",
                          profit ? "text-green-500" : "text-red-500"
                        )}
                      >
                        {profit && "+"}
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                );
              })}
            </div> : 
            <div>
              {searchResult?.slice(0, 4).map((coin, index) => {
                const profit = coin.price_change_percentage_24h > 0;
                return (
                  <div
                  onClick={()=>{handleCoinClick(coin?.id)}}
                    className="flex items-center justify-between p-4 hover:bg-slate-100 cursor-pointer rounded-lg"
                    key={index}
                  >
                    <div className="flex items-center gap-2">
                      <img className="h-10 w-10" src={coin?.image} alt="" />
                      <div className="flex flex-col gap-2">
                        <h1 className="text-black text-base font-medium">
                          {coin?.name}
                        </h1>
                        <p className="text-gray-400 text-sm">{coin?.symbol}</p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-end items-end">
                      <p className="text-black text-base">
                        ${numberWithCommas(coin?.current_price.toFixed(2))}
                      </p>
                      <p
                        className={cn(
                          "font-sm",
                          profit ? "text-green-500" : "text-red-500"
                        )}
                      >
                        {profit && "+"}
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            }
          </div>
        </div>

        <div className="flex justify-center items-center p-1 bg-gray-100">
          <Slash size={"10"} />
        </div>
      </div>
      <div className="flex items-center gap-4 px-4">
        <SearchIcon className="hidden max-md:flex" color="gray" />
        <Button
          variant="secondary"
          size="icon"
          className="flex pl-2 pr-2 items-center h-8 w-14 justify-center max-md:hidden"
        >
          <img className="h-6 w-6" src={imagePaths.ethereum} alt="" />
          <ChevronDown color="gray" />
        </Button>

        {!walletState.isLoggedIn && (
          <Button
            onClick={connect}
            className="rounded-full bg-[#FFEFFF] text-pink-400"
          >
            Connect
          </Button>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger>
            {walletState.isLoggedIn && (
              <div className="flex gap-2 px-2 py-1 hover:bg-gray-100 cursor-pointer rounded-full">
                <MetaMaskAvatar
                  address={walletState?.walletAddress}
                  size={24}
                />
                <p className="max-lg:hidden">
                  {toShortAddress(walletState?.walletAddress).shortAddress}
                </p>
              </div>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={disconnectMetamask}
              className="flex items-center gap-3 cursor-pointer"
            >
              Disconnect <Power />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
