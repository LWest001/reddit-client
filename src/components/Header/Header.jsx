import { useDispatch } from "react-redux";
import {
  Link as RouterLink,
  useNavigate,
  createSearchParams,
} from "react-router-dom";
import SortSelector from "../SortSelector/SortSelector";
import { setStatus as setHomepageStatus } from "../../features/ThreadList/threadListSlice";
import SearchBar from "../SearchBar";

import {
  AppBar,
  Toolbar,
  Icon,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import Logo from "/logoTransparent.png";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(setHomepageStatus("idle"));
    navigate("/");
    window.scrollTo(0, 0);
  };

  function handleSubmit(e) {
    e.preventDefault();
    const query = e.target.children[1].children[0].value;
    dispatch(setHomepageStatus("idle"));
    const params = { q: query };
    navigate({
      pathname: "/search",
      search: `?${createSearchParams(params)}`,
    });
    window.scrollTo(0, 0);
    e.target[0].value = "";
  }

  return (
    <AppBar className="Header">
      <Toolbar>
        <Stack
          className="AppBar-Main"
          direction="row"
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          <Button
            component={RouterLink}
            to="/"
            onClick={handleClick}
            sx={{ color: "primary.contrastText" }}
            variant="outlined"
          >
            <Stack
              direction="row"
              gap={0.5}
              sx={{ alignItems: "center", justifyContent: "center" }}
            >
              {/* <HomeIcon variant="headerIcon" /> */}
              <Icon component="img" src={Logo} fontSize="medium" />
              <Typography
                color="primary.contrastText"
                fontWeight="700"
                fontSize="1.5rem"
                sx={{
                  fontFamily: "Caveat, Lucida Handwriting, cursive",
                  textTransform: "none",
                }}
              >
                rLite
              </Typography>
            </Stack>
          </Button>
          <SortSelector />
        </Stack>
        <SearchBar handleSubmit={handleSubmit} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
