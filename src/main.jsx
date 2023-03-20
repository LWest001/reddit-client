import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./reset.css";
import "./index.css";
import { Provider } from "react-redux";
import store from "./app/store";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import ErrorPage from "./features/ErrorPage";
import Thread from "./features/Thread/Thread";
import ThreadList from "./features/ThreadList/ThreadList";
import { ThemeProvider } from "@emotion/react";
import theme from "./assets/theme";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/:sortType?" element={<App />} errorElement={<ErrorPage />}>
      <Route
        index
        element={<ThreadList view="homepage" />}
        errorElement={<ErrorPage />}
      />
      <Route
        path="r/:subredditName/:sortType?"
        element={<ThreadList view="subreddit" />}
        errorElement={<ErrorPage />}
      ></Route>
      <Route
        path="r/:subredditName/comments/:redditId/:threadTitle/:sortType?"
        element={<Thread />}
        errorElement={<ErrorPage />}
      />
      <Route
        path="search"
        element={<ThreadList view="searchResults" />}
        errorElement={<ErrorPage />}
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
