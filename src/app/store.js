import { configureStore } from "@reduxjs/toolkit";
import homepageReducer from "../features/homepage/homepageSlice";
import sortSelectorReducer from "../components/sortSelectorSlice";
const store = configureStore({
  reducer: {
    homepage: homepageReducer,
    sortSelector: sortSelectorReducer,
  },
});

export default store;
