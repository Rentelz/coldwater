import { configureStore } from "@reduxjs/toolkit";
import dataReducer from './slices/sessionSlice'
export const store  = configureStore({
 
    reducer : {

        data : dataReducer
    }



})


// rooteState 

export type RootState  = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

