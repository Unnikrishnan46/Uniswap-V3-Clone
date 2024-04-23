import { contractAddress } from "@/context/contractAddress";
import { createSlice,PayloadAction } from "@reduxjs/toolkit";

const initialState:any = {
    selectedPoolTokenZeroData:contractAddress.mainnet[0],
    selectedPoolTokenOneData:null
}

const  poolState = createSlice({
    name:"poolState",
    initialState,
    reducers:{
        setSelectedPoolTokenZeroData:(state,action:PayloadAction<any>)=>{
            state.selectedPoolTokenZeroData = action.payload;
        },
        setSelectedPoolTokenOneData:(state,action:PayloadAction<any>)=>{
            state.selectedPoolTokenOneData = action.payload;
        },
    }
});


export const {setSelectedPoolTokenZeroData,setSelectedPoolTokenOneData} = poolState.actions;

export default poolState.reducer;