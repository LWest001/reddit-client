import { Box } from "@mui/material";
import parseMarkdownText from "../../functions/parseMarkdownText";

function ThreadTitle({ title }) {
  const titleTextHTML = parseMarkdownText(`${title}`);
  return <Box>{titleTextHTML}</Box>;
}

export default ThreadTitle;
