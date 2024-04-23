"use client"
import { Button } from "@/components/ui/button";
import { Airplay, ArrowUpRight, ChevronDown, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const PoolPage = () => {
  const router = useRouter();
  const handleNewPosition = ()=>{
    router.push("/add");
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

        <div className="flex w-full rounded-lg border items-center justify-center">
          <div className="flex gap-3 py-28 flex-col items-center text-center">
            <Airplay />
            <p>
              Your active V3 liquidity positions will <br />
              appear here.
            </p>
            <Button variant="uniswap">Connect a wallet</Button>
          </div>
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
