import { useNavigate, useSearchParams } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Box, FormControl, MenuItem, Select } from "@mui/material";
import HotIcon from "@mui/icons-material/LocalFireDepartment";
import TopIcon from "@mui/icons-material/ArrowUpward";
import NewIcon from "@mui/icons-material/AutoAwesome";
import RisingIcon from "@mui/icons-material/TrendingUp";

import SortSelectorMenuItem from "./SortSelectorMenuItem";
import { isSmallScreen } from "../../functions/isSmallScreen";
import { useCallback } from "react";

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

  const getRenderedVal = useCallback(
    (val) => {
      if (window.innerWidth <= 600) {
        switch (val) {
          case "hot":
            return (
              <Box display="flex">
                <HotIcon sx={{ color: "orange" }} />
              </Box>
            );
          case "new":
            return (
              <Box display="flex">
                <NewIcon sx={{ color: "gold" }} />
              </Box>
            );
          case "top":
            return (
              <Box display="flex">
                <TopIcon sx={{ color: "lightblue" }} />
              </Box>
            );
          case "rising":
            return (
              <Box display="flex">
                <RisingIcon sx={{ color: "springgreen" }} />
              </Box>
            );
          default:
            return val;
        }
      } else {
        switch (val) {
          case "hot":
            return (
              <Box display="flex" gap={1}>
                <HotIcon sx={{ color: "orange" }} /> HOT
              </Box>
            );
          case "new":
            return (
              <Box display="flex" gap={1}>
                <NewIcon sx={{ color: "gold" }} /> NEW
              </Box>
            );
          case "top":
            return (
              <Box display="flex" gap={1}>
                <TopIcon sx={{ color: "lightblue" }} /> TOP
              </Box>
            );
          case "rising":
            return (
              <Box display="flex" gap={1}>
                <RisingIcon sx={{ color: "springgreen" }} /> RISING
              </Box>
            );
          default:
            return val;
        }
      }
    },
    [window.innerWidth, isSmallScreen]
  );

  return (
    <FormControl size="medium" sx={{ marginLeft: 1 }}>
      <Select
        className="SortSelector"
        name="SortSelector"
        onChange={handleChange}
        value={searchSort || sort}
        variant="standard"
        size="medium"
        disableUnderline
        sx={{
          color: "primary.contrastText",
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(228, 219, 233, 0.25)",
            border: "none",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "1px rgba(228, 219, 233, 0.25)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "1px rgba(228, 219, 233, 0.25)",
          },
        }}
        renderValue={(val) => {
          return getRenderedVal(val);
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
