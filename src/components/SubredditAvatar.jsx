import { Avatar, Skeleton } from "@mui/material";
import DefaultIcon from "/DefaultIcon.png";
import { useContext, useRef } from "react";
import { IconsContext } from "../features/ThreadList/ThreadList";

function SubredditAvatar({ subreddit, crosspost }) {
  const icons = useContext(IconsContext);
  const icon = icons?.data?.[subreddit] || localStorage.getItem(subreddit);
  const avatar = useRef();
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
      ref={avatar}
      alt={`Avatar for subreddit r/${subreddit}`}
      className={"subredditIcon"}
      sx={{
        background: "linear-gradient(45deg, rgba(0, 0, 255, 0.267), white)",
        width: crosspost && 20,
        height: crosspost && 20,
      }}
    >
      <img
        src={DefaultIcon}
        alt={`Avatar for r/${subreddit}`}
        height={avatar.current?.offsetHeight}
      />
    </Avatar>
  );
}

export default SubredditAvatar;
