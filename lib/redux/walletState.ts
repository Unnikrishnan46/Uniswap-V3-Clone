import { createSlice,PayloadAction } from "@reduxjs/toolkit";


const initialState:any = {
    provider:null,
    isLoggedIn:false,
    walletAddress:"",
    walletBalance:null,
    selectedChain:"",
    currentChain:""
}

const  walletState = createSlice({
    name:"walletState",
    initialState,
    reducers:{
        setWalletAddress:(state,action:PayloadAction<any>)=>{
            state.walletAddress = action.payload;
        },
        setIsLoggedIn:(state,action:PayloadAction<any>)=>{
            state.isLoggedIn = action.payload;
        },
        setProvider:(state,action:PayloadAction<any>)=>{
            state.provider = action.payload;
        },
        setWalletBalance:(state,action:PayloadAction<any>)=>{
            state.walletBalance = action.payload;
        },
        setSelectedChain:(state,action:PayloadAction<any>)=>{
            state.selectedChain = action.payload;
        },
        setCurrentChain:(state,action:PayloadAction<any>)=>{
            state.currentChain = action.payload;
        }
    }
});


export const {setWalletAddress,setIsLoggedIn,setProvider,setWalletBalance,setSelectedChain,setCurrentChain} = walletState.actions;

export default walletState.reducer;