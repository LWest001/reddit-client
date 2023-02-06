import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getThreadType } from "../../functions/getThreadType";
import { getTimeStamp } from "../../functions/getTimeStamp";
import { getRandomKey } from "../../functions/getRandomKey";
import providers from "../../assets/providers.json";

const initialState = {
  after: "",
  threads: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed' | 'loadMore'
  modal: {
    image: "",
    title: "",
    link: "",
    display: "",
  },
  query: "",
  view: "homepage", // 'homepage' | 'searchResults' | 'subreddit'
  error: null,
};

export const fetchThreads = createAsyncThunk(
  "threadList/fetchThreads",
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
    setModal: {
      reducer(state, action) {
        state.modal = action.payload;
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
  },

  extraReducers(builder) {
    builder
      .addCase(fetchThreads.pending, (state, action) => {
        if (action.meta.arg.after) {
          state.status === "loadMore";
        } else {
          state.status = "loading";
        }
      })
      .addCase(fetchThreads.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.after = action.payload.after;
        const isFetchingMore = action.payload.isFetchingMore;
        const loadedThreads = action.payload.threads.map((thread) => {
          const data = thread.data;
          const threadType = getThreadType(data);

          return {
            author: data.author,
            commentCount: data.num_comments,
            gallery: threadType === "gallery" && data.url,
            image: threadType === "image" && data.url,
            imagePreview:
              threadType === "image" && data.preview.images[0].resolutions,
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
              hls: data.media.reddit_video.hls_url,
            },
          };
        });
        if (isFetchingMore) {
          loadedThreads.forEach((thread) => state.threads.push(thread));
        } else {
          state.threads = loadedThreads;
        }
      })
      .addCase(fetchThreads.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllThreads = (state) => state.threadList.threads;
export const selectThreadsStatus = (state) => state.threadList.status;
export const selectQuery = (state) => state.threadList.query;
export const selectModal = (state) => state.threadList.modal;
export const selectAfter = (state) => state.threadList.after;

export const {
  setStatus,
  setQuery,
  setModal,
  setAfter,
  setThreads,
} = threadListSlice.actions;
export default threadListSlice.reducer;
