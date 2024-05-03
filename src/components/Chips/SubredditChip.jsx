import { Button, Chip, Typography } from "@mui/material";
import SubredditAvatar from "../SubredditAvatar";
import { Link } from "react-router-dom";

const SubredditChip = ({ subreddit }) => {
  return (
    <Button
      sx={{ display: "flex",  height: 40, textTransform:"none", gap:1}}
      component={Link}
      to={`/r/${subreddit}`}
    >
      <SubredditAvatar subreddit={subreddit} alt="Subreddit avatar" />
      <Typography sx={{ textDecoration: "none" }} fontSize="large" color="white">r/{subreddit}</Typography>
    </Button>
  );
};

export default SubredditChip;
