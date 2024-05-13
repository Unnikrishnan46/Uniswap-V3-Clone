import { configureStore } from '@reduxjs/toolkit';
import walletState from './walletState';
import dialogState from './dialogState';
import swapState from './swapState';
import poolState from "./poolState";
import sendTokenState from './sendTokenState';

export const store = configureStore({
  reducer:{
    walletState:walletState,
    dialogState:dialogState,
    swapState:swapState,
    poolState:poolState,
    sendTokenState:sendTokenState
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck:false
    }),
})