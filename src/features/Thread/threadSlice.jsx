import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getThreadType } from "../../functions/getThreadType";
import { getTimeStamp } from "../../functions/getTimeStamp";
import providers from "../../assets/providers.json";

const initialState = {
  threadData: {},
  comments: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchData = createAsyncThunk(
  "thread/fetchData",
  async (options) => {
    const { link, sortType } = options;
    let URL = `${link}.json`;
    if (sortType) {
      URL = `${URL}?sort=${sortType}`;
    }
    const response = await axios.get(URL);
    const threadData = response.data[0].data.children[0].data;
    const comments = response.data[1].data.children;
    return { threadData, comments };
  }
);

const threadSlice = createSlice({
  name: "thread",
  initialState,
  reducers: {
    setStatus: {
      reducer(state, action) {
        state.status = action.payload;
      },
    },
    setThreadData: {
      reducer(state, action) {
        state.threadData = action.payload;
      },
    },
    setComments: {
      reducer(state, action) {
        state.comments = action.payload;
      },
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { threadData, comments } = action.payload;
        const threadType = getThreadType(threadData);
        const filteredData = {
          keyId: threadData.id,
          subredditName: threadData.subreddit,
          author: threadData.author,
          timestamp: getTimeStamp(threadData.created_utc),
          threadTitle: threadData.title,
          score: threadData.score,
          redditId: threadData.name,
          commentCount: threadData.num_comments,
          gallery: threadType === "gallery" && threadData.url,
          image: threadType === "image" && threadData.url,
          imagePreview:
            ["image", "video"].includes(threadType) &&
            threadData.preview.images[0].resolutions,

          link: "https://reddit.com" + threadData.permalink,
          postFlair: {
            backgroundColor: threadData.link_flair_background_color,
            textColor: threadData.link_flair_text_color,
            text:
              threadData.link_flair_richtext[0]?.t ||
              threadData.link_flair_richtext[1]?.t,
          },
          thumbnail: threadData.thumbnail,
          richVideo: threadType === "richVideo" && {
            oembed: threadData.media.oembed,
            url: threadData.url,
            provider: providers.find(
              (provider) =>
                provider.provider_name === threadData.media.oembed.provider_name
            ),
          },
          selfText: threadType === "self" && threadData.selftext,
          threadType: threadType,
          video: threadType === "video" && {
            dashManifest: threadData.media.reddit_video.dash_url,
            fallback: threadData.media.reddit_video.fallback_url,
          },
        };
        state.threadData = filteredData;
        const filteredComments = comments.map((comment) => {
          const { data, kind } = comment;
          if (kind === "more") {
            return {
              type: "readMore",
              keyId: data.id,
            };
          }
          return {
            author: data.author,
            body: data.body_html,
            keyId: data.id,
            replies: data?.replies?.data?.children,
            score: data.ups,
            timestamp: getTimeStamp(data.created_utc),
          };
        });
        state.comments = filteredComments;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectThreadData = (state) => state.thread.threadData;
export const selectThreadStatus = (state) => state.thread.status;
export const selectAllComments = (state) => state.thread.comments;

export const { setStatus, setThreadData, setComments } = threadSlice.actions;
export default threadSlice.reducer;
