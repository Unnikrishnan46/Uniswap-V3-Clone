"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SwapPage from "./swap";
import { Settings } from "lucide-react";
import SendTab from "./send";

const MainContent = () => {
  return (
    <div className="w-[30%]">
      <Tabs defaultValue="swap" className="">
        <div className="flex items-center justify-between">
          <TabsList className="flex gap-6">
            <TabsTrigger value="swap">Swap</TabsTrigger>
            <TabsTrigger value="limit">Limit</TabsTrigger>
            <TabsTrigger value="send">Send</TabsTrigger>
            <TabsTrigger value="buy">Buy</TabsTrigger>
          </TabsList>
          <Settings color="gray"/>
        </div>
        <TabsContent value="swap">
          <SwapPage />
        </TabsContent>
        <TabsContent value="limit">Coming soon....</TabsContent>
        <TabsContent value="send">
          <SendTab/>
        </TabsContent>
        <TabsContent value="buy">Coming soon....</TabsContent>
      </Tabs>
    </div>
  );
};

export default MainContent;
