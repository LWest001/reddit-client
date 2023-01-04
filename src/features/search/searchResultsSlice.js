import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
};

const searchResultsSlice = createSlice({
  name: "searchResults",
  initialState,
  reducers: {
    query: {
      reducer(state, action) {
        state.query = action.payload;
      },
    },
  },
});

export const selectQuery = (state) => state.searchResults.threads;

export const { query } = searchResultsSlice.actions;
export default searchResultsSlice.reducer;
