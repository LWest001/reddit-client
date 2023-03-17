import { Box } from "@mui/material";
import parseMarkdownText from "../../functions/parseMarkdownText";
import FlairBox from "./FlairBox";

function ThreadTitle({ title, flair }) {
  const titleTextHTML = parseMarkdownText(`${title}`);
  return (
    <Box className="ThreadTitle">
      {flair?.text && <FlairBox flair={flair} />}
      {titleTextHTML}
    </Box>
  );
}

export default ThreadTitle;
