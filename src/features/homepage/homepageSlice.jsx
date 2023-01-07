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

const getThreadType = (data) => {
  if (data.is_gallery) {
    return "gallery";
  }
  if (data.is_self) {
    return "self";
  }
  if (data.post_hint) {
    switch (data.post_hint) {
      case "image":
        return "image";
      case "hosted:video":
        return "video";
      case "link":
        return "link";
      case "self":
        return "self";
      case "rich:video":
        return "richVideo";
    }
  }
  return "unknown";
};

const getTimeStamp = (created_utc) => {
  const today = new Date(Date.now()).toLocaleDateString();
  const createdDate = new Date(created_utc * 1000).toLocaleDateString();
  if (today === createdDate) {
    return new Date(created_utc * 1000).toLocaleTimeString("en-US", {
      timeStyle: "short",
    });
  }
  return new Date(created_utc * 1000).toLocaleDateString("en-US", {});
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
          const threadType = getThreadType(data);
          return (
            <ThreadCard
              key={getRandomKey()}
              subredditAvatar={""}
              subredditName={data.subreddit}
              author={data.author}
              timestamp={getTimeStamp(data.created_utc)}
              threadTitle={data.title}
              score={data.score}
              gallery={threadType === "gallery" && data.url}
              image={threadType === "image" && data.url}
              link={"https://reddit.com" + data.permalink}
              thumbnail={data.thumbnail}
              richVideo={threadType === "richVideo" && data.media_embed}
              selftext={threadType === "self" && data.selftext}
              threadType={threadType}
              video={
                threadType === "video" &&
                data.secure_media.reddit_video.fallback_url
              }
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
