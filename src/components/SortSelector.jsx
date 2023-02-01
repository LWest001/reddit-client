import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useParams } from "react-router-dom";
import { setStatus as setThreadListStatus } from "../features/ThreadList/threadListSlice";
import { setStatus as setThreadStatus } from "../features/Thread/threadSlice";

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
    <select
      className="SortSelector"
      name="SortSelector"
      onChange={handleChange}
      value={sortType}
    >
      <option value="hot">🔥hot</option>
      <option value="new">✨new</option>
      <option value="top">⬆️top</option>
      <option value="rising">📈rising</option>
    </select>
  );
};

export default SortSelector;
