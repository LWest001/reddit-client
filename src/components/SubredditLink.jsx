import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Typography } from "@mui/material";
import { setStatus } from "../features/ThreadList/threadListSlice";

function SubredditLink({ subredditName }) {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(setStatus("idle"));
  }

  return (
    <Typography
      component={Link}
      to={`/r/${subredditName}`}
      onClick={handleClick}
    >
      r/{subredditName}
    </Typography>
  );
}

export default SubredditLink;
