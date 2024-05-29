import {
  Link as RouterLink,
  useNavigate,
  createSearchParams,
  useParams,
  useSearchParams,
} from "react-router-dom";
import SortSelector from "../SortSelector/SortSelector";
import SearchBar from "../SearchBar";
import SettingsIcon from "@mui/icons-material/Settings";
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
  Menu,
  MenuItem,
  Switch,
  styled,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Logo from "/logoTransparent.png";
import { forwardRef, useContext, useEffect, useMemo, useState } from "react";
import HintBox from "../HintBox";
import SubredditInfo from "../SubredditInfo";
import ClockIcon from "@mui/icons-material/AccessTime";
import { isSmallScreen } from "../../functions/isSmallScreen";
import { ColorModeContext } from "../../app/App";

const Header = forwardRef(function Header(props, ref) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [timeSelectAnchor, setTimeSelectAnchor] = useState(null);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [loadNew, setLoadNew] = useState(
    localStorage.getItem("loadNew") !== "false"
  );
  const openSettings = Boolean(anchorEl);

  useEffect(() => localStorage.setItem("loadNew", loadNew), [loadNew]);

  const handleClickSettings = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSettings = () => {
    setAnchorEl(null);
  };

  let [searchParams, setSearchParams] = useSearchParams();

  const time = searchParams.get("t");

  const { subreddit, threadTitle, sort } = useParams();
  const navigate = useNavigate();

  const handleClickLogo = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  function handleSort(e) {
    e.preventDefault();
    e.target[0].blur();
    const SortSelector = document.querySelector(".SortSelector");
    SortSelector.style.display = "block";
    const query = value;
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
    setValue(null);
    setInputValue("");
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

  function handleToggleColormode() {
    toggleColorMode();
  }

  function handleChangeLoadnew() {
    setLoadNew((prev) => {
      // localStorage.setItem("loadNew", !prev);
      return !prev;
    });
  }

  const { toggleColorMode, mode } = useContext(ColorModeContext);

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
          <SearchBar
            handleSubmit={handleSort}
            setOpen={setOpen}
            value={value}
            setValue={setValue}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />

          <IconButton
            color="inherit"
            sx={{ ml: 1 }}
            aria-controls={openSettings ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openSettings ? "true" : undefined}
            onClick={handleClickSettings}
          >
            <SettingsIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openSettings}
            onClose={handleCloseSettings}
            sx={{ maxWidth: "20rem" }}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem>
              <ColorToggle
                onChange={handleToggleColormode}
                checked={mode === "dark"}
              />
            </MenuItem>
            <MenuItem>
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{ mr: 1 }}
                    checked={loadNew}
                    onChange={handleChangeLoadnew}
                  />
                }
                label={"Load new subreddit icons"}
              />
            </MenuItem>
            <Typography mx={1} fontSize={"small"}>
              Disabling the above feature helps to avoid request limit issues.
              Icons saved to your device will still display.
            </Typography>
          </Menu>
        </Toolbar>
        <HintBox
          horizontal="center"
          vertical="top"
          open={open}
          onClose={handleCloseSearchhint}
          message='Enter "r/<Subreddit name>" to navigate to a subreddit, or any other term to search Reddit threads!'
        />
      </AppBar>
      {subreddit && !threadTitle && (
        <SubredditInfo
          expandedState={[expanded, setExpanded]}
          headerHeight={ref.current?.offsetHeight}
        />
      )}
    </>
  );
});

const ColorToggle = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    // margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

export default Header;
