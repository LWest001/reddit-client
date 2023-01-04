import { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Layout from "../components/Layout";
import SearchResults from "../features/search/SearchResults";
import Homepage from "../features/homepage/Homepage";

function App() {
  // return <>App</>;
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage sortType="best" />} />

        {/* must implement homepage reducer first
         * <Route path=":sortType" sortType={sortType}/>*/}
      </Route>
    </Routes>
  );
}

export default App;
