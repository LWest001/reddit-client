import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  threads: [],
  sortType: "best", // 'best' | 'new' | 'top' | 'hot' | 'rising'
};

const homepageSlice = createSlice({
  name: "homepage",
  initialState,
  reducers: {
    sortType: {
      reducer(state, action) {
        state.sortType = action.payload;
      },
    },
  },
});

export const selectAllThreads = (state) => state.homepage.threads;
export const selectSortType = (state) => state.homepage.sortType;

export const { sortType } = homepageSlice.actions;
export default homepageSlice.reducer;
