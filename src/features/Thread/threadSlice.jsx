import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";
import { getThreadType } from "../../functions/getThreadType";
import { getTimeStamp } from "../../functions/getTimeStamp";
import providers from "../../assets/providers.json";

const initialState = {
  threadData: {},
  comments: [],
  subreplies: { id: "", replies: [] },
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchData = createAsyncThunk(
  "thread/fetchData",
  async (options) => {
    const {
      link,
      sortType = "hot",
      requestType = "thread",
      indexTree,
      idTree,
    } = options;
    let comments;
    let URL = `${link}.json`;
    if (sortType) {
      URL = `${URL}?sort=${sortType}`;
    }
    const response = await axios.get(URL);
    const threadData = response.data[0].data.children[0].data;

    comments = response.data[1].data.children;

    return { threadData, comments, requestType, indexTree, idTree };
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
    setSpecificComment: {
      reducer(state, action) {
        const { indices, replies } = action.payload;
        let comment = state.comments[indices[0]];
        indices.shift();
        indices.forEach((i) => {
          if (comment.replies.data) {
            comment = comment.replies.data.children[i].data;
          } else {
            comment = comment.replies[i].data;
          }
        });
        comment.replies.data.children.push(replies);
      },
    },
    setSubreplies: {
      reducer(state, action) {
        state.subreplies = action.payload;
      },
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchData.pending, (state, action) => {
        if (action.meta.arg.requestType === "thread") {
          state.status = "loading";
        }
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        let {
          threadData,
          comments,
          requestType,
          indexTree,
          idTree,
        } = action.payload;
        let subreplyId = comments[0].data.id;
        const threadType = getThreadType(threadData);
        let filteredData;
        if (requestType === "thread") {
          filteredData = {
            author: threadData.author,
            commentCount: threadData.num_comments,
            gallery: threadType === "gallery" && threadData.url,
            image: threadType === "image" && threadData.url,
            imagePreview:
              ["image", "video"].includes(threadType) &&
              threadData.preview.images[0].resolutions,

            link: "https://reddit.com" + threadData.permalink,
            keyId: threadData.id,
            postFlair: {
              backgroundColor: threadData.link_flair_background_color,
              textColor: threadData.link_flair_text_color,
              text:
                threadData.link_flair_richtext[0]?.t ||
                threadData.link_flair_richtext[1]?.t,
            },
            redditId: threadData.name,
            richVideo: threadType === "richVideo" && {
              oembed: threadData.media.oembed,
              url: threadData.url,
              provider: providers.find(
                (provider) =>
                  provider.provider_name ===
                  threadData.media.oembed.provider_name
              ),
            },
            selfText: threadType === "self" && threadData.selftext,
            score: threadData.score,
            subredditName: threadData.subreddit,
            threadTitle: threadData.title,
            threadType: threadType,
            timestamp: getTimeStamp(threadData.created_utc),
            thumbnail: threadData.thumbnail,
            video: threadType === "video" && {
              dashManifest: threadData.media.reddit_video.dash_url,
              fallback: threadData.media.reddit_video.fallback_url,
            },
          };
          state.threadData = filteredData;
        }
        function filterComments() {
          if (requestType === "subreplies") {
            comments = comments[0].data.replies.data.children;
          }
          return comments.map((comment, index) => {
            const { data, kind } = comment;
            if (kind === "more") {
              return {
                ...comment,
              };
            }
            return {
              ...comment,
              data: {
                ...data,
                index,
                parentId: data.parent_id.substring(3),
              },
            };
          });
        }
        const filteredComments = filterComments();
        if (requestType === "thread") {
          state.comments = filteredComments;
        }
        if (requestType === "subreplies") {
          state.subreplies = {
            id: subreplyId,
            replies: filteredComments,
          };
          let firstComment = state.comments[indexTree[0]];
          let commentsArr = [[0, firstComment]];
          indexTree.shift();
          let index;
          while (indexTree.length) {
            index = indexTree[0];
            commentsArr.push([
              index,
              commentsArr[commentsArr.length - 1][1].data.replies.data.children[
                index
              ],
            ]);
            indexTree.shift();
          }
          commentsArr[commentsArr.length - 1][1].data.replies.data.children =
            state.subreplies.replies;
          console.log(commentsArr);
        }
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
export const selectSubreplies = (state) => state.thread.subreplies;

export const {
  setStatus,
  setThreadData,
  setComments,
  setSpecificComment,
  setSubreplies,
} = threadSlice.actions;
export default threadSlice.reducer;
