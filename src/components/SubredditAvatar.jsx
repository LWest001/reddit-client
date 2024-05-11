import { useDispatch } from "react-redux";
import { Avatar, Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import {
  fetchIcon,
  selectIconBySubreddit,
} from "../features/ThreadList/threadListSlice";
import DefaultIcon from "/DefaultIcon.png";
import { useEffect } from "react";

function SubredditAvatar({ subreddit }) {
  const dispatch = useDispatch();

  let icon = useSelector((state) => selectIconBySubreddit(state, subreddit));

  useEffect(() => {
    if (icon === undefined || icon === null) {
      dispatch(fetchIcon(subreddit));
    }
  }, [subreddit]);

  if (icon === "loading") {
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
      src={icon}
      alt={`Avatar for subreddit r/${subreddit}`}
      className={"subredditIcon"}
      sx={{
        background: "linear-gradient(45deg, rgba(0, 0, 255, 0.267), white)",
        // height: "100%",
        // width: "auto",
      }}
    >
      <img src={DefaultIcon} alt={`Avatar for r/${subreddit}`} />
    </Avatar>
  );
}

export default SubredditAvatar;
