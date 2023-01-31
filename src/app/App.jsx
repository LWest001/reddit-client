import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import {
  selectThreadsStatus,
  selectModal,
} from "../features/homepage/homepageSlice";
import ErrorPage from "../features/ErrorPage";
import ImageModal from "../features/imageModal/ImageModal";
import { BottomScrollListener } from "react-bottom-scroll-listener";

function App() {
  const status = useSelector(selectThreadsStatus);
  const modal = useSelector(selectModal);

  return (
    <>
      <BottomScrollListener onBottom={() => console.log("bottom")} />;
      <Layout />
      {status === "failed" && <ErrorPage />}
      {modal.display && (
        <ImageModal image={modal.image} title={modal.title} link={modal.link} />
      )}
    </>
  );
}

export default App;
