import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Avatar, Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import {
  fetchIcon,
  selectIconBySubreddit,
} from "../features/ThreadList/threadListSlice";
import DefaultIcon from "/logoTransparent.png";
import { setStatus } from "../features/ThreadList/threadListSlice";
import { useEffect } from "react";

function SubredditAvatar({ subredditName }) {
  const dispatch = useDispatch();
  function handleClick() {
    dispatch(setStatus("idle"));
  }

  const icon = useSelector((state) =>
    selectIconBySubreddit(state, subredditName)
  );
  useEffect(() => {
    if (icon === undefined) {
      dispatch(fetchIcon(subredditName));
    }
  }, []);

  if (icon === "loading" || icon === undefined) {
    return (
      <Skeleton
        variant="circular"
        width={40}
        height={40}
        animation="wave"
        className={"subredditIcon"}
      />
    );
  }
  return (
    <Avatar
      src={icon || DefaultIcon}
      alt={`Avatar for subreddit r/${subredditName}`}
      component={Link}
      to={`/r/${subredditName}`}
      onClick={handleClick}
      className={"subredditIcon"}
      sx={{
        background: "linear-gradient(45deg, rgba(0, 0, 255, 0.267), white)",
      }}
    />
  );
}

export default SubredditAvatar;
