import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import ThreadCard from "../threadCard/ThreadCard";

const URL = (param) => `https://www.reddit.com/${param}.json`;

function getRandomKey() {
  return crypto.randomUUID();
}

const initialState = {
  threads: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  sortType: "best", // 'best' | 'new' | 'top' | 'hot' | 'rising'
  error: null,
};

export const fetchThreads = createAsyncThunk(
  "homepage/fetchThreads",
  async (param) => {
    const response = await axios.get(URL(param));
    return response.data.data.children;
  }
);

const homepageSlice = createSlice({
  name: "homepage",
  initialState,
  reducers: {
    sortType: {
      reducer(state, action) {
        state.sortType = action.payload;
        state.status = "idle";
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchThreads.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchThreads.fulfilled, (state, action) => {
        state.status = "succeeded";
        const loadedThreads = action.payload.map((thread) => {
          const data = thread.data;
          return (
            <ThreadCard
              key={getRandomKey()}
              subredditAvatar={""}
              subredditName={data.subreddit}
              author={data.author}
              timestamp={new Date(data.created_utc * 1000).toLocaleTimeString(
                "en-US",
                {
                  timeStyle: "short",
                }
              )}
              threadTitle={data.title}
              score={data.score}
              image={data.url}
              link={"https://reddit.com" + data.permalink}
              thumbnail={data.thumbnail}
            />
            // <p>
            //   <span className="subredditName card">
            //     {thread.data.subreddit}
            //   </span>
            //   : {thread.data.title} (👍
            //   {thread.data.score})
            // </p>
          );
        });

        state.threads = loadedThreads;
      })
      .addCase(fetchThreads.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllThreads = (state) => state.homepage.threads;
export const selectSortType = (state) => state.homepage.sortType;
export const selectThreadsStatus = (state) => state.homepage.status;

export const { sortType } = homepageSlice.actions;
export default homepageSlice.reducer;
