import { FaDiscord, FaTwitter, FaGithub } from "react-icons/fa";
import { IconContext } from "react-icons";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();

  const handleLaunchAppClick = ()=>{
      router.push("/swap");
  }
  return (
    <div className="h-[89.3vh] flex flex-col justify-end px-20 gap-8 max-md:px-8 max-md:justify-center">
      <div className="flex flex-col gap-6">
        <h1 className="text-white text-6xl font-light">
          UNISWAP <span className="font-semibold">PROTOCOL</span>
        </h1>
        <h3 className="text-white text-2xl font-light">
          Swap, earn, and build on the leading decentralized crypto trading{" "}
          <br />
          protocol.
        </h3>
        <Button onClick={handleLaunchAppClick} className="hidden bg-[#ff007a] w-28 max-md:flex" >Launch App</Button>
      </div>
      <div className="flex gap-4 mb-20">
        <IconContext.Provider
          value={{ color: "white", className: "global-class-name", size: "25" }}
        >
          <FaTwitter />
          <FaGithub />
          <FaDiscord />
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default HeroSection;
