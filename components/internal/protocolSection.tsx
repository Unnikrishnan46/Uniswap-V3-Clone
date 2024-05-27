import { ArrowRight, MoveUpRight } from "lucide-react";
import { Button } from "../ui/button";

const ProtocolSection = () => {
  return (
    <div className="flex flex-col px-20 text-white justify-center h-screen w-full gap-6 max-md:px-8 max-md:h-full">
      <div>
        <h1 className="text-lg font-normal flex items-center gap-2">
          PROTOCOL GOVERNANCE <ArrowRight />
        </h1>
      </div>
      <div className="w-full flex justify-between items-center max-md:flex-col max-md:gap-4">
        <div className="flex border p-8 border-gray-700 rounded-3xl flex-col bg-[url('/images/homePage/horse-card.png')] bg-cover bg-no-repeat w-[49%] max-md:w-full max-md:h-full h-[65vh] justify-between">
            <div className="flex flex-col gap-6">
                <h1 className="text-3xl font-normal">Governed by the community.</h1>
                <p className="text-xl text-gray-300">The Uniswap Protocol is managed by a global community <br />of UNI token holders and delegates.</p>
            </div>
            <Button className="flex items-center gap-2 w-36 border bg-[#35373a] border-gray-700 text-white">Read more <MoveUpRight/></Button>
        </div>
        <div className="flex flex-col gap-4 w-[49%] h-[65vh] max-md:w-full max-md:h-full">
            <div className="flex flex-col gap-3 cursor-pointer p-6 border rounded-3xl border-gray-700">
                <h1 className="text-2xl flex items-center gap-2">Governance Forum <MoveUpRight/></h1>
                <p className="text-base text-gray-400">Participate by proposing upgrades and discussing the future of the protocol <br />with the Uniswap community.</p>
            </div>
            <div className="flex flex-col gap-3 p-6 cursor-pointer border rounded-3xl border-gray-700">
                <h1 className="text-2xl flex items-center gap-2">Sybil <MoveUpRight/></h1>
                <p className="text-base text-gray-400">Vote on offchain proposals with the Snapshot interface . Votes are weighted by the number on UNI delegates</p>
            </div>
            <div className="flex flex-col gap-3 p-6 cursor-pointer border rounded-3xl border-gray-700">
                <h1 className="text-2xl flex items-center gap-2">Governance Portal <MoveUpRight/></h1>
                <p className="text-base text-gray-400">Vote on official Uniswap governance proposals and view past proposals.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProtocolSection;
