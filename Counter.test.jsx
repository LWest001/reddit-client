import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Counter } from "./src/features/Counter/Counter";
import { Provider, useDispatch } from "react-redux";
import store from "./src/app/store";
import counterReducer from "./src/features/Counter/counterSlice";

describe("Counter test", () => {
  test("should be visible", () => {
    render(
      <Provider store={store}>
        <Counter></Counter>
      </Provider>
    );
    expect(screen.getByText(/count is 0/)).toBeDefined();
  });
  test("reducers", () => {
    let state;
    state = counterReducer({ counter: 0 }, { type: "counter/increment" });
    expect(state).toEqual({ counter: 1 });
  });
});
