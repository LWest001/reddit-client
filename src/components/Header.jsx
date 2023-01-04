import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="Header">
      <h1>Reddit Client</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">🏠</Link>
          </li>
          <li>
            <Link to="/">🍔</Link>
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
