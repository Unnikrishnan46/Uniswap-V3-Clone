import { contractAddress } from "@/context/contractAddress";
import { createSlice,PayloadAction } from "@reduxjs/toolkit";

const initialState:any = {
    sendTokenDataArray:contractAddress.mainnet,
    selectedSendTokenData:contractAddress.mainnet[0],
}

const sendTokenState = createSlice({
    name:"sendTokenState",
    initialState,
    reducers:{
        setSendTokenDataArray:(state,action:PayloadAction<any>)=>{
            state.sendTokenDataArray = action.payload;
        },
        setSelectedSendTokenData:(state,action:PayloadAction<any>)=>{
            state.selectedSendTokenData = action.payload;
        },
    }
});


export const {setSendTokenDataArray,setSelectedSendTokenData} = sendTokenState.actions;

export default sendTokenState.reducer;