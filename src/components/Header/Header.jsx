import {
  Link as RouterLink,
  useNavigate,
  createSearchParams,
} from "react-router-dom";
import SortSelector from "../SortSelector/SortSelector";
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
import { useState } from "react";
import HintBox from "../HintBox";

const Header = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  function handleSubmit(e) {
    e.preventDefault();
    const SortSelector = document.querySelector(".SortSelector");
    SortSelector.style.display = "block";
    const query =
      e.target.children[1].children[0].children[0].children[0].value;
    if (query.substring(0, 2) === "r/") {
      const spaceIndex = query.indexOf(" ");
      navigate(query.substring(0, spaceIndex >= 0 ? spaceIndex : query.length));
    } else {
      const params = { q: query };
      navigate({
        pathname: "/search",
        search: `?${createSearchParams(params)}`,
      });
    }
    window.scrollTo(0, 0);
  }

  const [open, setOpen] = useState(false);
  function handleClose() {
    setOpen(false);
    localStorage.setItem("hideSearchHint", true);
  }

  return (
    <AppBar className="Header">
      <Toolbar sx={{ paddingLeft: [0, "24px"] }}>
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
        <SearchBar handleSubmit={handleSubmit} setOpen={setOpen} />
      </Toolbar>
      <HintBox
        horizontal="center"
        vertical="top"
        open={open}
        onClose={handleClose}
        message={
          "Enter \"r/<Subreddit name>\" to navigate to a subreddit, or any other term to search Reddit threads!"
        }
      />
    </AppBar>
  );
};

export default Header;
