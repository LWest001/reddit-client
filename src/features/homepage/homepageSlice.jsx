import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getThreadType } from "../../functions/getThreadType";
import { getTimeStamp } from "../../functions/getTimeStamp";
import { getRandomKey } from "../../functions/getRandomKey";

const initialState = {
  threads: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  sortType: "best", // 'best' | 'new' | 'top' | 'hot' | 'rising'
  error: null,
};

export const fetchThreads = createAsyncThunk(
  "homepage/fetchThreads",
  async (sortType) => {
    const URL = `https://www.reddit.com/${sortType}.json`;
    const response = await axios.get(URL);
    return response.data.data.children;
  }
);

const homepageSlice = createSlice({
  name: "homepage",
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
      .addCase(fetchThreads.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchThreads.fulfilled, (state, action) => {
        state.status = "succeeded";
        const loadedThreads = action.payload.map((thread) => {
          const data = thread.data;
          const threadType = getThreadType(data);

          return {
            keyId: getRandomKey(),
            subredditName: data.subreddit,
            author: data.author,
            timestamp: getTimeStamp(data.created_utc),
            threadTitle: data.title,
            score: data.score,
            commentCount: data.num_comments,
            gallery: threadType === "gallery" && data.url,
            image: threadType === "image" && data.url,
            link: "https://reddit.com" + data.permalink,
            thumbnail: data.thumbnail,
            richVideo: threadType === "richVideo" && data.url,
            selfText: threadType === "self" && data.selftext,
            threadType: threadType,
            video:
              threadType === "video" &&
              data.secure_media.reddit_video.fallback_url,
          };
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
export const selectThreadsStatus = (state) => state.homepage.status;

export const { setStatus } = homepageSlice.actions;
export default homepageSlice.reducer;
