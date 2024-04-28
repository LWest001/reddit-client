import { Box, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import parseMarkdownText from "../../functions/parseMarkdownText";
import FlairBox from "./FlairBox";
import { ThreadContentContext } from "./ThreadCard";

function ThreadTitle() {
  const { title, link_flair_text, link_flair_richtext } =
    useContext(ThreadContentContext);
  const titleTextHTML = parseMarkdownText(`${title}`);
  const theme = useTheme();
  return (
    <Box className="ThreadTitle" sx={{ py: 1 }}>
      {(link_flair_text || link_flair_richtext) && <FlairBox />}
      <Typography color={theme.palette.text.primary}>
        {titleTextHTML}
      </Typography>
    </Box>
  );
}

export default ThreadTitle;
