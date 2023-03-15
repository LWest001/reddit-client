import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useParams } from "react-router-dom";
import { setStatus as setThreadListStatus } from "../../features/ThreadList/threadListSlice";
import { setStatus as setThreadStatus } from "../../features/Thread/threadSlice";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Box,
} from "@mui/material";

import {
  ArrowDropDown,
  LocalFireDepartment as HotIcon,
  ArrowUpward as TopIcon,
  AutoAwesome as NewIcon,
  TrendingUp as RisingIcon,
} from "@mui/icons-material";
import SortSelectorMenuItem from "./SortSelectorMenuItem";

const SortSelector = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    sortType = "hot",
    subredditName,
    threadTitle,
    redditId,
  } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q");
  const searchSort = searchParams.get("sort");

  const handleChange = ({ target }) => {
    if (!threadTitle) {
      dispatch(setThreadListStatus("idle"));
    }

    if (threadTitle) {
      dispatch(setThreadStatus("idle"));
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

  function ArrowIcon() {
    return <ArrowDropDown sx={{ color: "white" }} />;
  }

  return (
    <FormControl>
      <Select
        className="SortSelector"
        name="SortSelector"
        onChange={handleChange}
        value={searchSort || sortType}
        // label="SORT"
        variant="outlined"
        IconComponent={ArrowIcon}
        sx={{ height: 32, color: "primary.contrastText" }}
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
