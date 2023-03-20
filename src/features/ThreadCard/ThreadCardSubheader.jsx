import { Stack, Typography } from "@mui/material";

function ThreadCardSubheader({ author, timestamp, cardType }) {
  return (
    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
      <Typography>Posted by u/{author}</Typography>
      {cardType === "subreddit" && <Typography>{timestamp}</Typography>}
    </Stack>
  );
}

export default ThreadCardSubheader;
