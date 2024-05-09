import { Stack } from "@mui/material";
import SubredditLink from "../../components/SubredditLink";
import TimestampChip from "../../components/Chips/TimestampChip";

function SearchCardHeaderTitle({ subreddit, timestamp }) {
  return (
    <Stack
      direction="row"
      sx={{ justifyContent: "space-between" }}
      className="no-underline"
    >
      <SubredditLink subreddit={subreddit} type="text" />
      <TimestampChip timestamp={timestamp} />
    </Stack>
  );
}
export default SearchCardHeaderTitle;
