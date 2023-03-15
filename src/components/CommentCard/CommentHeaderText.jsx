import { ThumbUp } from "@mui/icons-material";
import { Box } from "@mui/material";

function CommentHeaderText({ timestamp, score }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        gap: "1rem",
        alignItems: "center",
      }}
    >
      <Box>{timestamp}</Box>
      <Box>
        <ThumbUp />
        {score}
      </Box>
    </Box>
  );
}

export default CommentHeaderText;
