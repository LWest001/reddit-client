import { configureStore } from "@reduxjs/toolkit";
import homepageReducer from "../features/homepage/homepageSlice";
import sortSelectorReducer from "../components/sortSelectorSlice";
import threadReducer from "../features/thread/threadSlice"
const store = configureStore({
  reducer: {
    homepage: homepageReducer,
    sortSelector: sortSelectorReducer,
    thread: threadReducer,
  },
});

export default store;
