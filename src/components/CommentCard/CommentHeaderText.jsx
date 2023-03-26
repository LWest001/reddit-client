import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { Stack } from "@mui/material";

function CommentHeaderText({ timestamp, score, handleCollapse, id, isOp }) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      onClick={handleCollapse}
      id={`CommentHeaderText-${id}`}
    >
      <span>{timestamp}</span>
      <Stack direction="row" gap={1}>
        <ThumbUpOutlinedIcon />
        {score}
      </Stack>
    </Stack>
  );
}

export default CommentHeaderText;
