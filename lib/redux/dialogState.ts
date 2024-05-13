import { createSlice,PayloadAction } from "@reduxjs/toolkit";


const initialState:any = {
    payTokenDialog:false,
    recieveTokenDialog:false,
    poolTokenDialogZeroOpen:false,
    poolTokenDialogOneOpen:false,
    liquiditySuccessDialogOpen:false,
    liquiditySuccessData:{},
    sendTokenDialogOpen:false
}

const  dialogState = createSlice({
    name:"dialogState",
    initialState,
    reducers:{
        setPayTokenDialog:(state,action:PayloadAction<any>)=>{
            state.payTokenDialog = action.payload;
        },
        setRecieveTokenDialog:(state,action:PayloadAction<any>)=>{
            state.recieveTokenDialog = action.payload;
        },
        setPoolTokenDialogZeroOpen:(state,action:PayloadAction<any>)=>{
            state.poolTokenDialogZeroOpen = action.payload;
        },
        setPoolTokenDialogOneOpen:(state,action:PayloadAction<any>)=>{
            state.poolTokenDialogOneOpen = action.payload;
        },
        setLiquiditySuccessOpen:(state,action:PayloadAction<any>)=>{
            state.liquiditySuccessDialogOpen = action.payload;
        },
        setLiquiditySuccessData:(state,action:PayloadAction<any>)=>{
            state.liquiditySuccessData = action.payload;
        },
        setSendTokenDialogOpen:(state,action:PayloadAction<any>)=>{
            state.sendTokenDialogOpen = action.payload;
        },
    }
});


export const {setPayTokenDialog,setRecieveTokenDialog,setPoolTokenDialogZeroOpen,setPoolTokenDialogOneOpen,setLiquiditySuccessOpen,setLiquiditySuccessData,setSendTokenDialogOpen} = dialogState.actions;

export default dialogState.reducer;