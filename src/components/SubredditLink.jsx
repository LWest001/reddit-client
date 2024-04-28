import { Link } from "react-router-dom";
import { Typography, useTheme } from "@mui/material";

function SubredditLink({ subredditName }) {
  const theme = useTheme();
  return (
    <Typography component={Link} to={`/r/${subredditName}`} color={theme.palette.text.primary}>
      r/{subredditName}
    </Typography>
  );
}

export default SubredditLink;
