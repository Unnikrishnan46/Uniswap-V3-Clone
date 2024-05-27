import { ArrowRight, MoveUpRight } from "lucide-react";
import { Button } from "../ui/button";

const DevelopersSection = () => {
    return ( 
        <div className="flex flex-col h-screen max-md:h-full w-full px-20 text-white gap-6 max-md:px-8 max-md:py-8">
            <div>
                <h1 className="text-lg font-normal flex items-center gap-2">DEVELOPERS <ArrowRight/></h1>
            </div>
            <div className="flex justify-between max-md:flex-col max-md:gap-4">
            <div className="w-[70%] flex flex-col gap-4 max-md:w-full">
                <div className="bg-[url('/images/homePage/developer.png')] bg-no-repeat bg-cover p-8 gap-4 h-[65vh] max-md:h-full border-gray-400 rounded-3xl flex justify-end flex-col">
                    <h1 className="text-3xl font-medium">Superpowers for DeFi developers.</h1>
                    <p className="text-xl text-gray-500">Build Defi apps and tools on the largest crypto project on <br />Ethereum. Get started with quick start guides, protocol <br />documentation, a Javascript SDK, and fully open source code.</p>
                    <Button className="flex items-center gap-2 w-36 border bg-[#35373a] border-gray-700 text-white">Documentation <MoveUpRight/></Button>
                </div>
                <div className="flex w-full justify-between">
                    <div className="flex items-center justify-between p-6 border border-gray-600 rounded-3xl cursor-pointer w-[49%]">
                        <h1>V3 Whitepaper</h1>
                        <MoveUpRight/>
                    </div>
                    <div className="flex items-center justify-between p-6 border border-gray-600 rounded-3xl cursor-pointer w-[49%]">
                        <h1>Github</h1>
                        <MoveUpRight/>
                    </div>
                </div>
            </div>
            <div className="w-[29%] h-[77vh] flex flex-col gap-3 p-8 border border-gray-500 rounded-3xl max-md:w-full max-md:h-full">
                <div>
                    <img src="/images/homePage/unigrants.png" alt="" />
                </div>
                <h1 className="text-2xl">
                Apply for funding from the Uniswap Grants Program
                </h1>
                <p className="text-gray-400 text-xl leading-7">Get paid to build the future of finance. Uniswap Governance offers grant funding for people building apps, tools, and activities on the Uniswap Protocol.</p>
                <Button className="flex items-center gap-2 border w-26 bg-[#35373a] border-gray-700 text-white">Learn more <MoveUpRight/></Button>
            </div>
            </div>
        </div>
     );
}
 
export default DevelopersSection;