import { Box } from "@mui/material";
import { useContext } from "react";
import { ThreadContentContext } from "../ThreadCard";
import ThreadTitle from "../ThreadTitle";

function LinkPostWrapper({ url, thumbnail }) {
  const { threadTitle } = useContext(ThreadContentContext);
  return (
    <Box className="LinkPostWrapper">
      <a href={url}>
        <img
          src={thumbnail}
          alt={`Thumbnail for thread: ${threadTitle}`}
          className="thumbnail"
        />
        <ThreadTitle />
      </a>
    </Box>
  );
}
export default LinkPostWrapper;
