import { Stack, Typography } from "@mui/material";
import UpvoteChip from "../UpvoteChip";

function CommentHeaderText({ timestamp, score, handleCollapse, id }) {
  return (
    <Stack
      direction="row"
      justifyContent="end"
      onClick={handleCollapse}
      id={`CommentHeaderText-${id}`}
      width="100%"
      alignItems={"center"}
      gap={1}
    >
      <Typography fontSize="small">{timestamp}</Typography>
      <UpvoteChip score={score} />
    </Stack>
  );
}

export default CommentHeaderText;
