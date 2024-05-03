import { Link } from "react-router-dom";
import { Typography, useTheme } from "@mui/material";

function SubredditLink({ subreddit }) {
  const theme = useTheme();
  return (
    <Typography
      component={Link}
      to={`/r/${subreddit}`}
      color={theme.palette.text.primary}
    >
      r/{subreddit}
    </Typography>
  );
}

export default SubredditLink;
