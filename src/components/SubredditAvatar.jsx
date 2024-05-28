import { Avatar, Skeleton } from "@mui/material";
import DefaultIcon from "/DefaultIcon.png";
import { useContext } from "react";
import { IconsContext } from "../features/ThreadList/ThreadList";

function SubredditAvatar({ subreddit }) {
  const icons = useContext(IconsContext);
  const icon = icons?.data?.[subreddit];

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
