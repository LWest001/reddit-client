import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import SearchResults from "../features/search/SearchResults";
import Homepage from "../features/homepage/Homepage";
import { useSelector } from "react-redux";
import { selectQuery as selectSearchQuery } from "../features/search/searchResultsSlice";
import Subreddit from "../features/subreddit/Subreddit";
import { Outlet } from "react-router-dom";

function App() {
  const query = useSelector(selectSearchQuery);
  return (
    <Layout />
  );
}

export default App;
