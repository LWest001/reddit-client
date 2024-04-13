import { Box } from "@mui/material";
import { useContext } from "react";
import parseMarkdownText from "../../functions/parseMarkdownText";
import FlairBox from "./FlairBox";
import { ThreadContentContext } from "./ThreadCard";

function ThreadTitle() {
  const { title, link_flair_text, link_flair_richtext } =
    useContext(ThreadContentContext);
  const titleTextHTML = parseMarkdownText(`${title}`);

  return (
    <Box className="ThreadTitle" sx={{ py: 1 }}>
      {(link_flair_text || link_flair_richtext) && <FlairBox />}
      {titleTextHTML}
    </Box>
  );
}

export default ThreadTitle;
