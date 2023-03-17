import { Box } from "@mui/material";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ImageModal from "../../../components/ImageModal/ImageModal";

function ImageWrapper({ image, threadTitle, link }) {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  return (
    <Box
      className="ImageWrapper"
      sx={{ display: "flex", flexDirection: "column", placeItems: "center" }}
    >
      <LazyLoadImage
        src={image.previewSizeImage.url}
        height={image.previewSizeImage.height}
        width={image.previewSizeImage.width}
        placeholderSrc={image.placeholderImage.url}
        effect="blur"
        alt={`Image for thread: ${threadTitle}`}
        className="previewImage"
        onClick={handleOpenModal}
      />
      <ImageModal
        open={openModal}
        image={image.fullSizeImage}
        handleClose={handleCloseModal}
        title={threadTitle}
        link={link}
      />
    </Box>
  );
}

export default ImageWrapper;
