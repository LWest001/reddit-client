import { configureStore } from "@reduxjs/toolkit";
import threadListReducer from "../features/ThreadList/threadListSlice";
const store = configureStore({
  reducer: {
    threadList: threadListReducer,
  },
});

export default store;
