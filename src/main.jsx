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
import Homepage from "./features/homepage/Homepage";
import Subreddit from "./features/subreddit/Subreddit";
import SearchResults from "./features/search/SearchResults";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/:sortType?" element={<App />}>
      <Route index element={<Homepage />} />
      <Route path="r/:subredditName/:sortType?" element={<Subreddit />} />
      <Route path="search?/:sortType?" element={<SearchResults />} />
    </Route>
  )
  //   [
  //   {
  //     path: "/",
  //     element: <App />,
  //     children: [
  //       {
  //         path: "/",
  //         element: <Homepage />,
  //       },
  //       {
  //         path: ":sortType",
  //         element: <Homepage />,
  //       },
  //       {
  //         path: "r/:subredditName",
  //         element: <Subreddit />,
  //       },
  //       {
  //         path: "search?",
  //         element: <SearchResults />,
  //       },
  //     ],
  //   },
  // ]
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
