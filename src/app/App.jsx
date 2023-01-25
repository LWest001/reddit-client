import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import { selectThreadsStatus } from "../features/homepage/homepageSlice";
import ErrorPage from "../features/ErrorPage";

function App() {
  const status = useSelector(selectThreadsStatus);
  return (
    <>
      <Layout />
      {status === "failed" && <ErrorPage />}
    </>
  );
}

export default App;
