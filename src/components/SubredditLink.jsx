import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Avatar, Skeleton, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import {
  selectIconBySubreddit,
} from "../features/ThreadList/threadListSlice";
import DefaultIcon from "/logoTransparent.png";
import { setStatus } from "../features/ThreadList/threadListSlice";

function SubredditLink({ subredditName, type, cardType }) {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(setStatus("idle"));
  }

  const icon = useSelector((state) =>
    selectIconBySubreddit(state, subredditName)
  );
  if (type === "avatar") {
    if (icon === "loading" || icon === undefined) {
      return (
        <Skeleton
          variant="circular"
          width={40}
          height={40}
          animation="wave"
          className={`subredditIcon ${cardType}`}
        />
      );
    }
    return (
      cardType !== "subreddit" && (
        <Avatar
          src={icon || DefaultIcon}
          alt={`Avatar for subreddit r/${subredditName}`}
          component={Link}
          to={`/r/${subredditName}`}
          onClick={handleClick}
          className={`subredditIcon ${cardType}`}
          sx={{
            background: "linear-gradient(45deg, rgba(0, 0, 255, 0.267), white)",
          }}
        />
      )
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
