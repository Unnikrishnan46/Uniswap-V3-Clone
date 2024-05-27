"use client";

import SingleCoinChart from "@/components/internal/singleCoinChart";
import { Separator } from "@/components/ui/separator";
import { getHistoricalChartData, getSingleCoinData } from "@/utils/appFeatures";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"


const TokenPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [coinData, setCoinData] = useState<any>();
  const [historicalData, setHistoricalData] = useState<any>();
  const [historicalLoading,setHistoricalLoading] = useState(false)
  const [days, setDays] = useState(1);

  const getData = async () => {
    setIsLoading(true);
    try {
      const data = await getSingleCoinData(id);
      setCoinData(data);      
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getHistoricalData = async()=>{
    setHistoricalLoading(true);
    try {
        const chartData = await getHistoricalChartData(id, days, "usd");
        setHistoricalData(chartData.prices);        
      } catch (error) {
        console.log(error);
      } finally {
        setHistoricalLoading(false);
      }
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const handleDaysClick = (dayValue)=>{
    setDays(dayValue);
  }
  
  useEffect(()=>{
    getHistoricalData()
  },[days]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full h-full px-20 flex max-lg:flex-col max-md:px-4">
      <div className="flex flex-col gap-6 w-[30%] items-center mt-4 max-lg:justify-center max-lg:w-full">
        <div className="max-lg:flex max-lg:justify-center">
            {isLoading ? <Skeleton className="h-24 w-24 rounded-full" /> : 
          <img className="h-24 w-24" src={coinData?.image.large} alt="" /> }
        </div>
        <div className="flex flex-col gap-8 text-center">
        {isLoading ? <Skeleton className="h-4 w-full rounded-2xl" /> :
          <h1 className="text-5xl font-bold">{coinData?.name}</h1> }
          {isLoading ? <Skeleton className="h-12 w-full rounded-2xl" /> :
          <p className="text-base  text-gray-400 text-start">
            {coinData?.description.en.split(". ")[0].toString()}
          </p> }
        </div>
        {isLoading ? <Skeleton className="h-full w-full rounded-2xl" /> :
        <div className="flex flex-col gap-4 text-start w-full h-full">
          <h1 className="flex items-center gap-2 text-xl font-semibold text-black">
            Rank: <span className="text-base text-gray-400 font-normal">1</span>
          </h1>
          <h1 className="flex items-center gap-2 text-xl font-semibold text-black">
            Current Price:{" "}
            {coinData ? 
            <span className="text-base text-gray-400 font-normal">
              $ {numberWithCommas(
                coinData?.market_data.current_price["usd"]
              )}
            </span> : ""}
          </h1>
          {coinData ? (
            <h1 className="flex items-center gap-2 text-xl font-semibold text-black">
              Market Cap:{" "}
              <span className="text-base text-gray-400  font-normal">
                ${" "}
                {numberWithCommas(
                  coinData?.market_data.market_cap["usd"]
                    .toString()
                    .slice(0, -6)
                )}{" "}
                M
              </span>
            </h1>
          ) : (
            ""
          )}
        </div> }
      </div>
      <Separator className="max-lg:hidden" orientation="vertical" />
      <SingleCoinChart historicalData={historicalData} days={days} handleDaysClick={handleDaysClick}/>
    </div>
  );
};

export default TokenPage;
