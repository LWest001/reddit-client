import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getThreadType } from "../../functions/getThreadType";
import filterThreadData from "../../functions/filterThreadData";

const initialState = {
  threadData: {},
  comments: [],
  subreplies: { id: "", replies: [] },
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchThread = createAsyncThunk(
  "thread/fetchThread",
  async (options) => {
    const {
      link,
      sortType = "hot",
      requestType = "thread",
      indexTree,
    } = options;
    let comments;
    let URL = `${link}.json`;
    if (sortType) {
      URL = `${URL}?sort=${sortType}`;
    }
    const response = await axios.get(URL);
    const threadData = response.data[0].data.children[0].data;

    comments = response.data[1].data.children;
    return { threadData, comments, requestType, indexTree };
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
  },

  extraReducers(builder) {
    builder
      .addCase(fetchThread.pending, (state, action) => {
        if (action.meta.arg.requestType === "thread") {
          state.status = "loading";
        } else if (action.meta.arg.requestType === "subreplies") {
          state.status = `loading-subreplies`;
        }
      })
      .addCase(fetchThread.fulfilled, (state, action) => {
        state.status = "succeeded";
        let { threadData, comments, requestType, indexTree } = action.payload;
        let subreplyId;
        if (comments.length) {
          subreplyId = comments[0].data.id;
        }
        const threadType = getThreadType(threadData);

        if (requestType === "thread") {
          state.threadData = filterThreadData(threadData, threadType);
        }
        function filterComments() {
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
          let commentsArr = [firstComment];
          let index = 1;
          while (index < indexTree.length) {
            commentsArr.push(
              commentsArr.at(-1).data.replies.data.children[indexTree[index]]
            );
            index++;
          }
          commentsArr.at(-1).data.replies.data.children = [
            ...commentsArr.at(-1).data.replies.data.children,
            ...state.subreplies.replies,
          ];
        }
      })
      .addCase(fetchThread.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectThreadData = (state) => state.thread.threadData;
export const selectThreadStatus = (state) => state.thread.status;
export const selectAllComments = (state) => state.thread.comments;

export const { setStatus, setThreadData } = threadSlice.actions;
export default threadSlice.reducer;
