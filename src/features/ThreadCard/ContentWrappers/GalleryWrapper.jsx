import { Box } from "@mui/material";
import { useContext } from "react";
import { ThreadContentContext } from "../ThreadCard";
import ThreadTitle from "../ThreadTitle";

function GalleryWrapper({ gallery, thumbnail }) {
  const { threadTitle } = useContext(ThreadContentContext);
  return (
    <Box className="GalleryWrapper">
      <a href={gallery} target="_blank" rel="noreferrer">
        <Box className="galleryThumbnailBox">
          <img
            className="thumbnail"
            src={thumbnail}
            alt={`Thumbnail for thread: ${threadTitle}`}
          />
          View gallery ➡️
        </Box>
      </a>
      <ThreadTitle />
    </Box>
  );
}
export default GalleryWrapper;
