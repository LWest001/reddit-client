import { useSelector, useDispatch } from "react-redux";
import Layout from "../components/Layout";
import {
  selectThreadsStatus as selectThreadListStatus,
  setStatus,
} from "../features/ThreadList/threadListSlice";
import { selectThreadStatus } from "../features/Thread/threadSlice";
import ErrorPage from "../features/ErrorPage";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import { ScrollRestoration } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const threadListStatus = useSelector(selectThreadListStatus);
  const threadStatus = useSelector(selectThreadStatus);

  const dispatch = useDispatch();

  function loadMoreItems() {
    if (threadStatus === "idle" || threadStatus === "loading") {
      return;
    }
    threadListStatus === "succeeded" && dispatch(setStatus("loadMore"));
  }

  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <BottomScrollListener onBottom={loadMoreItems} offset={5000} />
      <Layout />
      {status === "failed" && <ErrorPage />}

      <ScrollRestoration />
    </QueryClientProvider>
  );
}

export default App;
