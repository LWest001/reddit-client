import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  query: "",
  threads: [],
  icons: {},
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  sortType: "best", // 'best' | 'new' | 'top' | 'hot' | 'rising'
  error: null,
};

export const fetchSearchResults = createAsyncThunk(
  "searchResults/fetchSearchResults",
  async (sortType) => {
    const URL = `https://www.reddit.com/${sortType}.json`;
    const response = await axios.get(URL);
    return response.data.data.children;
  }
);

const searchResultsSlice = createSlice({
  name: "searchResults",
  initialState,
  reducers: {
    query: {
      reducer(state, action) {
        state.query = action.payload;
      },
    },
  },
});

export const selectQuery = (state) => state.searchResults.threads;

export const { query } = searchResultsSlice.actions;
export default searchResultsSlice.reducer;
