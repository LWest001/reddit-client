import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { counter: 0 },
  reducers: {
    increment: (state) => {
      state.counter++;
    },
  },
});

export const selectCount = (state) => state.counter.counter;
export const { increment } = counterSlice.actions;
export default counterSlice.reducer;
