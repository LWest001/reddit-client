import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import parseMarkdownText from "../../functions/parseMarkdownText";
import FlairBox from "./FlairBox";
import { ThreadContentContext } from "./ThreadCard";

function ThreadTitle() {
  const { threadTitle, flair } = useContext(ThreadContentContext);
  const titleTextHTML = parseMarkdownText(`${threadTitle}`);

  return (
    <Box className="ThreadTitle" sx={{ py: 1 }}>
      {flair?.text && <FlairBox />}
      {titleTextHTML}
    </Box>
  );
}

export default ThreadTitle;
