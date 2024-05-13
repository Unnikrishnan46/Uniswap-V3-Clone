import { ArrowDown, CheckCircle, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  setPayTokenDialog,
  setRecieveTokenDialog,
} from "@/lib/redux/dialogState";
import {
  getTokenInBal,
  getTokenOutBal,
  singleSwapToken,
} from "@/utils/appFeatures";
import { useEffect, useState } from "react";
import { getSpotPrice } from "@/utils/swapUpdatePrice";
import { toast } from "sonner";

const SwapPage = () => {
  const dispatch = useDispatch();
  const swapState = useSelector((state: any) => state.swapState);
  const [amountIn, setAmountIn] = useState("");
  const [tokenInBalance, setTokenInBalance] = useState("");
  const [tokenOutBalance, setTokenOutBalance] = useState("");
  const [spotPrice, setSpotPrice] = useState<any>(0);

  const handleOpenPaytoken = () => {
    dispatch(setPayTokenDialog(true));
  };

  const handleOpenRecieveToken = () => {
    dispatch(setRecieveTokenDialog(true));
  };

  const handleShowDetails = (hash:any)=>{
    window.open(`https://etherscan.io/tx/${hash}`);
  }

  const handleSingleSwapToken = async () => {
    const tokenIn = swapState.selectedPayTokenData;
    const tokenOut = swapState.selectedRecieveTokenData;

    const promise = singleSwapToken(tokenIn, tokenOut, amountIn);

    toast.promise(promise, {
      loading: "Transaction in progress...",
      success: (data) => {
        setAmountIn("");
        setSpotPrice(0);
        getTokenBalance()
        if(data.status){
          return <div className="flex justify-between items-center w-full">
            <div className="flex gap-2 items-center">
            <CheckCircle/>
            <p className="font-semibold ">Token swaped successfully</p>
            </div>
            <Button onClick={()=>{handleShowDetails(data.transaction.blockHash)}} className="py-0" variant="uniswap">More Details</Button>
            </div>
        }
      },
      error: "Error",
    });
  };

  const getTokenBalance = async () => {
    const tokenInBal = await getTokenInBal(swapState?.selectedPayTokenData);
    setTokenInBalance(tokenInBal);
    const tokenOutBal = await getTokenOutBal(
      swapState.selectedRecieveTokenData
    );
    setTokenOutBalance(tokenOutBal);
  };

  const handleInput = async (e) => {
    setAmountIn(e.target.value);
    const tokenIn = swapState?.selectedPayTokenData;
    const tokenOut = swapState?.selectedRecieveTokenData;
    if (tokenIn && tokenOut) {
      const price = await getSpotPrice(tokenIn, tokenOut, e.target.value);
      setSpotPrice(price);
    }
  };

  useEffect(() => {
    getTokenBalance();
  }, [swapState?.selectedPayTokenData, swapState?.selectedRecieveTokenData]);

  return (
    <div className="flex flex-col gap-1 relative">
      <div className="w-full bg-muted rounded-2xl h-32 pt-4 pl-3 flex justify-between pr-3">
        <div className="flex flex-col">
          <label className="text-gray-500 text-sm" htmlFor="inputPrice">
            You pay
          </label>
          <input
            onChange={(e) => {
              handleInput(e);
            }}
            value={amountIn}
            id="inputPrice"
            type="text"
            placeholder="0"
            className="placeholder:text-gray-400 placeholder:text-3xl focus:outline-none focus:bg-muted text-3xl placeholder:font-semibold font-semibold bg-muted w-full"
          />
        </div>
        <div className="flex flex-col gap-2 items-end">
          <Button
            onClick={handleOpenPaytoken}
            variant="outline"
            className="rounded-full"
          >
            <div className="text-xl text-black font-semibold flex items-center gap-2 w-full h-full justify-center px-2">
              <img
                className="h-6 w-6"
                src={swapState?.selectedPayTokenData?.icon}
                alt="image"
              />
              <p>{swapState?.selectedPayTokenData?.symbol}</p>
              <img className="h-5 w-5" src="/images/angleDown.svg" alt="" />
            </div>
          </Button>
          <p className="text-gray-400 text-sm flex gap-1">
            Balance: <span>{tokenInBalance ? tokenInBalance : 0}</span>
          </p>
        </div>
      </div>

      <div className="w-full bg-muted rounded-2xl h-32 pt-4 pl-3 flex justify-between pr-3">
        <div className="flex flex-col">
          <label className="text-gray-500 text-sm" htmlFor="inputPric">
            You recieve
          </label>
          <input
            value={spotPrice ? spotPrice : ""}
            readOnly={true}
            id="inputPric"
            type="text"
            placeholder="0"
            className="placeholder:text-gray-400 placeholder:text-3xl focus:outline-none text-3xl placeholder:font-semibold font-semibold bg-muted w-full"
          />
        </div>
        <div className="flex flex-col gap-2 items-end justify-center">
          {swapState?.selectedRecieveTokenData && (
            <Button
              onClick={handleOpenRecieveToken}
              variant="outline"
              className="rounded-full"
            >
              <div className="text-xl text-black font-semibold flex items-center gap-2 w-full h-full justify-center px-2">
                <img
                  className="h-6 w-6"
                  src={swapState?.selectedRecieveTokenData?.icon}
                  alt="image"
                />
                <p>{swapState?.selectedRecieveTokenData?.symbol}</p>
                <img className="h-5 w-5" src="/images/angleDown.svg" alt="" />
              </div>
            </Button>
          )}
          {!swapState?.selectedRecieveTokenData && (
            <Button
              onClick={handleOpenRecieveToken}
              className="flex items-center bg-[#fc72ff] text-white rounded-full text-base"
            >
              Select a token
              <ChevronDown />
            </Button>
          )}
          {swapState?.selectedRecieveTokenData && (
            <p className="text-gray-400 text-sm flex gap-1">
              Balance: <span> {tokenOutBalance ? tokenOutBalance : 0}</span>
            </p>
          )}
        </div>
      </div>
      {!swapState?.selectedRecieveTokenData && (
        <Button variant="secondary" className="rounded-xl">
          Select a Token
        </Button>
      )}
      {swapState?.selectedRecieveTokenData && !amountIn && (
        <Button variant="secondary" className="rounded-xl">
          Enter an amount
        </Button>
      )}

      {swapState?.selectedRecieveTokenData && amountIn && (
        <Button
          onClick={() => {
            handleSingleSwapToken();
          }}
          className="rounded-xl bg-[#fc72ff] text-white"
        >
          Swap
        </Button>
      )}

      <div className="flex justify-center items-center h-9 w-9 bg-muted rounded-lg border-[4px] border-white absolute top-[43%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <ArrowDown size={"20"} />
      </div>
    </div>
  );
};

export default SwapPage;
