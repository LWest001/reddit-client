import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, createSearchParams } from "react-router-dom";
import SortSelector from "./SortSelector";
import { useEffect } from "react";
import { selectSortType } from "./sortSelectorSlice";
import "./Header.css";
import { setQuery } from "../features/search/searchResultsSlice";
import { selectQuery } from "../features/search/searchResultsSlice";
import { setStatus as setSearchStatus } from "../features/search/searchResultsSlice";
import { setSortType } from "./sortSelectorSlice";
import { setStatus as setHomepageStatus } from "../features/homepage/homepageSlice";

const Header = () => {
  const selectedType = useSelector(selectSortType);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useSelector(selectQuery);

  useEffect(() => {
    if (selectedType === "best") {
      document.querySelector("select").selectedIndex = 0;
    }
  }, [selectedType]);

  const handleClick = () => {
    dispatch(setSortType("best"));
    dispatch(setHomepageStatus("idle"));
    navigate("/");
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(setSearchStatus("idle"));
    const params = { q: query };
    navigate({
      pathname: "/search",
      search: `?${createSearchParams(params)}`,
    });
    e.target[0].value = "";
  }

  return (
    <header className="Header">
      <nav>
        <ul>
          <li>
            <Link to="/" onClick={handleClick}>
              🏠
            </Link>
          </li>
          <li>
            <Link to="/">
              <div className="burgerLines">
                <div className="burgerLine"></div>
                <div className="burgerLine"></div>
                <div className="burgerLine"></div>
              </div>
            </Link>
          </li>
          <li>
            <SortSelector />
          </li>
          <li id="searchLink">
            <form onSubmit={handleSubmit}>
              <input
                type="search"
                id="searchInput"
                placeholder="🔍"
                onChange={(e) => dispatch(setQuery(e.target.value))}
              />
            </form>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
