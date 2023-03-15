import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useParams } from "react-router-dom";
import { setStatus as setThreadListStatus } from "../features/ThreadList/threadListSlice";
import { setStatus as setThreadStatus } from "../features/Thread/threadSlice";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

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
  return (
    <FormControl>
      <InputLabel id="demo-simple-select-label">Sort</InputLabel>
      <Select
        className="SortSelector"
        name="SortSelector"
        onChange={handleChange}
        value={searchSort || sortType}
        label="Sort"
        sx={{ height: 32 }}
      >
        <MenuItem value="hot">
          <Typography>🔥hot</Typography>
        </MenuItem>
        <MenuItem value="new">
          <Typography>✨new</Typography>
        </MenuItem>
        <MenuItem value="top">
          <Typography>⬆️top</Typography>
        </MenuItem>
        <MenuItem value="rising">
          <Typography>📈rising</Typography>
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortSelector;
