import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

function SubredditLink({ subredditName }) {
  return (
    <Typography component={Link} to={`/r/${subredditName}`}>
      r/{subredditName}
    </Typography>
  );
}

export default SubredditLink;
