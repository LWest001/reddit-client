import { Stack } from "@mui/material";
import SubredditLink from "../../components/SubredditLink";

function SearchCardHeaderTitle({ subredditName, timestamp }) {
  return (
    <Stack
      direction="row"
      sx={{ justifyContent: "space-between" }}
      className="no-underline"
    >
      <SubredditLink subredditName={subredditName} type="text" />
      <span className="timestamp">{timestamp}</span>
    </Stack>
  );
}
export default SearchCardHeaderTitle;
