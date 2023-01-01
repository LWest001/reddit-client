import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/Counter/counterSlice";

const store = configureStore({
  reducer: { counter: counterReducer },
});

export default store;
