import { ArrowRightLeft, CheckCircle, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setSendTokenDialogOpen } from "@/lib/redux/dialogState";
import { useState } from "react";
import { connectMetamask } from "@/context/metamask";
import { setCurrentChain, setIsLoggedIn, setSelectedChain, setWalletAddress, setWalletBalance } from "@/lib/redux/walletState";
import { setPayTokenData, setRecieveTokenData, setSelectedPayTokenData } from "@/lib/redux/swapState";
import { contractAddress } from "@/context/contractAddress";
import { getTokenCurrentPriceInUSD, transferToken } from "@/utils/appFeatures";
import { toast } from "sonner";

const SendTab = () => {
    const dialogState = useSelector((state: any) => state.dialogState);
    const sendTokenState = useSelector((state:any)=>state.sendTokenState);
    const walletState = useSelector((state:any)=>state.walletState);
    const [sendPrice,setSendPrice] = useState("");
    const [recipientAddress,setRecipientAddress] = useState("");
    const [priceInUSD,setPriceInUSD] = useState<any>(0.00);
    const dispatch = useDispatch();
  
    const handleSendTokenDialog = ()=>{
        dispatch(setSendTokenDialogOpen(true));
    }

    const handlePriceInput = async(e)=>{
      setSendPrice(e.target.value);
      const currentPriceInUSD = await getTokenCurrentPriceInUSD(sendTokenState?.selectedSendTokenData,e.target.value);
      setPriceInUSD(currentPriceInUSD);
    }

    const handleRecipientAddressinput = (e)=>{
      setRecipientAddress(e.target.value);
    }

    const connect = async () => {
      try {
        const data = await connectMetamask();
        dispatch(setWalletAddress(data.address));
        dispatch(setIsLoggedIn(data.loggedIn));
        dispatch(setWalletBalance(data.balance));
        dispatch(setCurrentChain(data.network));
        if (data.network === "matic") {
          dispatch(setSelectedChain("Polygon"));
        }
        if (data.network === "mainnet") {
          dispatch(setSelectedChain("Ethereum"));
          dispatch(setPayTokenData(contractAddress.mainnet));
          dispatch(setSelectedPayTokenData(contractAddress.mainnet[0]));
          dispatch(setRecieveTokenData(contractAddress.mainnet));
          // dispatch(setSelectedRecieveTokenData(contractAddress.mainnet))
        }
        if (data.network === "arbitrum") {
          dispatch(setSelectedChain("Arbitrum"));
        }
        if (data.network === "base") {
          dispatch(setSelectedChain("Base"));
        }
        if (data.network === "bnb") {
          dispatch(setSelectedChain("BNB Chain"));
        }
        if (data.network === "sepolia") {
          dispatch(setPayTokenData(contractAddress.sepolia));
          dispatch(setSelectedPayTokenData(contractAddress.sepolia[0]));
          dispatch(setRecieveTokenData(contractAddress.sepolia));
          // dispatch(setSelectedRecieveTokenData(contractAddress.sepolia[0]));
        }
        if (data.network === "unknown") {
          dispatch(setSelectedChain("Ethereum"));
          dispatch(setPayTokenData(contractAddress.mainnet));
          dispatch(setSelectedPayTokenData(contractAddress.mainnet[0]));
          dispatch(setRecieveTokenData(contractAddress.mainnet));
          // dispatch(setSelectedRecieveTokenData(contractAddress.mainnet))
        }
      } catch (error) {
        console.log(error);
      }
    };

    const handleTransferToken = async()=>{
      const tokenData = sendTokenState?.selectedSendTokenData;
      try {
        if(tokenData && recipientAddress && sendPrice){
        // await transferToken(tokenData,recipientAddress,sendPrice).then((response)=>{
        //   console.log(response);
        // });
        const promise = transferToken(tokenData,recipientAddress,sendPrice);
        toast.promise(promise, {
          loading: "Transaction in progress...",
          success: (data) => {
            if(data.status === "success"){
              return <div className="flex justify-between items-center w-full">
                <div className="flex gap-2 items-center">
                <CheckCircle/>
                <p className="font-semibold ">Token sended successfully</p>
                </div>
                <Button onClick={()=>{handleShowDetails(data.transactionData.blockHash)}} className="py-0" variant="uniswap">More Details</Button>
                </div>
            }
          },
          finally:()=>{
            setSendPrice("");
            setRecipientAddress("");
            setPriceInUSD(0.00);
          },
          error: "Some thing went wrong",
        });
      }else{
        return ;
      }
      } catch (error) {
        console.log(error);
      }
    }

    const handleShowDetails = (hash)=>{
      window.open(`https://etherscan.io/tx/${hash}`);
    }

  return (
    <div>
      <div className="flex flex-col gap-1">
        <div className="flex flex-col bg-[#f9f9f9] rounded-2xl p-4">
          <div>
            <p className="text-gray-400 font-light">you are sending</p>
          </div>
          <div className="flex flex-col gap-1 justify-center items-center p-8 px-0">
            <input
              onChange={(e)=>{handlePriceInput(e)}}
              value={sendPrice}
              className="bg-[#f9f9f9] max-h-20 max-w-full w-full text-center font-medium whitespace-nowrap overflow-hidden text-ellipsis text-[70px] outline-none placeholder:text-[70px] placeholder:text-slate-300 placeholder:font-medium h-20"
              type="text"
              placeholder="$0"
            />
            <p className="flex items-center gap-2 text-slate-300">
              ${priceInUSD ? priceInUSD : ""} USD <ArrowRightLeft />
            </p>
            <p hidden={true} className="text-xs font-semibold text-red-500">Insufficient funds</p>
          </div>
        </div>
        <div onClick={handleSendTokenDialog} className="flex items-center justify-between cursor-pointer hover:opacity-45 bg-[#f9f9f9] p-4 rounded-b-2xl">
            <div className="flex items-center gap-2">
                <img className="h-8 w-8" src={sendTokenState?.selectedSendTokenData?.icon} alt="" />
                <h3 className="font-medium">{sendTokenState?.selectedSendTokenData?.symbol}</h3>
            </div>
            <ChevronDown/>
        </div>
      </div>
      <div className="flex flex-col gap-1 p-4 py-3 bg-[#f9f9f9] mt-1 rounded-2xl">
        <p className="text-gray-400 font-light">To</p>
        <input onChange={(e)=>{handleRecipientAddressinput(e)}} value={recipientAddress} className="bg-[#f9f9f9] max-h-20 max-w-full w-full font-medium whitespace-nowrap overflow-hidden text-ellipsis outline-none placeholder:text-slate-400 placeholder:text-sm placeholder:font-medium" type="text" placeholder="Wallet address or ENS name"/>
      </div>
      <div className="mt-1">
        {!walletState?.isLoggedIn && (
        <Button onClick={connect} className="w-full py-6 rounded-2xl bg-[#ffefff] text-2xl font-semibold text-[#fc72ff]">Connect wallet</Button>
      )}
      {!sendPrice && walletState?.isLoggedIn && (
        <Button className="w-full py-6 rounded-2xl font-semibold bg-[#f9f9f9] text-black hover:bg-gray-100">Enter amount</Button>
      )}

      {sendPrice && walletState?.isLoggedIn && !recipientAddress && (
        <Button variant="outline" className="w-full py-6 rounded-2xl font-semibold ">Select recipient</Button>
      )}

      {sendPrice && walletState?.isLoggedIn && recipientAddress && (
        <Button onClick={handleTransferToken} variant="uniswap" className="w-full py-6 rounded-2xl font-semibold ">Send</Button>
      )}
      </div>
    </div>
  );
};

export default SendTab;
