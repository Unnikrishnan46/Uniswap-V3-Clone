import { FaDiscord, FaTwitter, FaGithub } from "react-icons/fa";
import { IconContext } from "react-icons";

const HomeFooter = () => {
  return (
    <div className="flex flex-col gap-4 px-20 text-white pb-20 max-md:px-8 max-md:mt-10">
      <div className="flex gap-8 items-center max-md:grid max-md:grid-cols-3">
        <p className="text-xs">Ecosystem</p>
        <p className="text-xs">Community</p>
        <p className="text-xs">Governance</p>
        <p className="text-xs">Developers</p>
        <p className="text-xs">Blog</p>
        <p className="text-xs">FAQ</p>
        <p className="text-xs">Privacy Policy</p>
        <p className="text-xs">Trademark Policy</p>
        <p className="text-xs">Security</p>
      </div>
      <div className="flex items-center justify-between w-full">
        <div>
          <p className="text-xs text-gray-400 flex items-center gap-1">
            Media inquires for Uniswap Labs - Contact{" "}
            <span className="text-xs text-white">media@uniswap.org</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <IconContext.Provider
            value={{
              color: "gray",
              className: "global-class-name",
              size: "25",
            }}
          >
            <FaTwitter />
            <FaGithub />
            <FaDiscord />
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default HomeFooter;
