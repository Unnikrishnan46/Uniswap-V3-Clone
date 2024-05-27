"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { contractAddress } from "@/context/contractAddress";
import { connectMetamask } from "@/context/metamask";
import {
  setLiquiditySuccessData,
  setLiquiditySuccessOpen,
  setPoolTokenDialogOneOpen,
  setPoolTokenDialogZeroOpen,
} from "@/lib/redux/dialogState";
import { setSelectedPoolTokenOneData, setSelectedPoolTokenZeroData } from "@/lib/redux/poolState";
import {
  setPayTokenData,
  setRecieveTokenData,
  setSelectedPayTokenData,
} from "@/lib/redux/swapState";
import {
  setCurrentChain,
  setIsLoggedIn,
  setSelectedChain,
  setWalletAddress,
  setWalletBalance,
} from "@/lib/redux/walletState";
import { cn } from "@/lib/utils";
import {
  getTokenInBal,
  getTokenOutBal,
  handleAddLiquidity,
} from "@/utils/appFeatures";
import { getSpotPrice } from "@/utils/swapUpdatePrice";
import { ArrowLeft, CheckCircle, ChevronDown, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const AddPage = () => {
  const feeDataArray = [
    {
      fee:100,
      percent: "0.01",
      description: "Best very stable pairs",
    },
    {
      fee:500,
      percent: "0.05",
      description: "Best for stable pairs.",
    },
    {
      fee:3000,
      percent: "0.30",
      description: "Best for most pairs.",
    },
    {
      fee:10000,
      percent: "1.00",
      description: "Best for exotic pairs.",
    },
  ];
  const dispatch = useDispatch();
  const poolState = useSelector((state: any) => state.poolState);
  const walletState = useSelector((state: any) => state.walletState);
  const [selectedPercentage, setSelectedPercentage] = useState<any>(feeDataArray[0]);
  const [lowPrice, setLowPrice] = useState<any>("");
  const [highPrice, setHighPrice] = useState<any>("");
  const [currentPriceOfoneToken, setCurrentPriceOfoneToken] = useState("");
  const [buttonStatus, setButtonStatus] = useState("");
  const [token0AmountToDeposit, setToken0AmountToDeposit] = useState("");
  const [token1AmountToDeposit, setToken1AmountToDeposit] = useState<any>("");
  const [isLoading,setIsLoading] = useState(false);

  const handleOpenPoolDialogZero = () => {
    dispatch(setPoolTokenDialogZeroOpen(true));
  };

  const handleOpenPoolDialogOne = () => {
    dispatch(setPoolTokenDialogOneOpen(true));
  };

  const handlePercentageSelect = (data) => {
    setSelectedPercentage(data);
  };

  const getCurrentPriceOfToken = async () => {
    setIsLoading(true);
    try {
      if (
      poolState?.selectedPoolTokenZeroData &&
      poolState?.selectedPoolTokenOneData
    ) {
      const tokenInData = poolState?.selectedPoolTokenZeroData;
      const tokenOutData = poolState?.selectedPoolTokenOneData;
      const currentPrice = await getSpotPrice(tokenInData, tokenOutData, 1);
      setCurrentPriceOfoneToken(currentPrice);
    }
    } catch (error) {
      
    }finally{
      setIsLoading(false);
    }
    
  };

  const handleAmountOneInput = async (e) => {
    setIsLoading(true);
    try {
      if (
        poolState?.selectedPoolTokenZeroData &&
        poolState?.selectedPoolTokenOneData
      ) {
        setToken0AmountToDeposit(e.target.value);
        const tokenInData = poolState?.selectedPoolTokenZeroData;
        const tokenOutData = poolState?.selectedPoolTokenOneData;
        const currentPrice = await getSpotPrice(
          tokenInData,
          tokenOutData,
          e.target.value
        );
        setToken1AmountToDeposit(currentPrice);
        const token0Bal = await getTokenInBal(tokenInData);
        const token1Bal = await getTokenOutBal(tokenOutData);

        if (!e.target.value) {
          setToken1AmountToDeposit("");
          setButtonStatus("");
        }
        if (e.target.value > Math.floor(parseInt(token0Bal))) {
          setButtonStatus(`Insuficiant ${tokenInData.symbol} balance`);
          return ;
        }else if(e.target.value < Math.floor(parseInt(token0Bal))){
          setButtonStatus("");
        }
        if (parseInt(currentPrice.toString()) > Math.floor(parseInt(token1Bal))) {
          setButtonStatus(`Insuficiant ${tokenOutData.symbol} balance`);
          return ;
        }else if(currentPrice.toString() < token1Bal){
          setButtonStatus("");
        }
      }
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false);
    }
  };


  const connect = async () => {
    setIsLoading(true);
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
      console.log(error);
    }finally{
      setIsLoading(false);
    }
  };

  const handleAddPosition = async () => {
    setIsLoading(true);
    try {
      if (
        poolState?.selectedPoolTokenZeroData &&
        poolState?.selectedPoolTokenOneData
      ) {
        const token0Data = poolState?.selectedPoolTokenZeroData;
        const token1Data = poolState?.selectedPoolTokenOneData;
        
        const amount0ToMint = token0AmountToDeposit;
        const amount1ToMint = token1AmountToDeposit;
        const poolFee = selectedPercentage;
        const promise:any = handleAddLiquidity(
          token0Data,
          token1Data,
          amount0ToMint,
          amount1ToMint,
          poolFee,
          lowPrice,
          highPrice
        );
        toast.promise(promise, {
          loading: "Transaction in progress...",
          success: (data:any) => {
            if(data.status === "Success"){
            setToken0AmountToDeposit("");
            setToken1AmountToDeposit("");
            dispatch(setLiquiditySuccessOpen(true));
            dispatch(setLiquiditySuccessData(data));
            if(data){
              return <div className="flex justify-between items-center w-full">
                <div className="flex gap-2 items-center">
                <CheckCircle/>
                <p className="font-semibold ">Position created successfully</p>
                </div>
                <Button onClick={()=>{handleShowDetails(data.receipt.blockHash)}} className="py-0" variant="uniswap">More Details</Button>
                </div>
            }
          }
          },
          error: (error:any)=>{
            if(error.status === "fail"){
              return toast.warning(error.error);
            }
          },
        });
      }
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false);
    }
  };

  const handleShowDetails = (hash:any)=>{
    window.open(`https://etherscan.io/tx/${hash}`);
  }


  const handleClearAll = ()=>{
    setLowPrice("");
    setHighPrice("");
    setCurrentPriceOfoneToken("");
    setButtonStatus("");
    setToken0AmountToDeposit("");
    setToken1AmountToDeposit("");
    setSelectedPercentage(feeDataArray[0]);
    dispatch(setSelectedPoolTokenZeroData(contractAddress.mainnet[0]));
    dispatch(setSelectedPoolTokenOneData(null));
  }

  useEffect(() => {
    getCurrentPriceOfToken();
  }, [
    poolState?.selectedPoolTokenZeroData,
    poolState?.selectedPoolTokenOneData,
  ]);



  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col gap-2 w-[45%] border rounded-xl px-5 mt-10 mb-10 max-lg:w-[65%] max-md:w-[75%] max-sm:w-[95%]">
        <div className="flex justify-between w-full p-3 items-center max-md:justify-start">
          <ArrowLeft /> 
          <h1 className="text-xl font-medium w-full">Add liquidity</h1>
          <div className="flex gap-2 items-center max-md:justify-end">
            <Button onClick={handleClearAll} variant="ghost" className="text-[#fc72ff] max-md:hidden">
              clear all
            </Button>

            <Settings />
          </div>
        </div>
        <Separator className="mt-3 mb-4" />

        <div className="flex w-full gap-2">
          <Button
            onClick={handleOpenPoolDialogZero}
            size="lg"
            variant="outline"
            className="rounded-xl w-1/2 px-2 items-center"
          >
            <div className="text-xl text-black font-semibold justify-between flex items-center gap-2 w-full">
              <div className="flex gap-2">
                <img
                  className="h-6 w-6"
                  src={poolState?.selectedPoolTokenZeroData?.icon}
                  alt="image"
                />
                <p>{poolState?.selectedPoolTokenZeroData?.symbol}</p>
              </div>
              <img className="h-5 w-5" src="/images/angleDown.svg" alt="" />
            </div>
          </Button>

          {poolState?.selectedPoolTokenOneData && (
            <Button
              onClick={handleOpenPoolDialogOne}
              size="lg"
              variant="outline"
              className="rounded-xl w-1/2 px-2 items-center"
            >
              <div className="text-xl text-black font-semibold justify-between flex items-center gap-2 w-full">
                <div className="flex gap-2">
                  <img
                    className="h-6 w-6"
                    src={poolState?.selectedPoolTokenOneData?.icon}
                    alt="image"
                  />
                  <p>{poolState?.selectedPoolTokenOneData?.symbol}</p>
                </div>
                <img className="h-5 w-5" src="/images/angleDown.svg" alt="" />
              </div>
            </Button>
          )}
          {!poolState?.selectedPoolTokenOneData && (
            <Button
              onClick={handleOpenPoolDialogOne}
              size="lg"
              variant="uniswap"
              className="rounded-xl w-1/2 px-2 items-center"
            >
              <div className="text-xl font-semibold justify-between flex items-center gap-2 w-full">
                <div className="flex gap-2">
                  <p>Select a token</p>
                </div>
                <ChevronDown />
              </div>
            </Button>
          )}
        </div>

        <div className="flex justify-between items-center px-3 mt-3">
          <div className="flex flex-col">
            <h1 className="font-semibold text-sm">Fee tier</h1>
            <p className="text-xs">The % you will earn in fees.</p>
          </div>
          <h1 className="font-semibold">Hide</h1>
        </div>
        <Separator className="mt-3 mb-3" />

        <div className="grid grid-cols-4 items-center gap-2 w-full">
          {feeDataArray?.map((item, index) => (
            <div
              onClick={() => handlePercentageSelect(item)}
              key={index}
              className={cn(
                "flex flex-col gap-2 border rounded-lg p-3 cursor-pointer",
                selectedPercentage.percent === item.percent ? "border-[#fc72ff]" : ""
              )}
            >
              <p className="font-semibold text-sm">{item.percent}%</p>
              <p className="text-xs">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col mt-3 gap-3">
          <h1 className="font-semibold text-base">Set price range</h1>
          <div className=" flex flex-col gap-1 border p-3 rounded-2xl bg-gray-50">
            <p className="font-medium text-gray-400 text-xs">Low price</p>
            <input
              // readOnly={true}
              onChange={(e)=>{setLowPrice(e.target.value)}}
              value={lowPrice}
              className="bg-gray-50 focus:outline-none focus:bg-none font-bold text-xl"
              type="text"
            />
            <p className="font-medium text-gray-400 text-xs">{poolState?.selectedPoolTokenOneData?.symbol} per {poolState?.selectedPoolTokenZeroData?.symbol}</p>
          </div>
          <div className=" flex flex-col gap-1 border p-3 rounded-2xl bg-gray-50">
            <p className="font-medium text-gray-400 text-xs">High price</p>
            <input
            // readOnly={true}
            onChange={(e)=>{setHighPrice(e.target.value)}}
              value={highPrice}
              className="bg-gray-50 focus:outline-none focus:bg-none font-bold text-xl"
              type="text"
            />
            <p className="font-medium text-gray-400 text-xs">{poolState?.selectedPoolTokenOneData?.symbol} per {poolState?.selectedPoolTokenZeroData?.symbol}</p>
          </div>
        </div>

        {poolState?.selectedPoolTokenZeroData &&
          poolState?.selectedPoolTokenOneData && (
            <div className="flex flex-col mt-3 gap-1">
              <h1 className="font-semibold text-sm">Current price:</h1>
              <p className="font-semibold text-xl">
                {currentPriceOfoneToken ? currentPriceOfoneToken : ""}
              </p>
              <p className="text-xs font-medium">
                {poolState?.selectedPoolTokenOneData?.symbol} per{" "}
                {poolState?.selectedPoolTokenZeroData?.symbol}
              </p>
            </div>
          )}

        <div className="flex flex-col mt-5 gap-3">
          <h1 className="font-semibold text-base">Deposit amounts</h1>
          <div className="flex justify-between items-center border rounded-2xl p-5 bg-gray-50">
            <div>
              <input
                onChange={(e) => {
                  handleAmountOneInput(e);
                }}
                value={token0AmountToDeposit}
                placeholder="0"
                className="bg-gray-50 focus:outline-none placeholder:text-2xl placeholder:text-gray-300 placeholder:font-medium focus:bg-none font-bold text-xl"
                type="text"
              />
              <p>-</p>
            </div>
            {poolState?.selectedPoolTokenZeroData && (
              <Button
              disabled={isLoading}
                className="flex gap-2 items-center rounded-full"
                variant="outline"
              >
                <img
                  className="h-6 w-6"
                  src={poolState?.selectedPoolTokenZeroData?.icon}
                  alt=""
                />
                <h1 className="text-lg">
                  {poolState?.selectedPoolTokenZeroData?.symbol}
                </h1>
              </Button>
            )}
          </div>
          <div className="flex justify-between items-center border rounded-2xl p-5 bg-gray-50">
            <div>
              <input
                onChange={(e) => {
                  setToken1AmountToDeposit(e.target.value);
                }}
                value={token1AmountToDeposit}
                placeholder="0"
                className="bg-gray-50 focus:outline-none placeholder:text-2xl placeholder:text-gray-300 placeholder:font-medium focus:bg-none font-bold text-xl"
                type="text"
              />
              <p>-</p>
            </div>
            {poolState?.selectedPoolTokenOneData && (
              <Button
              disabled={isLoading}
                className="flex gap-2 items-center rounded-full"
                variant="outline"
              >
                <img
                  className="h-6 w-6"
                  src={poolState?.selectedPoolTokenOneData?.icon}
                  alt=""
                />
                <h1 className="text-lg">
                  {poolState?.selectedPoolTokenOneData?.symbol}
                </h1>
              </Button>
            )}
          </div>
        </div>
        <div className="w-full mt-5 mb-5">
          {!walletState?.isLoggedIn && (
            <Button
            disabled={isLoading}
              onClick={connect}
              className="bg-[#ffefff] text-[#fc72ff] w-full text-xl font-semibold"
            >
              Connect wallet
            </Button>
          )}

          {!token0AmountToDeposit &&
            !token1AmountToDeposit &&
            walletState?.isLoggedIn && (
              <Button
              disabled={isLoading}
                variant="secondary"
                className="text-gray-400 w-full text-xl font-semibold"
              >
                Enter an amount
              </Button>
            )}
          {buttonStatus && walletState?.isLoggedIn && (
            <Button
              variant="destructive"
              className=" w-full text-xl font-semibold opacity-60"
            >
              {buttonStatus ? buttonStatus : ""}
            </Button>
          )}
          {!buttonStatus &&
            walletState?.isLoggedIn &&
            token0AmountToDeposit &&
            token1AmountToDeposit && (
              <Button
              disabled={isLoading}
                onClick={handleAddPosition}
                variant="uniswap"
                className=" w-full text-xl font-semibold opacity-60"
              >
                Add Position
              </Button>
            )}
        </div>
      </div>
    </div>
  );
};

export default AddPage;
