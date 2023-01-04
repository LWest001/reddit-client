import { Routes, Route, Link } from "react-router-dom";
import Layout from "../components/Layout";
import SearchResults from "../features/search/SearchResults";
import Homepage from "../features/homepage/Homepage";
import { useSelector } from "react-redux";
import { selectSortType } from "../features/homepage/homepageSlice";

function App() {
  const sortType = useSelector(selectSortType);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage sortType="best" />} />

        {/* must implement homepage reducer first*/}
        <Route path=":sortType" element={<Homepage sortType={sortType} />} />
      </Route>
    </Routes>
  );
}

export default App;
