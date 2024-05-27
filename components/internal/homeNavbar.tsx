"use client"

import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setIsHamburgerMenuOpen } from "@/lib/redux/hamburgerMenuState";

const HomeNavBar = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    
    const handleLaunchAppClick = ()=>{
        router.push("/swap");
    }

    const handleMenuClick = ()=>{
        dispatch(setIsHamburgerMenuOpen(true));
    }
    return ( 
        <div className="flex justify-between items-center p-4">
            <div className="flex items-center">
                <img className="h-12 w-12" src="/images/Uniswap_Logo.png" alt="uniswap_logo" />
            </div>
            <div className="flex gap-8 items-center max-lg:hidden">
                <Link className="text-gray-400 hover:text-white" href={"/"}>Ecosystem</Link>
                <Link className="text-gray-400 hover:text-white" href={"/"}>Community</Link>
                <Link className="text-gray-400 hover:text-white" href={"/"}>Governance</Link>
                <Link className="text-gray-400 hover:text-white" href={"/"}>Developers</Link>
                <Link className="text-gray-400 hover:text-white" href={"/"}>Blog</Link>
                <Link className="text-gray-400 hover:text-white" href={"/"}>FAQ</Link>
                <Link className="text-gray-400 hover:text-white" href={"/"}>Jobs</Link>
                <Button onClick={handleLaunchAppClick} className="bg-[#ff007a]" >Launch App</Button>
            </div>
            <Button onClick={handleMenuClick} className="items-center gap-2 w-36 border bg-[#35373a] hidden border-gray-700 text-white max-lg:flex">Menu</Button>
        </div>
     );
}
 
export default HomeNavBar;