import { Typography } from "@mui/material";
import { useContext } from "react";
import parseMarkdownText from "../../functions/parseMarkdownText";
import FlairBox from "./FlairBox";
import { ThreadTitleContext } from "./ThreadCard";

function ThreadTitle({ flair }) {
  const title = useContext(ThreadTitleContext);
  const titleTextHTML = parseMarkdownText(`${title}`);

  return (
    <Typography className="ThreadTitle" sx={{ py: 1 }}>
      {flair?.text && <FlairBox flair={flair} />}
      {titleTextHTML}
    </Typography>
  );
}

export default ThreadTitle;
