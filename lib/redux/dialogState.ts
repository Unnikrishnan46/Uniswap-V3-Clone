import { createSlice,PayloadAction } from "@reduxjs/toolkit";


const initialState:any = {
    payTokenDialog:false,
    recieveTokenDialog:false,
    poolTokenDialogZeroOpen:false,
    poolTokenDialogOneOpen:false
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
    }
});


export const {setPayTokenDialog,setRecieveTokenDialog,setPoolTokenDialogZeroOpen,setPoolTokenDialogOneOpen} = dialogState.actions;

export default dialogState.reducer;