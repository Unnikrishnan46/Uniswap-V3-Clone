"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    const handleLaunchAppClick = ()=>{
      console.log("Working");
      
        router.push("/swap");
    }



    
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Button onClick={handleLaunchAppClick}>Launch App</Button>
    </div>
  );
}
