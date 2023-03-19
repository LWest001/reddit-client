import { Box } from "@mui/material";
import { useContext } from "react";
import { ThreadTitleContext } from "../ThreadCard";
import ThreadTitle from "../ThreadTitle";

function GalleryWrapper({ gallery, thumbnail }) {
  const threadTitle = useContext(ThreadTitleContext)
  return (
    <Box className="GalleryWrapper">
      <a href={gallery} target="_blank">
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
