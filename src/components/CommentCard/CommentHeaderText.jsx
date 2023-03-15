import { ThumbUp } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";

function CommentHeaderText({ timestamp, score }) {
  return (
    <Stack direction="row" justifyContent="space-between">
      {timestamp}
      <Stack direction="row" gap={1}>
        <ThumbUp color="secondary" />
        {score}
      </Stack>
    </Stack>
  );
}

export default CommentHeaderText;
