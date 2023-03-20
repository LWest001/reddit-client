import { Box } from "@mui/material";
import { useContext } from "react";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ImageModal from "../../../components/ImageModal/ImageModal";
import { ThreadContentContext } from "../ThreadCard";

function ImageWrapper({ image, link }) {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const { threadTitle } = useContext(ThreadContentContext);

  return (
    <Box
      className="ImageWrapper"
      sx={{ display: "flex", flexDirection: "column", placeItems: "center" }}
    >
      <img
        src={image.previewSizeImage.url}
        height={image.previewSizeImage.height}
        width={image.previewSizeImage.width}
        // placeholderSrc={image.placeholderImage.url}
        // effect="blur"
        alt={`Image for thread: ${threadTitle}`}
        className="previewImage"
        onClick={handleOpenModal}
        // threshold={2000}
      />
      <ImageModal
        open={openModal}
        image={image.fullSizeImage}
        handleClose={handleCloseModal}
        link={link}
      />
    </Box>
  );
}

export default ImageWrapper;
