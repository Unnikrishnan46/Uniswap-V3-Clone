"use client";

import TokenBadges from "@/components/internal/tokenBadge";
import { Button } from "@/components/ui/button";
import { imagePaths } from "@/constants/imagePaths";
import { collectLiquidityFee, getLiquidityInfo } from "@/utils/appFeatures";
import { ArrowLeft, Ban, Circle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PositionPAge = () => {
  const params = useParams();
  const [liquidityData,setLiquidityData] = useState(null);
  const [isLoading,setIsLoading] = useState(false);
  const [positionId,setPositionId] = useState(params?.id);
  const router = useRouter();

  const getLiquidityData = async()=>{
    setIsLoading(true);
    try {
      const LiquidityData = await getLiquidityInfo(params.id);
      setLiquidityData(LiquidityData);
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false);
    }
  }

  const handleGoBack = ()=>{
    router.back();
  }

  useEffect(()=>{
    getLiquidityData();
  },[]);

  return (
    <div className="flex h-full w-full justify-center items-center">
      <div className="w-1/2">
        <div className="flex gap-3 items-center mb-2">
          <ArrowLeft onClick={handleGoBack} color="gray" size={"20"} />
          <p onClick={handleGoBack} className="text-gray-400">Back to pools</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <TokenBadges
              tokenZero={liquidityData?.token0LogoURL}
              tokenOne={liquidityData?.token1LogoURL}
            />
            <h1 className="text-lg font-bold ml-3">{liquidityData?.token0Symbol} / {liquidityData?.token1Symbol}</h1>
            <p>{liquidityData?.liquidityPositionData?.fee/10000}%</p>
            <p>{liquidityData?.positionStatus}</p>
            {liquidityData?.positionStatus === "In Range" && ( <Circle
              className="bg-green-500 rounded-full"
              size={10}
              color="#22c55e"
            /> )}
              {liquidityData?.positionStatus === "Out of Range" && ( <Circle
              className="bg-red-500 rounded-full"
              size={10}
              color="#ef4444"
            /> )}
            {liquidityData?.positionStatus === "Closed" && ( 
              <Ban size={15} color="gray"/>
             )}
          </div>
          <div className="flex gap-2 items-center">
            <Button variant="outline">Increase liquidity</Button>
            <Button onClick={()=>{collectLiquidityFee(positionId)}} variant="uniswap">Remove liquidity</Button>
          </div>
        </div>
        <div className="flex gap-2 items-center mt-3 w-full h-full">
          <div className="flex rounded-2xl border h-full w-[45%] p-4">
            <div className="rounded-3xl w-full">
                <img src={liquidityData?.imageData} alt="" />
            </div>
          </div>
          <div className="w-[55%] flex flex-col gap-2">

          <div className="flex rounded-2xl border flex-col p-4">
            <div className="flex flex-col gap-6">
              <h1 className="font-medium text-sm text-black">Liquidity</h1>
              <h1 className="font-semibold text-3xl text-black">${liquidityData?.liquidityInUSD}</h1>
            </div>
            <div className="flex flex-col gap-2 mt-3 rounded-xl bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <img className="h-4 w-4" src={liquidityData?.token0LogoURL} alt="" />
                  <p className="text-gray-400 font-medium text-sm">{liquidityData?.token0Symbol}</p>
                </div>
                <div className="flex gap-3 items-center font-medium text-gray-400 text-xs">
                    <p>{liquidityData?.token0Amount}</p>
                    <p>44%</p>
                </div>
              </div>
              <div className="flex items-center gap-1 justify-between">
                <div className="flex items-center gap-1">
                  <img className="h-4 w-4" src={liquidityData?.token1LogoURL} alt="" />
                  <p className="text-gray-400 text-sm font-medium">{liquidityData?.token1Symbol}</p>
                </div>
                <div className="flex gap-3 font-medium items-center text-gray-400 text-xs">
                    <p>{liquidityData?.token1Amount}</p>
                    <p>56%</p>
                </div>
              </div>
            </div>
          </div>


          <div className="flex rounded-2xl border flex-col p-4">
            <div className="flex justify-between items-center">
              <h1 className="font-medium text-sm text-black">Unclaimed fees</h1>
              <Button disabled={liquidityData?.tokensOwed0 !== 0 && liquidityData?.tokensOwed1 !==0 ? true : false} variant="uniswap" size="sm">Collect fees</Button>
            </div>
             <h1 className="font-semibold text-3xl text-black">${liquidityData && liquidityData?.liquidityFeeUsd ? liquidityData?.liquidityFeeUsd : "0.00"}</h1>
            <div className="flex flex-col gap-2 mt-3 rounded-xl bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <img className="h-4 w-4" src={liquidityData?.token0LogoURL} alt="" />
                  <p className="text-gray-400 font-medium text-sm">{liquidityData?.token0Symbol}</p>
                </div>
                <div className="flex gap-3 items-center font-medium text-gray-400 text-xs">
                    <p>{liquidityData?.tokensOwed0}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 justify-between">
                <div className="flex items-center gap-1">
                  <img className="h-4 w-4" src={liquidityData?.token1LogoURL} alt="" />
                  <p className="text-gray-400 text-sm font-medium">{liquidityData?.token1Symbol}</p>
                </div>
                <div className="flex gap-3 font-medium items-center text-gray-400 text-xs">
                    <p>{liquidityData?.tokensOwed0}</p>
                </div>
              </div>
            </div>
          </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default PositionPAge;
