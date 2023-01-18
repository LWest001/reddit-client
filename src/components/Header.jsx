import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SortSelector from "./SortSelector";
import { sortType } from "../features/homepage/homepageSlice";
import { useEffect } from "react";
import { selectSortType } from "../features/homepage/homepageSlice";
import "./Header.css";

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
            <Link to="/search">🔍</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
