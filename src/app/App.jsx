import { useSelector, useDispatch } from "react-redux";
import Layout from "../components/Layout";
import {
  selectThreadsStatus,

  setStatus,
} from "../features/ThreadList/threadListSlice";
import ErrorPage from "../features/ErrorPage";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import { ScrollRestoration } from "react-router-dom";
import { CssBaseline } from "@mui/material";

function App() {
  const status = useSelector(selectThreadsStatus);

  const dispatch = useDispatch();

  function loadMoreItems() {
    status === "succeeded" && dispatch(setStatus("loadMore"));
  }

  return (
    <>
      <CssBaseline />
      <BottomScrollListener onBottom={loadMoreItems} offset={5000} />
      <Layout />
      {status === "failed" && <ErrorPage />}
      
      <ScrollRestoration />
    </>
  );
}

export default App;
