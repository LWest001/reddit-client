import SearchIcon from "@mui/icons-material/Search";
import { styled, Autocomplete, TextField } from "@mui/material";
import TopSubs from "../assets/subreddits.json";
import { useSearchParams } from "react-router-dom";
import { isSmallScreen } from "../functions/isSmallScreen";
import { useQuery } from "@tanstack/react-query";
import { getSubreddits } from "../api";
import debounce from "lodash.debounce";
import { useEffect, useMemo } from "react";
import { getSetting } from "../functions/getSetting";


const Search = styled("form")(({ theme }) => ({
  // position: "relative",
  // marginLeft: theme.spacing(2),
  width: "100%",
  display: "flex",
  alignItems: "center",
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

function SearchBar({
  handleSubmit,
  setOpen,
  value,
  setValue,
  inputValue,
  setInputValue,
  hideOptions,
}) {
  //debounced used to prevent making an api request on every keystroke
  const handleChange = (_, newValue) => setValue(newValue);
  const handleInputChange = (_, newInputValue) => setInputValue(newInputValue);
  const debouncedChange = useMemo(() => {
    return debounce(handleChange, 1000);
  }, []);
  const debouncedInputChange = useMemo(() => {
    return debounce(handleInputChange, 1000);
  }, []);

  // Clean up side effects from debounce when component unmounst
  useEffect(() => {
    return () => {
      debouncedChange.cancel();
      debouncedInputChange.cancel();
    };
  });

  const srSearchEnabled = inputValue
    ? !!(inputValue?.substring(0, 2) === "r/") &&
      Boolean(inputValue?.substring(2))
    : false;

  const { data, isLoading } = useQuery({
    queryFn: () => getSubreddits(inputValue ? inputValue?.substring(2) : ""),
    queryKey: [{ subreddits: inputValue?.substring(2) }],
    enabled: srSearchEnabled,
  });

  function hideSearchHint() {
    return getSetting("hideSearchHint");
  }

  const currentQuery = useSearchParams()[0].get("q");

  return (
    <Search onSubmit={handleSubmit} key="form">
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledAutocomplete
        freeSolo
        value={value}
        onChange={handleChange}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onFocus={() => {
          if (isSmallScreen) {
            const SortSelector = document.querySelector(".SortSelector");
            const SettingsButton = document.querySelector(".SettingsButton");
            const SearchWithinChip =
              document.querySelector(".SearchWithinChip");
            SortSelector.style.display = "none";
            SettingsButton.style.display = "none";
            SearchWithinChip.style.display = "none";
          }
          if (!(hideSearchHint() === "true")) {
            setOpen(true);
          }
        }}
        onBlur={() => {
          if (isSmallScreen) {
            const SortSelector = document.querySelector(".SortSelector");
            const SettingsButton = document.querySelector(".SettingsButton");
            const SearchWithinChip =
              document.querySelector(".SearchWithinChip");
            SortSelector.style.display = "block";
            SettingsButton.style.display = "flex";
            SearchWithinChip.style.display = "flex";
          }
        }}
        autoComplete
        filterOptions={(x) => x}
        options={
          hideOptions
            ? []
            : data?.children
            ? [...data.children.map((sub) => sub.data.display_name_prefixed)]
            : TopSubs.names.map((option) => `r/${option}`)
        }
        key="autocomplete"
        loading={isLoading}
        renderInput={(params) => (
          <TextField
            key="textfield"
            {...params}
            placeholder={currentQuery || "Search"}
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
