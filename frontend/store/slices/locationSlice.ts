import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_LOCATION_SERVICE_API;  
const BASE_URL = "https://api.countrystatecity.in/v1/countries/IN";


const api = axios.create({
    baseURL: BASE_URL,
    headers: { "X-CSCAPI-KEY": API_KEY },
  });



  
  // ✅ Async Thunks for Fetching States & Cities
  export const fetchStates = createAsyncThunk<State[], string | undefined>("location/fetchStates", async (countryCode = "IN") => {
    const response = await api.get(`/countries/${countryCode}/states`);
    return response.data as City[];
  });
  
  export const fetchCities = createAsyncThunk(
    "location/fetchCities",
    async ({ countryCode = "IN", stateCode }: { countryCode?: string; stateCode: string }): Promise<City[]> => {
      const response = await api.get(`/countries/${countryCode}/states/${stateCode}/cities`);
           }
  );


  // ✅ Define Types for State
interface State {
    id: number;
    name: string;
    iso2: string;
  }
  
  interface City {
    id: number;
    name: string;
  }
  
  interface LocationState {
    states: State[]; // ✅ Explicitly define type
    cities: City[];
    loading: boolean;
    error: string | null;
  }
  
  // ✅ Initial State with Type Annotation
  const initialState: LocationState = {
    states: [],   // ✅ Now TypeScript knows this is State[]
    cities: [],   // ✅ TypeScript knows this is City[]
    loading: false,
    error: null,
  };
  
  // ✅ Location Slice
  const locationSlice = createSlice({
    name: "location",
    initialState, // ✅ No more 'never[]' errors
    reducers: {}, 
    extraReducers: (builder) => {
      builder
        .addCase(fetchStates.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchStates.fulfilled, (state, action) => {
          state.states = action.payload; // ✅ FIXED: Now properly inferred as State[]
          state.loading = false;
        })
        .addCase(fetchStates.rejected, (state, action) => {
          state.error = action.error.message || "Failed to fetch states";
          state.loading = false;
        })
        .addCase(fetchCities.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchCities.fulfilled, (state, action) => {
          state.cities = action.payload; // ✅ FIXED: Now properly inferred as City[]
          state.loading = false;
        })
        .addCase(fetchCities.rejected, (state, action) => {
          state.error = action.error.message || "Failed to fetch cities";
          state.loading = false;
        });
    },
  });
  
  export default locationSlice.reducer;
  