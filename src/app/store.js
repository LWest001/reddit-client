import { configureStore } from "@reduxjs/toolkit";
import homepageReducer from "../features/homepage/homepageSlice";
import searchResultsReducer from "../features/search/searchResultsSlice";
import sortSelectorReducer from "../components/sortSelectorSlice";
const store = configureStore({
  reducer: {
    homepage: homepageReducer,
    searchResults: searchResultsReducer,
    sortSelector: sortSelectorReducer,
  },
});

export default store;
