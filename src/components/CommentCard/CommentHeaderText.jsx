import { Stack } from "@mui/material";
import UpvoteChip from "../Chips/UpvoteChip";
import TimestampChip from "../Chips/TimestampChip";

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
      <TimestampChip timestamp={timestamp} />
      <UpvoteChip score={score} />
    </Stack>
  );
}

export default CommentHeaderText;
