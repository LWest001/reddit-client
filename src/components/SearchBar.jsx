import SearchIcon from "@mui/icons-material/Search";
import { styled, Autocomplete, TextField } from "@mui/material";
import TopSubs from "../assets/subreddits.json";
import { useSearchParams } from "react-router-dom";
import { isSmallScreen } from "../functions/isSmallScreen";

function SearchBar({ handleSubmit, setOpen }) {
  const Search = styled("form")(({ theme }) => ({
    position: "relative",
    marginLeft: theme.spacing(2),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "auto",
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
  }));

  function hideSearchHint() {
    return localStorage.getItem("hideSearchHint");
  }

  const currentQuery = useSearchParams()[0].get("q");

  return (
    <Search onSubmit={(e) => handleSubmit(e)}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledAutocomplete
        freeSolo
        onFocus={() => {
          if (isSmallScreen) {
            const SortSelector = document.querySelector(".SortSelector");
            SortSelector.style.display = "none";
          }
          if (!(hideSearchHint() === "true")) {
            setOpen(true);
          }
        }}
        onBlur={() => {
          const SortSelector = document.querySelector(".SortSelector");
          SortSelector.style.display = "block";
        }}
        autoComplete
        options={TopSubs.names.map((option) => `r/${option}`)}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={currentQuery || "Search…"}
            variant="standard"
            InputProps={{
              ...params.InputProps,
              type: "search",
              endAdornment: <></>,
              sx: { color: "white" },
            }}
          />
        )}
      />
    </Search>
  );
}

export default SearchBar;
