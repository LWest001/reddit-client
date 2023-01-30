import { useDispatch } from "react-redux";
import { redirect, useNavigate, useSearchParams } from "react-router-dom";
import { setSortType } from "./sortSelectorSlice";
import { useParams } from "react-router-dom";
import { setStatus } from "../../features/homepage/homepageSlice";
import { setStatus as setThreadStatus } from "../../features/thread/threadSlice";

const SortSelector = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sortType, subredditName, threadTitle, redditId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q");

  const handleChange = ({ target }) => {
    dispatch(setSortType(target.value));
    if (!threadTitle) {
      dispatch(setStatus("idle"));
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
  };
  return (
    <select
      className="SortSelector"
      name="SortSelector"
      onChange={handleChange}
      value={sortType}
    >
      <option value="best">👍Best</option>
      <option value="hot">🔥Hot</option>
      <option value="new">✨New</option>
      <option value="top">⬆️Top</option>
      <option value="rising">⤴️Rising</option>
    </select>
  );
};

export default SortSelector;
