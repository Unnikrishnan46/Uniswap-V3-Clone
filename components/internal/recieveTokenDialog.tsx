"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  setRecieveTokenDialog,
} from "@/lib/redux/dialogState";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Separator } from "@/components/ui/separator";
import {
  setSelectedRecieveTokenData,
} from "@/lib/redux/swapState";

const RecieveTokenDialog = () => {
  const dialogState = useSelector((state: any) => state.dialogState);
  const swapState = useSelector((state: any) => state.swapState);
  const dispatch = useDispatch();

  const handleOpenChange = () => {
    dispatch(setRecieveTokenDialog(false));
  };

  const handleSelectToken = (data: any) => {
    dispatch(setSelectedRecieveTokenData(data));
    dispatch(setRecieveTokenDialog(false));
  };

  return (
    <Dialog
      open={dialogState?.recieveTokenDialog}
      onOpenChange={handleOpenChange}
    >
      <DialogContent className="p-0">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle>Select a token</DialogTitle>
        </DialogHeader>
        <div className="p-4 pb-0">
          <div className="bg-gray-100 flex gap-2 items-center border rounded-xl px-2 py-2">
            <Search color="gray" />
            <input
              type="text"
              placeholder="Search name or paste address"
              className="placeholder:text-gray-400 focus:outline-none w-full bg-gray-100 rounded-xl"
            />
          </div>
          <div className="flex items-center gap-4 mt-6">
            <Button
              onClick={() => {
                handleSelectToken(swapState?.recieveTokenData[0]);
              }}
              variant="outline"
              className="flex items-center gap-2 rounded-full"
            >
              <img
                className="h-6 w-6 rounded-full"
                src={swapState?.recieveTokenData[0]?.icon}
                alt=""
              />
              <p>{swapState?.recieveTokenData[0]?.symbol}</p>
            </Button>
            <Button
              onClick={() => {
                handleSelectToken(swapState?.recieveTokenData[1]);
              }}
              variant="outline"
              className="flex items-center gap-2 rounded-full"
            >
              <img
                className="h-6 w-6 rounded-full"
                src={swapState?.recieveTokenData[1]?.icon}
                alt=""
              />
              <p>{swapState?.recieveTokenData[1]?.symbol}</p>
            </Button>
          </div>
          <Separator className="mt-6" />
          <div className="flex flex-col mt-6">
            <h1 className="text-gray-500">Popular tokens</h1>
          </div>
        </div>
        <div className="flex flex-col mb-8 overflow-y-scroll h-[20rem]">
          {swapState?.recieveTokenData?.map((item, index) => (
            <div
              onClick={() => {
                handleSelectToken(item);
              }}
              key={index}
              className="flex gap-3 items-center hover:bg-gray-100 py-2 px-4 cursor-pointer"
            >
              <img
                className="h-8 w-8 bg-gray-200 rounded-full p-2"
                src={item?.icon}
                alt=""
              />
              <div className="flex flex-col">
                <h1 className="text-base font-medium text-gray-900">
                  {item?.name}
                </h1>
                <p className="text-sm text-gray-400">{item?.symbol}</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecieveTokenDialog;
