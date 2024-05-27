"use client";

import DevelopersSection from "@/components/internal/developersSection";
import EchoSystemSection from "@/components/internal/echoSystemSection";
import HeroSection from "@/components/internal/heroSection";
import HomeAbsolute from "@/components/internal/homeAbsolute";
import HomeFooter from "@/components/internal/homeFooter";
import HomeNavBar from "@/components/internal/homeNavbar";
import ProtocolSection from "@/components/internal/protocolSection";

export default function Home() {
  return (
    <div className="h-full w-full bg-[#181a1f] relative">
      <HomeNavBar/>
      <HeroSection/>
      <EchoSystemSection/>
      <DevelopersSection/>
      <ProtocolSection/>
      <HomeFooter/>
      <HomeAbsolute/>
      <img className="absolute top-12" src="/images/homePage/unicorn_banner.png" alt="" />
    </div>
  );
}
