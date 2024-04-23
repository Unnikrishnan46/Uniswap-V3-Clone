import { contractAddress } from "@/context/contractAddress";
import { createSlice,PayloadAction } from "@reduxjs/toolkit";


const initialState:any = {
    payTokenData:[],
    recieveTokenData:[],
    selectedPayTokenData:contractAddress.mainnet[0],
    selectedRecieveTokenData:null
}

const  dialogState = createSlice({
    name:"swapState",
    initialState,
    reducers:{
        setPayTokenData:(state,action:PayloadAction<any>)=>{
            state.payTokenData = action.payload;
        },
        setRecieveTokenData:(state,action:PayloadAction<any>)=>{
            state.recieveTokenData = action.payload;
        },
        setSelectedPayTokenData:(state,action:PayloadAction<any>)=>{
            state.selectedPayTokenData = action.payload;
        },
        setSelectedRecieveTokenData:(state,action:PayloadAction<any>)=>{
            state.selectedRecieveTokenData = action.payload;
        },
    }
});


export const {setPayTokenData,setRecieveTokenData,setSelectedPayTokenData,setSelectedRecieveTokenData} = dialogState.actions;

export default dialogState.reducer;