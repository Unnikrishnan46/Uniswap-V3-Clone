import { ArrowRight, MoveUpRight } from "lucide-react";
import { Button } from "../ui/button";

const EchoSystemSection = () => {
    return ( 
        <div className="h-screen w-full px-20 flex flex-col items-center justify-center max-md:p-8 max-md:h-full">
            <div className="w-full flex justify-evenly items-center max-md:hidden">
                <div className="flex flex-col gap-2">
                    <h1 className="text-white text-5xl font-bold">$1.8T+</h1>
                    <p className="text-white text-sm">Trade Volume</p>
                </div>
                <div className="flex flex-col gap-2">
                <h1 className="text-white text-5xl font-bold">236M+</h1>
                    <p className="text-white text-sm">All Time Trades</p>
                </div>
                <div className="flex flex-col gap-2">
                <h1 className="text-white text-5xl font-bold">300+</h1>
                    <p className="text-white text-sm">Integrations</p>
                </div>
                <div className="flex flex-col gap-2">
                <h1 className="text-white text-5xl font-bold">4,400+</h1>
                    <p className="text-white text-sm">Community Delegates</p>
                </div>
            </div>
            <div className="flex justify-between items-center w-full mt-20 max-md:flex-col">
                <div className="flex flex-col gap-6 text-white w-1/2 max-md:w-full max-md:mb-10">
                    <h1 className="text-lg font-normal flex items-center gap-2">UNISWAP ECOSYSTEM <ArrowRight/></h1>
                    <h1 className="text-4xl font-medium">A growing network of <br />DeFi Apps.</h1>
                    <p className="text-xl font-light text-gray-400">Developers, traders, and liquidity <br />providers participate together in a <br />financial marketplace that is open and <br />accessible to all.</p>
                </div>
                <div className="flex border border-gray-400 w-1/2 rounded-3xl relative max-md:w-full">
                    <img className="rounded-3xl" src="/images/homePage/apps.png" alt="" />
                    <div className="flex flex-col gap-3 absolute top-12 left-12">
                        <h1 className="text-white text-5xl font-bold">300+</h1>
                        <p className="text-gray-300 text-xl font-normal">Integrations</p>
                        <Button className="flex items-center gap-2 border bg-[#35373a] border-gray-700 text-white">Explore All <MoveUpRight/></Button>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default EchoSystemSection;