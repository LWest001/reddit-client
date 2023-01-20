import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getThreadType } from "../../functions/getThreadType";
import { getTimeStamp } from "../../functions/getTimeStamp";
import { getRandomKey } from "../../functions/getRandomKey";

const initialState = {
  query: "",
  threads: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchSearchResults = createAsyncThunk(
  "searchResults/fetchSearchResults",
  async (query, sortType = "hot") => {
    const URL = `https://www.reddit.com/search.json?q=${query}&sort=${sortType}`;
    const response = await axios.get(URL);
    return response.data.data.children;
  }
);

const searchResultsSlice = createSlice({
  name: "searchResults",
  initialState,
  reducers: {
    setQuery: {
      reducer(state, action) {
        state.query = action.payload;
      },
    },
    setStatus: {
      reducer(state, action) {
        state.status = action.payload;
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSearchResults.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.status = "succeeded";
        const loadedResults = action.payload.map((result) => {
          const data = result.data;
          const threadType = getThreadType(data);
          return {
            keyId: getRandomKey(),
            subredditName: data.subreddit,
            author: data.author,
            timestamp: getTimeStamp(data.created_utc),
            threadTitle: data.title,
            score: data.score,
            link: "https://reddit.com" + data.permalink,
            thumbnail: data.thumbnail,
            selfText: threadType === "self" && data.selftext,
            threadType: threadType,
          };
        });
        state.threads = loadedResults;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectQuery = (state) => state.searchResults.query;
export const selectAllThreads = (state) => state.searchResults.threads;
export const selectSortType = (state) => state.searchResults.sortType;
export const selectThreadsStatus = (state) => state.searchResults.status;

export const { setQuery, setStatus } = searchResultsSlice.actions;
export default searchResultsSlice.reducer;
