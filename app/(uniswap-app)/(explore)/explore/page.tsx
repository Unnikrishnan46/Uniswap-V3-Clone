"use client";

import BarChart from "@/components/internal/barChart";
import CoinTable from "@/components/internal/coinTable";
import LineChart from "@/components/internal/lineChart";
import { fetchCoinData, getSubgraphData } from "@/utils/appFeatures";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import PaginationComponent from "@/components/internal/pagination";

const Explore = () => {
  const [data, setData] = useState<any>([]);
  const [label, setLabel] = useState<any>();
  const [totalVolumes, setTotalVolumes] = useState<any>();
  const [coinData, setCoinData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage,setCurrentPage] = useState(1);

  const getData = async () => {
    setIsLoading(true);
    const chartData = await getSubgraphData();

    setData(chartData.finalData);
    setLabel(chartData.finalLabels);
    setTotalVolumes(chartData.finalTotalVolume);
    const coinData = await fetchCoinData();
    setCoinData(coinData);
    setIsLoading(false);
  };

  const handlePaginationClick = (value)=>{
    setCurrentPage(value);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="h-full w-full px-20 max-md:px-4">
      {data && label && totalVolumes && (
        <div className="flex justify-between max-lg:flex-col max-lg:w-full">
          {isLoading ? (
            <Skeleton className="w-[49%] h-60 rounded-3xl max-lg:w-full" />
          ) : (
            <div className="flex w-[49%] max-lg:w-full">
              <LineChart data={data} label={label} />
            </div>
          )}
          {isLoading ? (
            <Skeleton className="w-[49%] h-60 rounded-3xl max-lg:w-full" />
          ) : (
            <div className="flex w-[49%] max-lg:w-full">
              <BarChart data={totalVolumes} label={label} />
            </div>
          )}
        </div>
      )}
      <div>
        <CoinTable coinData={coinData} isLoading={isLoading} currentPage={currentPage}/>
        <div className="flex w-full justify-center mt-6">
          <PaginationComponent count={(coinData?.length / 10).toFixed(0)} currentPage={currentPage} handlePaginationClick={handlePaginationClick}/>
        </div>
      </div>
    </div>
  );
};

export default Explore;
