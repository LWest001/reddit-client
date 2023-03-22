import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getThreadType } from "../../functions/getThreadType";
import filterThreadData from "../../functions/filterThreadData";

const initialState = {
  after: "",
  threads: [],
  subredditThreads: [],
  searchThreads: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed' | 'loadMore'
  query: "",
  icons: {},
  view: "homepage", // 'homepage' | 'searchResults' | 'subreddit'
  error: null,
};

export const fetchThreadsList = createAsyncThunk(
  "threadList/fetchThreadsList",
  async (options) => {
    const { sortType, subredditName, query, after } = options;
    const baseURL = "https://www.reddit.com";
    let URL;
    let isFetchingMore = false;
    if (subredditName) {
      if (sortType) {
        URL = `/r/${subredditName}/${sortType}.json`;
      } else {
        URL = `/r/${subredditName}.json`;
      }
    } else if (query) {
      URL = `/search.json?q=${query}&sort=${sortType}`;
    } else {
      URL = `/${sortType}.json`;
    }

    if (after) {
      isFetchingMore = true;
      URL = `${URL}?after=${after}`;
    }

    const response = await axios.get(baseURL + URL);
    return {
      threads: response.data.data.children,
      after: response.data.data.after,
      isFetchingMore,
      query,
      subredditName,
    };
  }
);

export const fetchIcon = createAsyncThunk(
  "threadList/fetchIcon",
  async (subredditName) => {
    let icon;
    const URL = `https://www.reddit.com/r/${subredditName}/about.json`;
    const response = await axios.get(URL, {
      headers: "Access-Control-Allow-Origin",
    });
    icon = response.data.data.icon_img || response.data.data.header_img;
    return {
      subredditName: subredditName,
      icon: icon,
    };
  }
);

const threadListSlice = createSlice({
  name: "threadList",
  initialState,
  reducers: {
    setStatus: {
      reducer(state, action) {
        state.status = action.payload;
      },
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchThreadsList.pending, (state, action) => {
        if (action.meta.arg.after) {
          state.status === "loadMore";
        } else {
          state.status = "loading";
        }
      })
      .addCase(fetchThreadsList.fulfilled, (state, action) => {
        const { isFetchingMore, subredditName, query, after } = action.payload;
        state.status = "succeeded";
        state.after = after;
        state.query = query;
        const loadedThreads = action.payload.threads.map((thread) => {
          const data = thread.data;
          const threadType = getThreadType(data);
          return filterThreadData(data, threadType);
        });
        if (isFetchingMore) {
          if (subredditName) {
            loadedThreads.forEach((thread) =>
              state.subredditThreads.push(thread)
            );
          } else if (query) {
            loadedThreads.forEach((thread) => state.searchThreads.push(thread));
          } else {
            loadedThreads.forEach((thread) => state.threads.push(thread));
          }
        } else {
          if (subredditName) {
            state.subredditThreads = loadedThreads;
          } else if (query) {
            state.searchThreads = loadedThreads;
          } else {
            state.threads = loadedThreads;
          }
        }
      })
      .addCase(fetchThreadsList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchIcon.pending, (state, action) => {
        const subredditName = action.meta.arg;
        state.icons[subredditName] = "loading";
      })
      .addCase(fetchIcon.fulfilled, (state, action) => {
        const { subredditName, icon } = action.payload;
        state.icons[subredditName] = icon;
      })
      .addCase(fetchIcon.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllThreads = (state) => state.threadList.threads;
export const selectSubredditThreads = (state) =>
  state.threadList.subredditThreads;
export const selectSearchThreads = (state) => state.threadList.searchThreads;
export const selectThreadsStatus = (state) => state.threadList.status;
export const selectQuery = (state) => state.threadList.query;
export const selectIcons = (state) => state.threadList.icons;
export const selectIconBySubreddit = (state, subredditName) =>
  state.threadList.icons[subredditName];
export const selectAfter = (state) => state.threadList.after;

export const { setStatus } = threadListSlice.actions;
export default threadListSlice.reducer;
