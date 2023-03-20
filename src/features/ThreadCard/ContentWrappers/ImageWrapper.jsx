import { Box } from "@mui/material";
import { useContext } from "react";
import { useState } from "react";
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
        alt={`Image for thread: ${threadTitle}`}
        className="previewImage"
        onClick={handleOpenModal}
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
