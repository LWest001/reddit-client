import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { Stack } from "@mui/material";

function CommentHeaderText({ timestamp, score, handleCollapse, id }) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      onClick={handleCollapse}
      id={`CommentHeaderText-${id}`}
      width="100%"
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
