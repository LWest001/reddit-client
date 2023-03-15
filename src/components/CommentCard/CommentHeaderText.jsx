import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { Stack } from "@mui/material";

function CommentHeaderText({ timestamp, score, handleCollapse }) {
  return (
    <Stack direction="row" justifyContent="space-between" onClick={handleCollapse}>
      {timestamp}
      <Stack direction="row" gap={1}>
        <ThumbUpOutlinedIcon />
        {score}
      </Stack>
    </Stack>
  );
}

export default CommentHeaderText;
