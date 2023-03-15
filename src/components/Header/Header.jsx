import { useDispatch, useSelector } from "react-redux";
import {
  Link as RouterLink,
  useNavigate,
  createSearchParams,
} from "react-router-dom";
import SortSelector from "../SortSelector/SortSelector";
import {
  setStatus as setHomepageStatus,
  selectQuery,
} from "../../features/ThreadList/threadListSlice";
import SearchBar from "../SearchBar";

import { AppBar, IconButton, Toolbar, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";

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
    <AppBar className="Header">
      <Toolbar>
        <Box
          className="AppBar-Main"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <IconButton
            size="large"
            component={RouterLink}
            to="/"
            onClick={handleClick}
          >
            <HomeIcon variant="headerIcon" />
          </IconButton>
          {/*
            <IconButton size="large">
              <MenuIcon variant="headerIcon"/>
            </IconButton>
          */}
          <SortSelector />
        </Box>
        <SearchBar handleSubmit={handleSubmit} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
