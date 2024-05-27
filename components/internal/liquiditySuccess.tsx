"use client"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { ArrowUp } from "lucide-react";
import { setLiquiditySuccessOpen } from "@/lib/redux/dialogState";

const LiquiditySuccessDialog = () => {
  const liquidityDialogState = useSelector((state: any) => state.dialogState);
  const dispatch = useDispatch();
  const handleCloseDialog = ()=>{
    dispatch(setLiquiditySuccessOpen(false));
  }

  const handleEtherScan = (hash)=>{
    window.open(`https://etherscan.io/tx/${hash}`);
  }
  return (
    <Dialog open={liquidityDialogState?.liquiditySuccessDialogOpen} onOpenChange={handleCloseDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex flex-col items-center gap-9">
          <div className="border-[#fc72ff] border-2 mt-3 rounded-full h-20 w-20 flex items-center justify-center">
            <ArrowUp color="#fc72ff"/>
          </div>
          <h1 className="text-2xl font-bold">Transation Submited</h1>
          <div className="flex flex-col w-full gap-3">
            <Button onClick={handleCloseDialog} variant="uniswap" className="w-full">Close</Button>
            <Button onClick={()=>handleEtherScan(liquidityDialogState?.liquiditySuccessData?.blockHash)} variant="link" className="w-full">View on Etherscan</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LiquiditySuccessDialog;
