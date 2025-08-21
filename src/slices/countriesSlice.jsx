import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCountries = createAsyncThunk(
  "countries/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const url = "https://restcountries.com/v2/all?fields=name,region,flag";
      const { data } = await axios.get(url);
      return data;
    } catch (err) {
      return rejectWithValue(err?.message || "Failed to fetch countries");
    }
  }
);

const countriesSlice = createSlice({
  name: "countries",
  initialState: {
    all: [],
    filtered: [],
    status: "idle",
    error: null,
    region: "All",
    visibleCount: 12,
  },
  reducers: {
    setRegion: (state, action) => {
      state.region = action.payload;
      state.visibleCount = 12;
      state.filtered =
        state.region === "All"
          ? state.all
          : state.all.filter((c) => c.region === state.region);
    },
    loadMore: (state) => {
      state.visibleCount += 12;
    },
    resetCountries: (state) => {
      state.filtered = state.all;
      state.region = "All";
      state.visibleCount = 12;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.all = action.payload || [];
        state.filtered = state.all;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Error";
      });
  },
});

export const { setRegion, loadMore, resetCountries } = countriesSlice.actions;
export default countriesSlice.reducer;
