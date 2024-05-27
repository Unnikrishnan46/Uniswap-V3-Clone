"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { setIsHamburgerMenuOpen } from "@/lib/redux/hamburgerMenuState";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export function SideBarMenu() {
  const router = useRouter();
  const hamburgerState = useSelector((state: any) => state?.hamburgerState);
  const dispatch = useDispatch();

  const handleLaunchAppClick = () => {
    dispatch(setIsHamburgerMenuOpen(false));
    router.push("/swap");
  };

  return (
    <Sheet
      open={hamburgerState?.isHamburgerMenuOpen}
      onOpenChange={() => {
        dispatch(setIsHamburgerMenuOpen(!hamburgerState?.isHamburgerMenuOpen));
      }}
    >
      <SheetContent>
        <div className="flex flex-col gap-8 h-full w-full">
          <Link className="text-gray-400 hover:text-white" href={"/"}>
            Ecosystem
          </Link>
          <Link className="text-gray-400 hover:text-white" href={"/"}>
            Community
          </Link>
          <Link className="text-gray-400 hover:text-white" href={"/"}>
            Governance
          </Link>
          <Link className="text-gray-400 hover:text-white" href={"/"}>
            Developers
          </Link>
          <Link className="text-gray-400 hover:text-white" href={"/"}>
            Blog
          </Link>
          <Link className="text-gray-400 hover:text-white" href={"/"}>
            FAQ
          </Link>
          <Link className="text-gray-400 hover:text-white" href={"/"}>
            Jobs
          </Link>
          <Button onClick={handleLaunchAppClick} className="bg-[#ff007a]">
            Launch App
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
