import { configureStore } from '@reduxjs/toolkit'
import dataReducer from './slices/sessionSlice'
import { updateProfileReducer } from './slices/profile/updateProfileDetails'
export const store = configureStore({
  reducer: {
    data: dataReducer,
    updateProfile: updateProfileReducer,
  },
})

// rooteState

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
