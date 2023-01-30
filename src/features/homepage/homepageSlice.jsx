import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getThreadType } from "../../functions/getThreadType";
import { getTimeStamp } from "../../functions/getTimeStamp";
import { getRandomKey } from "../../functions/getRandomKey";
import providers from "../../assets/providers.json";

const initialState = {
  threads: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  query: "",
  error: null,
};

export const fetchThreads = createAsyncThunk(
  "homepage/fetchThreads",
  async (options) => {
    const { sortType, subredditName, query } = options;
    const baseURL = "https://www.reddit.com";
    let URL;
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
    const response = await axios.get(baseURL + URL);
    return response.data.data.children;
  }
);

const homepageSlice = createSlice({
  name: "homepage",
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
      .addCase(fetchThreads.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchThreads.fulfilled, (state, action) => {
        state.status = "succeeded";
        const loadedThreads = action.payload.map((thread) => {
          const data = thread.data;
          const threadType = getThreadType(data);

          return {
            author: data.author,
            commentCount: data.num_comments,
            gallery: threadType === "gallery" && data.url,
            image: threadType === "image" && data.url,
            keyId: getRandomKey(),
            link: "https://reddit.com" + data.permalink,
            postFlair: {
              backgroundColor: data.link_flair_background_color,
              textColor: data.link_flair_text_color,
              text:
                data.link_flair_richtext[0]?.t ||
                data.link_flair_richtext[1]?.t,
            },
            redditId: data.name,
            richVideo: threadType === "richVideo" && {
              oembed: data.media.oembed,
              url: data.url,
              provider: providers.find(
                (provider) =>
                  provider.provider_name === data.media.oembed.provider_name
              ),
            },
            score: data.score,
            selfText: threadType === "self" && data.selftext,
            subredditName: data.subreddit,
            threadTitle: data.title,
            thumbnail: data.thumbnail,
            timestamp: getTimeStamp(data.created_utc),
            threadType: threadType,
            video: threadType === "video" && {
              dashManifest: data.media.reddit_video.dash_url,
              fallback: data.media.reddit_video.fallback_url,
            },
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
export const selectQuery = (state) => state.homepage.query;

export const { setStatus, setQuery } = homepageSlice.actions;
export default homepageSlice.reducer;
