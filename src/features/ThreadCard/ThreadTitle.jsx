import { Box } from "@mui/material";
import { useContext } from "react";
import parseMarkdownText from "../../functions/parseMarkdownText";
import FlairBox from "./FlairBox";
import { ThreadContentContext } from "./ThreadCard";
import { getFlair } from "../../functions/getFlair";

function ThreadTitle() {
  const data = useContext(ThreadContentContext);
  const flair = getFlair(data);
  const { title } = data;
  const titleTextHTML = parseMarkdownText(`${title}`);

  return (
    <Box className="ThreadTitle" sx={{ py: 1 }}>
      {flair?.text && <FlairBox />}
      {titleTextHTML}
    </Box>
  );
}

export default ThreadTitle;
