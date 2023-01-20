import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useNavigate,
  createSearchParams,
} from "react-router-dom";
import SortSelector from "./SortSelector";
import { sortType } from "../features/homepage/homepageSlice";
import { useEffect } from "react";
import { selectSortType } from "../features/homepage/homepageSlice";
import "./Header.css";
import { setQuery } from "../features/search/searchResultsSlice";
import { selectQuery } from "../features/search/searchResultsSlice";
import { setStatus } from "../features/search/searchResultsSlice";

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
    dispatch(sortType("best"));
    navigate("/");
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(setStatus("idle"));
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
