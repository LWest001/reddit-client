import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Avatar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectIcons } from "../features/ThreadList/threadListSlice";
import DefaultIcon from "/logoTransparent.png";
import { setStatus } from "../features/Thread/threadSlice";

function SubredditLink({ subredditName, type, cardType }) {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(setStatus("idle"));
  }

  const icon = useSelector(selectIcons)[subredditName];
  if (type === "avatar") {
    return (
      <Avatar
        src={icon || DefaultIcon}
        alt={`Avatar for subreddit r/${subredditName}`}
        component={Link}
        to={`/r/${subredditName}`}
        onClick={handleClick}
        className={`subredditIcon ${cardType}`}
      />
    );
  }
  if (type === "text") {
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
}

export default SubredditLink;
