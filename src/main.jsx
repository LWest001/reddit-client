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
import Thread from "./features/Threa/Thread";
import ThreadList from "./features/ThreadLis/ThreadList";

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
        path="search/:sortType?"
        element={<ThreadList view="searchResults" />}
        errorElement={<ErrorPage />}
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
