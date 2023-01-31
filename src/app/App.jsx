import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import { selectThreadsStatus } from "../features/homepage/homepageSlice";
import ErrorPage from "../features/ErrorPage";
import { selectModal } from "../features/homepage/homepageSlice";
import ImageModal from "../features/imageModal/ImageModal";

function App() {
  const status = useSelector(selectThreadsStatus);
  const modal = useSelector(selectModal);
  return (
    <>
      <Layout />
      {status === "failed" && <ErrorPage />}
      {modal.display && (
        <ImageModal image={modal.image} title={modal.title} link={modal.link} />
      )}
    </>
  );
}

export default App;
