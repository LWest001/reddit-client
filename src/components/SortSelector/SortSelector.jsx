import { useNavigate, useSearchParams } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FormControl, MenuItem, Select } from "@mui/material";
import HotIcon from "@mui/icons-material/LocalFireDepartment";
import TopIcon from "@mui/icons-material/ArrowUpward";
import NewIcon from "@mui/icons-material/AutoAwesome";
import RisingIcon from "@mui/icons-material/TrendingUp";

import SortSelectorMenuItem from "./SortSelectorMenuItem";

const SortSelector = () => {
  const navigate = useNavigate();
  const { sort = "hot", subredditName, threadTitle, redditId } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const searchSort = searchParams.get("sort");

  const handleChange = ({ target }) => {
    if (threadTitle) {
      navigate(
        `r/${subredditName}/comments/${redditId}/${threadTitle}/${target.value}`
      );
    } else if (subredditName) {
      navigate(`r/${subredditName}/${target.value}`);
    } else if (query) {
      navigate(`search?q=${query}&sort=${target.value}`);
    } else {
      navigate(`/${target.value}`);
    }
    window.scrollTo(0, 0);
  };

  return (
    <FormControl size="small">
      <Select
        className="SortSelector"
        name="SortSelector"
        onChange={handleChange}
        notched={false}
        value={searchSort || sort}
        // label="SORT"
        sx={{
          color: "primary.contrastText",
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(228, 219, 233, 0.25)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(228, 219, 233, 0.25)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(228, 219, 233, 0.25)",
          },
          ".MuiSvgIcon-root ": {
            fill: "white !important",
          },
        }}
      >
        <MenuItem value="hot">
          <SortSelectorMenuItem
            text="hot"
            icon={<HotIcon sx={{ color: "orange" }} />}
          />
        </MenuItem>
        <MenuItem value="new">
          <SortSelectorMenuItem
            text="new"
            icon={<NewIcon sx={{ color: "gold" }} />}
          />
        </MenuItem>
        <MenuItem value="top">
          <SortSelectorMenuItem
            text="top"
            icon={<TopIcon sx={{ color: "lightblue" }} />}
          />
        </MenuItem>
        <MenuItem value="rising">
          <SortSelectorMenuItem
            text="rising"
            icon={<RisingIcon sx={{ color: "springgreen" }} />}
          />
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortSelector;
