import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import replaceEntities from "../../functions/replaceEntities";

const initialState = {
  icons: {},
};

export const fetchIcon = createAsyncThunk(
  "threadList/fetchIcon",
  async (subreddit) => {
    const doNotCheck = sessionStorage.getItem(subreddit);
    if (doNotCheck) {
      return {
        subreddit: subreddit,
        icon: null,
      };
    }
    const localIcon = localStorage.getItem(subreddit);

    if (localIcon && localIcon !== "null" && localIcon !== "undefined") {
      return {
        subreddit: subreddit,
        icon: localIcon,
      };
    }
    let icon;
    const URL = `https://www.reddit.com/r/${subreddit}/about.json`;
    const response = await axios.get(URL, {
      headers: "Access-Control-Allow-Origin",
    });

    icon =
      replaceEntities(response.data.data.community_icon) ||
      replaceEntities(response.data.data.icon_img) ||
      replaceEntities(response.data.data.header_img);
    localStorage.setItem(subreddit, icon || null);
    if (!icon) {
      sessionStorage.setItem(subreddit, true);
    }
    return {
      subreddit: subreddit,
      icon: icon || null,
    };
  }
);

const threadListSlice = createSlice({
  name: "threadList",
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
      .addCase(fetchIcon.pending, (state, action) => {
        const subreddit = action.meta.arg;
        state.icons[subreddit] = "loading";
      })
      .addCase(fetchIcon.fulfilled, (state, action) => {
        const { subreddit, icon } = action.payload;
        state.icons[subreddit] = icon;
      })
      .addCase(fetchIcon.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectIcons = (state) => state.threadList.icons;
export const selectIconBySubreddit = (state, subreddit) => {
  return state.threadList.icons[subreddit];
};

export default threadListSlice.reducer;
