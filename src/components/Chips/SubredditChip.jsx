import { Box, Button, Typography } from "@mui/material";
import SubredditAvatar from "../SubredditAvatar";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ColorModeContext } from "../../app/App";
import FlairBox from "../../features/ThreadCard/FlairBox";

const SubredditChip = ({ subreddit, crosspost }) => {
  const { mode } = useContext(ColorModeContext);
  return (
    <Box display={"flex"} alignItems={"center"}>
      <FlairBox crosspost />
      <Button
        sx={{
          display: "flex",
          height: 40,
          textTransform: "none",
          gap: 1,
          padding: "0 1rem 0 0",
          borderTopLeftRadius: "100px",
          borderBottomLeftRadius: "100px",
        }}
        component={Link}
        to={`/r/${subreddit}`}
      >
        <SubredditAvatar
          subreddit={subreddit}
          alt="Subreddit avatar"
          crosspost={crosspost}
        />
        <Typography
          sx={{ textDecoration: "none" }}
          fontSize="large"
          color={mode === "light" ? "#000" : "white !important"}
        >
          r/{subreddit}
        </Typography>
      </Button>
    </Box>
  );
};

export default SubredditChip;
