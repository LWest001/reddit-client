import { Box } from "@mui/material";
import ThreadTitle from "../ThreadTitle";

function GalleryWrapper({gallery, threadTitle, thumbnail}) {
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
      <ThreadTitle title={threadTitle} />
    </Box>
  );
}
export default GalleryWrapper;
