import { Box } from "@mui/material";
import { useContext } from "react";
import { useState } from "react";
import ImageModal from "../../../components/ImageModal/ImageModal";
import generateImgSrcset from "../../../functions/generateSrcset";
import { ThreadContentContext } from "../ThreadCard";

function ImageWrapper({ image, link }) {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const { threadTitle } = useContext(ThreadContentContext);
  const imageSource = generateImgSrcset(image.previewSizeImage);
  const { srcset, src, sizes } = imageSource;
  console.log(image);
  return (
    <Box
      className="ImageWrapper"
      sx={{ display: "flex", flexDirection: "column", placeItems: "center" }}
    >
      <img
        srcSet={srcset}
        sizes={sizes}
        src={src}
        alt={`Image for thread: ${threadTitle}`}
        className="previewImage"
        onClick={handleOpenModal}
      />
      <ImageModal
        open={openModal}
        srcSet={srcset}
        sizes={sizes}
        src={image.fullSizeImage}
        handleClose={handleCloseModal}
        link={link}
      />
    </Box>
  );
}

export default ImageWrapper;
