"use client";
import TokenBadges from "@/components/internal/tokenBadge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { imagePaths } from "@/constants/imagePaths";
import { getAllPositions } from "@/utils/appFeatures";
import {
  Airplay,
  ArrowUpRight,
  Ban,
  ChevronDown,
  Circle,
  MoveHorizontal,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const PoolPage = () => {
  const router = useRouter();
  const handleNewPosition = () => {
    router.push("/add");
  };
  const walletState = useSelector((state: any) => state.walletState);
  const [positions, setPositions] = useState([]);
  const getPositions = async () => {
    try {
      await getAllPositions().then((response: any) => {
        if(response){
          setPositions(response);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPositions();
  }, []);

  const handlePositionClick = (positionId)=>{
    router.push(`position/${positionId}`);
  }

  return (
    <div className="flex flex-col justify-center items-center h-[90.5%]">
      <div className="flex flex-col gap-2 w-[50%]">
        <div className="flex gap-2 justify-between items-center w-full">
          <div className="flex gap-2 items-center">
            <h1>Positions</h1>
            <Button variant="secondary" className="flex gap-2">
              <span>v3</span>
            </Button>
          </div>
          <div className="flex gap-2 items-center">
            <Button variant="outline">
              More <ChevronDown />
            </Button>
            <Button onClick={handleNewPosition} variant="uniswap">
              <Plus color="white" />
              New position
            </Button>
          </div>
        </div>

        <div className="flex w-full rounded-lg border items-center justify-center mt-5">
          {positions?.length <= 0 && (
            <div className="flex gap-3 py-28 flex-col items-center text-center">
              <Airplay />
              <p>
                Your active V3 liquidity positions will <br />
                appear here.
              </p>
              {!walletState?.isLoggedIn && (
                <Button variant="uniswap">Connect a wallet</Button>
              )}
            </div>
          )}

          {positions?.length > 0 && (
            <div className="flex w-full rounded-lg items-center justify-center gap-2 flex-col">
              <div className="flex w-full p-3 justify-between items-center pb-0">
                <p className="font-medium">
                  Your positions ({positions?.length})
                </p>
                <p className="text-[#fc72ff] font-semibold">
                  Hide closed positions
                </p>
              </div>
              <Separator />
              {positions?.map((item, index) => (
                <div
                onClick={()=>handlePositionClick(item?.positionId)}
                  key={index}
                  className="flex w-full p-4 justify-between items-center cursor-pointer rounded-lg hover:bg-gray-200"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-3 items-center">
                      <TokenBadges
                        tokenZero={item?.token0_logo_url}
                        tokenOne={item?.token1_logo_url}
                      />
                      <h1 className="text-base font-bold text-black ml-3">
                        {item?.token0Symbol}/{item?.token1Symbol}
                      </h1>
                      <p className="text-sm text-gray-300">{item?.fee}%</p>
                    </div>
                    <div className="flex">
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        Min:{" "}
                        <span className="text-xs font-semibold text-black">
                          {item?.minXvalue} {item?.token0Symbol} per {item?.token1Symbol}{" "}
                        </span>
                        <MoveHorizontal size={15} color="black" />
                        Max:{" "}
                        <span className="text-xs font-semibold text-black">
                        {item?.maxYvalue} {item?.token0Symbol} per {item?.token1Symbol}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1 items-center">
                    {item?.currentLiquiditystatus &&
                      item?.currentLiquiditystatus === "In Range" && (
                        <>
                          <p className="text-black font-medium text-sm">
                            {item?.currentLiquiditystatus}
                          </p>
                          <Circle
                            className="bg-green-500 rounded-full"
                            size={10}
                            color="#22c55e"
                          />
                        </>
                      )}
                    {item?.currentLiquiditystatus &&
                      item?.currentLiquiditystatus === "Out of Range" && (
                        <>
                          <p className="text-black font-medium text-sm">
                            {item?.currentLiquiditystatus}
                          </p>
                          <Circle
                            className="bg-red-500 rounded-full"
                            size={10}
                            color="#ef4444"
                          />
                        </>
                      )}
                    {item?.currentLiquiditystatus &&
                      item?.currentLiquiditystatus === "Closed" && (
                        <>
                          <p className="text-gray-300 font-medium text-sm">
                            {item?.currentLiquiditystatus}
                          </p>
                          <Ban size={15} color="gray"/>
                        </>
                      )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex w-full gap-2">
          <div className="flex flex-col gap-2 border rounded-lg p-3 w-[60%]">
            <p className="font-semibold flex">
              Learn about providing liquidity <ArrowUpRight />
            </p>
            <p>Check out our v3 LP walkthrough and migration guides.</p>
          </div>
          <div className="flex flex-col gap-2 border rounded-lg p-3 w-[40%]">
            <p className="font-semibold flex">
              Top pools <ArrowUpRight />
            </p>
            <p>Explore Uniswap Analytics</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoolPage;
