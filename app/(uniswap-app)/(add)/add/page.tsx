"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  setPoolTokenDialogOneOpen,
  setPoolTokenDialogZeroOpen,
} from "@/lib/redux/dialogState";
import { cn } from "@/lib/utils";
import { main } from "@/utils/addLiquidity";
import { getPoolData, handleAddLiquidity, pleaseDude } from "@/utils/appFeatures";
import { getData } from "@/utils/priceHelpers";
import { ArrowLeft, ChevronDown, Settings } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddPage = () => {
  const feeDataArray = [
    {
      percent: "0.01",
      description: "Best very stable pairs",
    },
    {
      percent: "0.05",
      description: "Best for stable pairs.",
    },
    {
      percent: "0.30",
      description: "Best for most pairs.",
    },
    {
      percent: "1.00",
      description: "Best for exotic pairs.",
    },
  ];
  const dispatch = useDispatch();
  const poolState = useSelector((state: any) => state.poolState);
  const [selectedPercentage,setSelectedPercentage] = useState<any>("0.30");
  const [lowPrice,setLowPrice] = useState("");
  const [highPrice,setHighPrice] = useState("");
  const handleOpenPoolDialogZero = () => {
    dispatch(setPoolTokenDialogZeroOpen(true));
  };

  const handleOpenPoolDialogOne = () => {
    dispatch(setPoolTokenDialogOneOpen(true));
  };

  const handlePercentageSelect = (percent)=>{
    setSelectedPercentage(percent)
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col gap-2 w-[45%] border rounded-xl px-5 mt-10 mb-10">
        <div className="flex justify-between w-full p-3 items-center">
          <ArrowLeft />
          <h1 className="text-xl font-medium">Add liquidity</h1>
          <div className="flex gap-2 items-center">
            <Button variant="ghost" className="text-[#fc72ff]">
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
            onClick={()=>handlePercentageSelect(item.percent)}
              key={index}
              className={cn("flex flex-col gap-2 border rounded-lg p-3 cursor-pointer",selectedPercentage === item.percent ? "border-[#fc72ff]" : "")}
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
              onChange={(e)=>{setLowPrice(e.target.value)}}
              value={lowPrice}
              className="bg-gray-50 focus:outline-none focus:bg-none font-bold text-xl"
              type="text"
            />
            <p className="font-medium text-gray-400 text-xs">DAI per Eth</p>
          </div>
          <div className=" flex flex-col gap-1 border p-3 rounded-2xl bg-gray-50">
            <p className="font-medium text-gray-400 text-xs">High price</p>
            <input
              onChange={(e)=>{setHighPrice(e.target.value)}}
              value={highPrice}
              className="bg-gray-50 focus:outline-none focus:bg-none font-bold text-xl"
              type="text"
            />
            <p className="font-medium text-gray-400 text-xs">DAI per Eth</p>
          </div>
        </div>

        <div className="flex flex-col mt-3 gap-1">
          <h1 className="font-semibold text-sm">Current price:</h1>
          <p className="font-semibold text-xl">3,305.87</p>
          <p className="text-xs font-medium">DAI per ETH</p>
        </div>

        <div className="flex flex-col mt-5 gap-3">
          <h1 className="font-semibold text-base">Deposit amounts</h1>
          <div className="flex justify-between items-center border rounded-2xl p-5 bg-gray-50">
            <div>
              <input
                placeholder="0"
                className="bg-gray-50 focus:outline-none placeholder:text-2xl placeholder:text-gray-300 placeholder:font-medium focus:bg-none font-bold text-xl"
                type="text"
              />
              <p>-</p>
            </div>
            <Button
              className="flex gap-2 items-center rounded-full"
              variant="outline"
            >
              <img className="h-6 w-6" src="images/DAI.png" alt="" />
              <h1 className="text-lg">ETH</h1>
            </Button>
          </div>
          <div className="flex justify-between items-center border rounded-2xl p-5 bg-gray-50">
            <div>
              <input
                placeholder="0"
                className="bg-gray-50 focus:outline-none placeholder:text-2xl placeholder:text-gray-300 placeholder:font-medium focus:bg-none font-bold text-xl"
                type="text"
              />
              <p>-</p>
            </div>
            <Button
              className="flex gap-2 items-center rounded-full"
              variant="outline"
            >
              <img className="h-6 w-6" src="images/DAI.png" alt="" />
              <h1 className="text-lg">ETH</h1>
            </Button>
          </div>
        </div>
        <div className="w-full mt-5 mb-5">
          <Button onClick={getData} className="bg-[#ffefff] text-[#fc72ff] w-full text-xl font-semibold">
            Connect wallet
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddPage;
