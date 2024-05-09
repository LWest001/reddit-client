import { Stack } from "@mui/material";
import SubredditChip from "../../components/Chips/SubredditChip";
import AuthorChip from "../../components/Chips/AuthorChip";
import { useParams } from "react-router-dom";

function ThreadCardHeaderTitle({ subreddit, author }) {
  const { subreddit: subredditParam, redditId } = useParams();
  const isSubreddit = !!subredditParam && !redditId;
  return (
    <Stack
      direction="row"
      className="ThreadCardHeaderTitle"
      sx={{ justifyContent: "space-between" }}
      flexWrap={"wrap"}
      gap={0.5}
      alignItems={"center"}
    >
      {!isSubreddit && <SubredditChip subreddit={subreddit} />}
      {window.innerWidth && <AuthorChip author={author} />}
    </Stack>
  );
}
export default ThreadCardHeaderTitle;
