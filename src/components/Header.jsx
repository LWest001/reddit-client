import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SortSelector from "./SortSelector";
import { sortType } from "../features/homepage/homepageSlice";
import { useEffect } from "react";
import { selectSortType } from "../features/homepage/homepageSlice";
import "./Header.css";
import { query } from "../features/search/searchResultsSlice";
import { selectQuery } from "../features/search/searchResultsSlice";

const Header = () => {
  const selectedType = useSelector(selectSortType);
  useEffect(() => {
    if (selectedType === "best") {
      document.querySelector("select").selectedIndex = 0;
    }
  }, [selectedType]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(sortType("best"));
    navigate("best");
  };
  const handleChange = (e) => {
    dispatch(query(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target[0].value = "";
    dispatch(query(""));
  };

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
                onChange={handleChange}
              />
            </form>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
