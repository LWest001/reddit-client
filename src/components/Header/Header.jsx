import {
  Link as RouterLink,
  useNavigate,
  createSearchParams,
  useParams,
  useSearchParams,
} from "react-router-dom";
import SortSelector from "../SortSelector/SortSelector";
import SearchBar from "../SearchBar";

import {
  AppBar,
  Toolbar,
  Icon,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  Stack,
  IconButton,
  Popover,
} from "@mui/material";
import Logo from "/logoTransparent.png";
import { forwardRef, useMemo, useState } from "react";
import HintBox from "../HintBox";
import SubredditInfo from "../SubredditInfo";
import ClockIcon from "@mui/icons-material/AccessTime";
import { isSmallScreen } from "../../functions/isSmallScreen";

const Header = forwardRef(function Header(props, ref) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [timeSelectAnchor, setTimeSelectAnchor] = useState(null);

  let [searchParams, setSearchParams] = useSearchParams();

  const time = searchParams.get("t");

  const { subredditName, threadTitle, sort } = useParams();
  const navigate = useNavigate();

  const handleClickLogo = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  function handleSort(e) {
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

  function handleCloseSearchhint() {
    setOpen(false);
    localStorage.setItem("hideSearchHint", true);
  }

  // Time Selector vars and handlers
  const timeSelectOpen = !!timeSelectAnchor;
  const anchorTop = useMemo(
    () => (isSmallScreen ? 56 : 64),
    [window.innerWidth]
  );
  const id = timeSelectOpen ? "simple-popover" : undefined;
  function handleToggle(_, values) {
    const query = searchParams.get("q");
    const params = { t: values };
    query ? setSearchParams({ q: query, ...params }) : setSearchParams(params);
    handleCloseClock();
  }

  function handleClickClock(e) {
    setTimeSelectAnchor(e.currentTarget);
  }

  function handleCloseClock() {
    setTimeSelectAnchor(null);
  }

  return (
    <>
      <AppBar className="Header" ref={ref}>
        <Toolbar sx={{ paddingLeft: [0, "24px"] }}>
          <Stack
            className="AppBar-Main"
            direction="row"
            sx={{ alignItems: "center", justifyContent: "center" }}
          >
            <Button
              component={RouterLink}
              to="/"
              onClick={handleClickLogo}
              sx={{ color: "primary.contrastText" }}
              variant="outlined"
            >
              <Stack
                direction="row"
                gap={0.5}
                sx={{ alignItems: "center", justifyContent: "center" }}
              >
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
            {sort === "top" && (
              <>
                <IconButton
                  sx={{ color: "white", marginLeft: ".6rem" }}
                  onClick={handleClickClock}
                >
                  <ClockIcon />
                </IconButton>
                <Popover
                  onClose={handleCloseClock}
                  id={id}
                  anchorEl={timeSelectAnchor}
                  open={timeSelectOpen}
                  anchorReference="anchorPosition"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  anchorPosition={{ left: 0, top: anchorTop }}
                >
                  <ToggleButtonGroup
                    size="small"
                    exclusive
                    sx={{
                      fontWeight: "bold",
                      width: "fit-content",
                    }}
                    onChange={handleToggle}
                    value={time}
                    color="secondary"
                  >
                    <ToggleButton value={"hour"}>Now</ToggleButton>
                    <ToggleButton value={"day"}>Day</ToggleButton>
                    <ToggleButton value={"week"}>Week</ToggleButton>
                    <ToggleButton value={"month"}>Month</ToggleButton>
                    <ToggleButton value={"year"}>Year</ToggleButton>
                    <ToggleButton value={"all"}>all time</ToggleButton>
                  </ToggleButtonGroup>
                </Popover>
              </>
            )}
          </Stack>
          <SearchBar handleSubmit={handleSort} setOpen={setOpen} />
        </Toolbar>
        <HintBox
          horizontal="center"
          vertical="top"
          open={open}
          onClose={handleCloseSearchhint}
          message={
            'Enter "r/<Subreddit name>" to navigate to a subreddit, or any other term to search Reddit threads!'
          }
        />
      </AppBar>
      {subredditName && !threadTitle && (
        <SubredditInfo
          expandedState={[expanded, setExpanded]}
          headerHeight={ref.current?.offsetHeight}
        />
      )}
    </>
  );
});

export default Header;
