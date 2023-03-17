import {Stack, Typography } from "@mui/material";

function ThreadCardSubheader({ author, timestamp }) {
  return (
    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
      <Typography>Posted by u/{author}</Typography>
      
      <Typography>{timestamp}</Typography>
    </Stack>
  );
}

export default ThreadCardSubheader;
