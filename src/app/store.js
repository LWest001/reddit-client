import { configureStore } from "@reduxjs/toolkit";
import homepageReducer from "../features/homepage/homepageSlice";
import searchResultsReducer from "../features/search/searchResultsSlice";
const store = configureStore({
  reducer: {
    homepage: homepageReducer,
    searchResults: searchResultsReducer,
  },
});

export default store;
