import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sortType: "hot", // | 'new' | 'top' | 'hot' | 'rising'
};

const sortSelectorSlice = createSlice({
  name: "sortSelector",
  initialState,
  reducers: {
    setSortType: {
      reducer(state, action) {
        state.sortType = action.payload;
      },
    },
  },
});

export const selectSortType = (state) => state.homepage.sortType;
export const { setSortType } = sortSelectorSlice.actions;
export default sortSelectorSlice.reducer;
