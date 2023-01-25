import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, createSearchParams } from "react-router-dom";
import SortSelector from "./SortSelector";
import { useEffect } from "react";
import { selectSortType, setSortType } from "./sortSelectorSlice";
import { setStatus as setHomepageStatus, setQuery, selectQuery } from "../features/homepage/homepageSlice";
import "./Header.css";

const Header = () => {
  const selectedSort = useSelector(selectSortType);
  const query = useSelector(selectQuery);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedSort === "best") {
      document.querySelector("select").selectedIndex = 0;
    }
  }, [selectedSort]);

  const handleClick = () => {
    dispatch(setSortType("best"));
    dispatch(setHomepageStatus("idle"));
    navigate("/");
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(setHomepageStatus("idle"));
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
