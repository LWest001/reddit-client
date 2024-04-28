import { Stack, Typography } from "@mui/material";
import SubredditLink from "../../components/SubredditLink";

function ThreadCardHeaderTitle({ subredditName, timestamp }) {
  return (
    <Stack
      direction="row"
      className="ThreadCardHeaderTitle"
      sx={{ justifyContent: "space-between" }}
    >
      <SubredditLink subredditName={subredditName} type="text" />
      <Typography>{timestamp}</Typography>
    </Stack>
  );
}
export default ThreadCardHeaderTitle;
