import { useSelector, useDispatch } from "react-redux";
import Layout from "../components/Layout";
import {
  selectThreadsStatus,
  selectModal,
  setStatus,
} from "../features/ThreadList/threadListSlice";
import ErrorPage from "../features/ErrorPage";
import ImageModal from "../components/ImageModal/ImageModal";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import { ScrollRestoration } from "react-router-dom";
import { CssBaseline } from "@mui/material";

function App() {
  const status = useSelector(selectThreadsStatus);
  const modal = useSelector(selectModal);
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
      {modal.display && (
        <ImageModal image={modal.image} title={modal.title} link={modal.link} />
      )}
      <ScrollRestoration />
    </>
  );
}

export default App;
