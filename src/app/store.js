import { configureStore } from "@reduxjs/toolkit";
import threadListReducer from "../features/threadList/threadListSlice";
import threadReducer from "../features/thread/threadSlice";
const store = configureStore({
  reducer: {
    threadList: threadListReducer,
    thread: threadReducer,
  },
});

export default store;
