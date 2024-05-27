import { createSlice,PayloadAction } from "@reduxjs/toolkit";


const initialState:any = {
    isHamburgerMenuOpen:false
}

const  hamburgerState = createSlice({
    name:"hamburgerState",
    initialState,
    reducers:{
        setIsHamburgerMenuOpen:(state,action:PayloadAction<any>)=>{
            state.isHamburgerMenuOpen = action.payload;
        },
    }
});


export const {setIsHamburgerMenuOpen} = hamburgerState.actions;

export default hamburgerState.reducer;