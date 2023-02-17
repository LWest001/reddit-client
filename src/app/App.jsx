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
import { Container } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
  const status = useSelector(selectThreadsStatus);
  const modal = useSelector(selectModal);
  const dispatch = useDispatch();

  function loadMoreItems() {
    status === "succeeded" && dispatch(setStatus("loadMore"));
  }

  return (
    <Container>
      <BottomScrollListener onBottom={loadMoreItems} offset={5000} />
      <Layout />
      {status === "failed" && <ErrorPage />}
      {modal.display && (
        <ImageModal image={modal.image} title={modal.title} link={modal.link} />
      )}
      <ScrollRestoration />
    </Container>
  );
}

export default App;
