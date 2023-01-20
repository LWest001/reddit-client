import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import SearchResults from "../features/search/SearchResults";
import Homepage from "../features/homepage/Homepage";
import { useSelector } from "react-redux";
import { selectQuery as selectSearchQuery } from "../features/search/searchResultsSlice";
import Subreddit from "../features/subreddit/Subreddit";

function App() {
  const query = useSelector(selectSearchQuery);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path=":sortType" element={<Homepage />} />
        <Route path="r/:subredditName" element={<Subreddit />} />
        <Route path="search?" element={<SearchResults query={query} />} />
      </Route>
    </Routes>
  );
}

export default App;
