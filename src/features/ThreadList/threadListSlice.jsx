import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import replaceEntities from "../../functions/replaceEntities";

const initialState = {
  icons: {},
};

export const fetchIcon = createAsyncThunk(
  "threadList/fetchIcon",
  async (subredditName) => {
    const doNotCheck = sessionStorage.getItem(subredditName);
    if (doNotCheck) {
      return {
        subredditName: subredditName,
        icon: null,
      };
    }
    const localIcon = localStorage.getItem(subredditName);

    if (localIcon && localIcon !== "null" && localIcon !== "undefined") {
      return {
        subredditName: subredditName,
        icon: localIcon,
      };
    }
    let icon;
    const URL = `https://www.reddit.com/r/${subredditName}/about.json`;
    const response = await axios.get(URL, {
      headers: "Access-Control-Allow-Origin",
    });

    icon =
      replaceEntities(response.data.data.community_icon) ||
      replaceEntities(response.data.data.icon_img) ||
      replaceEntities(response.data.data.header_img);
    localStorage.setItem(subredditName, icon || null);
    if (!icon) {
      sessionStorage.setItem(subredditName, true);
    }
    return {
      subredditName: subredditName,
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
        const subredditName = action.meta.arg;
        state.icons[subredditName] = "loading";
      })
      .addCase(fetchIcon.fulfilled, (state, action) => {
        const { subredditName, icon } = action.payload;
        state.icons[subredditName] = icon;
      })
      .addCase(fetchIcon.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectIcons = (state) => state.threadList.icons;
export const selectIconBySubreddit = (state, subredditName) => {
  return state.threadList.icons[subredditName];
};

export default threadListSlice.reducer;
