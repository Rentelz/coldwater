import { createAsyncThunk } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// Define the async thunk for updating profile
export const sendUpDatedProfileDetails = createAsyncThunk(
  'updateProfile/sendUpDatedProfileDetails',
  async (
    { updateData, token }: { updateData: any; token: string },
    thunkAPI
  ) => {
    try {
      console.log('Process started')
      console.log('Token from thunk:', token) // Log token for debugging

      const response = await axios.patch(
        'http://localhost:5000/api/auth/updateProfile',
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
          timeout: 10000,
        }
      )

      console.log('Response from server:', response.data) // Log the response
      return response.data
    } catch (error: any) {
      if (error.response) {
        // Handle error from server
        return thunkAPI.rejectWithValue(error.response.data.message)
      } else if (error.request) {
        // Handle no response (network error)
        return thunkAPI.rejectWithValue('No response from server')
      } else {
        // Handle any other errors
        return thunkAPI.rejectWithValue('Something went wrong')
      }
    }
  }
)

const initialState = {
  loading: false,
  success: false,
  error: null as string | null,
  data: null,
}

// Create slice for updating profile
const updateProfileSlice = createSlice({
  name: 'updateProfile',
  initialState,
  reducers: {
    resetUpdateProfileState: (state) => {
      state.loading = false
      state.success = false
      state.error = null
      state.data = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendUpDatedProfileDetails.pending, (state) => {
      state.loading = true
    })
    builder.addCase(sendUpDatedProfileDetails.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.data = action.payload as typeof initialState.data
    })
    builder.addCase(sendUpDatedProfileDetails.rejected, (state, action) => {
      state.loading = false
      state.error = (action.payload as string) || 'Failed to update profile'
    })
  },
})

export const { resetUpdateProfileState } = updateProfileSlice.actions
export const updateProfileReducer = updateProfileSlice.reducer
