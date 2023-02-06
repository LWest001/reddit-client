import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, createSearchParams } from "react-router-dom";
import SortSelector from "../SortSelector";
import {
  setStatus as setHomepageStatus,
  setQuery,
  selectQuery,
} from "../../features/ThreadList/threadListSlice";
import "./Header.css";
import home from "../../assets/home.svg";

const Header = () => {
  const query = useSelector(selectQuery);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(setHomepageStatus("idle"));
    navigate("/");
    window.scrollTo(0, 0);
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(setHomepageStatus("idle"));
    const params = { q: query };
    navigate({
      pathname: "/search",
      search: `?${createSearchParams(params)}`,
    });
    window.scrollTo(0, 0);
    document.querySelector("#searchInput").blur();

    e.target[0].value = "";
  }

  return (
    <header className="Header">
      <nav>
        <ul>
          <li>
            <Link to="/" onClick={handleClick}>
              <button className="homeButton button">
                <img src={home} alt="home button" className="icon" />
              </button>
            </Link>
          </li>
          <li>
            <Link to="/">
              <button className="burgerLines button">
                <div className="burgerLine"></div>
                <div className="burgerLine"></div>
                <div className="burgerLine"></div>
              </button>
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
                placeholder="Search"
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
