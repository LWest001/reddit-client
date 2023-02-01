import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setView } from "../features/homepage/homepageSlice";

function SubredditLink({ subredditName, display }) {
  const dispatch = useDispatch();
  function handleClick() {
    dispatch(setView("subreddit"));
    dispatch(setStatus("idle"));
  }
  return (
    <Link to={`/r/${subredditName}`} onClick={handleClick}>
      {display}
    </Link>
  );
}

export default SubredditLink;
