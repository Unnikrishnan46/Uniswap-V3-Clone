import React from "react";

interface props {
    tokenZero: any;
    tokenOne:any;
  }

const TokenBadges:React.FC<props> = ({tokenZero,tokenOne}) => {
    return ( 
        <div className="relative flex">
            <img className="h-6 w-6" src={tokenZero} alt="tokenZero" />
            <img className="h-6 w-6 absolute left-4" src={tokenOne} alt="tokenOne" />
        </div>
     );
}
 
export default TokenBadges;