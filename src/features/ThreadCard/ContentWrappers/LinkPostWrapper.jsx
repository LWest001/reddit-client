import { Box } from "@mui/material";
import ThreadTitle from "../ThreadTitle";

function LinkPostWrapper({ url, threadTitle, thumbnail }) {
  return (
    <Box className="LinkPostWrapper">
      <a href={url}>
        <img
          src={thumbnail}
          alt={`Thumbnail for thread: ${threadTitle}`}
          className="thumbnail"
        />
        <ThreadTitle title={threadTitle} />
      </a>
    </Box>
  );
}
export default LinkPostWrapper;
