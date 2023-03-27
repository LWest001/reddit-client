import SearchIcon from "@mui/icons-material/Search";
import {
  styled,
  alpha,
  InputBase,
  Autocomplete,
  TextField,
} from "@mui/material";
import TopSubs from "../assets/subreddits.json";

function SearchBar({ handleSubmit }) {
  const Search = styled("form")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: theme.spacing(2),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
    color: "inherit",
    "& .MuiAutocomplete-inputRoot .MuiAutocomplete-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
    "& 	.MuiAutocomplete-endAdornment": {
      display: "none",
    },
  }));

  return (
    <Search onSubmit={(e) => handleSubmit(e)}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledAutocomplete
        placeholder="Search…"
        freeSolo
        options={TopSubs.names.map((option) => `r/${option}`)}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search…"
            variant="standard"
            InputProps={{
              ...params.InputProps,
              type: "search",
              endAdornment: <></>,
            }}
          />
        )}
      />
    </Search>
  );
}

export default SearchBar;
