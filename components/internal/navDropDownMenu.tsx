import {
    ChevronDown,
    ChevronUp,
  } from "lucide-react"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useState } from "react"
import Link from "next/link";
  
  export function NavDropdownMenu() {
    const [arrowDirection,setArrowDirection] = useState(false);
 const handleArrow = (status)=>{
    setArrowDirection(status);
 }

    return (
      <DropdownMenu onOpenChange={(status)=>{handleArrow(status)}}>
        <DropdownMenuTrigger asChild>
          {arrowDirection ? <ChevronUp/> : <ChevronDown className="hover:bg-gray-100 rounded-lg" color="gray" />}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">

          <DropdownMenuLabel>App</DropdownMenuLabel>
          <DropdownMenuGroup className="mb-3">
          <Link href={"/swap"}>
          <DropdownMenuItem>
              <span>Swap</span>
            </DropdownMenuItem>
            </Link>
            <Link href={"explore"}>
            <DropdownMenuItem>
              <span>Explore</span>
            </DropdownMenuItem>
            </Link>
            <Link href={"NFTs"}>
            <DropdownMenuItem>
              <span>NFTs</span>
            </DropdownMenuItem>
            </Link>
            <Link href={"pool"}>
            <DropdownMenuItem>
              <span>Pool</span>
            </DropdownMenuItem>
            </Link>
            <DropdownMenuItem>
              <span>Analytics</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuLabel>Company</DropdownMenuLabel>
          <DropdownMenuGroup className="mb-3">
            <DropdownMenuItem>
              <span>Careers</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Blog</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          
          <DropdownMenuLabel>Protocol</DropdownMenuLabel>
          <DropdownMenuGroup className="mb-3">
          <DropdownMenuItem>
            <span>Governance</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Developers</span>
          </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuLabel>Need help?</DropdownMenuLabel>
          <DropdownMenuGroup className="mb-3">
          <DropdownMenuItem>
            <span>Contact us</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Help Center</span>
          </DropdownMenuItem>
          </DropdownMenuGroup>

          
          
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  