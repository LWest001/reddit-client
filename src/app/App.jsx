import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import SearchResults from "../features/search/SearchResults";
import Homepage from "../features/homepage/Homepage";
import { useSelector } from "react-redux";
import { selectSortType } from "../features/homepage/homepageSlice";
import { selectQuery as selectSearchQuery } from "../features/search/searchResultsSlice";

function App() {
  const sortType = useSelector(selectSortType);
  const query = useSelector(selectSearchQuery);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage sortType="best" />} />
        <Route path=":sortType" element={<Homepage sortType={sortType} />} />
        <Route path="search?" element={<SearchResults query={query} />} />
      </Route>
    </Routes>
  );
}

export default App;
