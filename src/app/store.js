import { configureStore } from "@reduxjs/toolkit";
import threadListReducer from "../features/ThreadList/threadListSlice";
import threadReducer from "../features/Thread/threadSlice";
const store = configureStore({
  reducer: {
    threadList: threadListReducer,
    thread: threadReducer,
  },
});

export default store;
