import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define a type for the data being sent
interface SendDataPayload {
  name: string;
  email: string;
  message: string;
}

// Define initial state
interface DataState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: DataState = {
  loading: false,
  success: false,
  error: null,
};

// Async thunk for sending data
export const sendData = createAsyncThunk(
  "data/sendData",
  async (payload: SendDataPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", payload);
      return response.data; // Assuming the backend returns success status
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Create slice
const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendData.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(sendData.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(sendData.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { resetState } = dataSlice.actions;
export default dataSlice.reducer;
