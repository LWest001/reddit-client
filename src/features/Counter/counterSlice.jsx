import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { count: 0 },
  reducers: {
    increment: (state) => {
      state.count++;
    },
  },
});

export const selectCount = (state) => state.counter.count;
export const { increment } = counterSlice.actions;
export default counterSlice.reducer;
