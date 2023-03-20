import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getThreadType } from "../../functions/getThreadType";
import filterThreadData from "../../functions/filterThreadData";

const initialState = {
  after: "",
  threads: [],
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
      isFetchingMore: isFetchingMore,
      query,
    };
  }
);

export const fetchIcon = createAsyncThunk(
  "threadList/fetchIcon",
  async (subredditName, state) => {
    let icon;
    const icons = state.getState().threadList.icons;
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

    setThreads: {
      reducer(state, action) {
        state.threads = action.payload;
      },
    },
    setView: {
      reducer(state, action) {
        state.view = action.payload;
      },
    },
    setIcons: {
      reducer(state, action) {
        const { subredditName } = action.payload;
        if (!Object.hasOwn(state.icons, subredditName)) {
          state.icons[subredditName] = action.payload.icon;
        }
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
        state.status = "succeeded";
        state.after = action.payload.after;
        state.query = action.payload.query;
        const isFetchingMore = action.payload.isFetchingMore;
        const loadedThreads = action.payload.threads.map((thread) => {
          const data = thread.data;
          const threadType = getThreadType(data);
          return filterThreadData(data, threadType);
        });
        if (isFetchingMore) {
          loadedThreads.forEach((thread) => state.threads.push(thread));
        } else {
          state.threads = loadedThreads;
        }
      })
      .addCase(fetchThreadsList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchIcon.pending, (state, action) => {
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
export const selectThreadsStatus = (state) => state.threadList.status;
export const selectQuery = (state) => state.threadList.query;
export const selectIcons = (state) => state.threadList.icons;
export const selectAfter = (state) => state.threadList.after;

export const {
  setStatus,
  setQuery,
  setIcons,
  setAfter,
  setThreads,
} = threadListSlice.actions;
export default threadListSlice.reducer;
