import { Box, Typography } from "@mui/material";
import parseMarkdownText from "../../functions/parseMarkdownText";
import FlairBox from "./FlairBox";

function ThreadTitle({ title, flair }) {
  const titleTextHTML = parseMarkdownText(`${title}`);
  return (
    <Typography className="ThreadTitle">
      {flair?.text && <FlairBox flair={flair} />}
      {titleTextHTML}
    </Typography>
  );
}

export default ThreadTitle;
