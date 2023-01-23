import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getThreadType } from "../../functions/getThreadType";
import { getTimeStamp } from "../../functions/getTimeStamp";
import { getRandomKey } from "../../functions/getRandomKey";
import providers from "../../assets/providers.json";

const initialState = {
  threads: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchThreads = createAsyncThunk(
  "homepage/fetchThreads",
  async (options) => {
    const { sortType, subredditName, query } = options;
    const baseURL = "https://www.reddit.com";
    let URL;
    if (subredditName) {
      URL = `/r/${subredditName}.json`;
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
            postFlair: {
              backgroundColor: data.link_flair_background_color,
              textColor: data.link_flair_text_color,
              text:
                data.link_flair_richtext[0]?.t ||
                data.link_flair_richtext[1]?.t,
            },
            thumbnail: data.thumbnail,
            richVideo: threadType === "richVideo" && {
              oembed: data.media.oembed,
              url: data.url,
              provider: providers.find(
                (provider) =>
                  provider.provider_name === data.media.oembed.provider_name
              ),
            },
            selfText: threadType === "self" && data.selftext,
            threadType: threadType,
            video:
              threadType === "video" &&
              `<iframe
  id="reddit-embed"
  src="https://www.redditmedia.com${data.permalink}?ref_source=embed&amp;ref=share&amp;embed=true"
  sandbox="allow-scripts allow-same-origin allow-popups"
  style="border: none;"
  height="638"
  width="640"
  scrolling="no"
></iframe>`,
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
