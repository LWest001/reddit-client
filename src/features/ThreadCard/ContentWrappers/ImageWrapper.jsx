import { Box } from "@mui/material";
import { useContext } from "react";
import { useState } from "react";
import ImageModal from "../../../components/ImageModal/ImageModal";
import generateImgSrcset from "../../../functions/generateSrcset";
import { ThreadContentContext } from "../ThreadCard";

function ImageWrapper({ preview, url, link }) {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const { threadTitle } = useContext(ThreadContentContext);
  const imageSource = generateImgSrcset(preview.images[0].resolutions);
  const { srcset, src, sizes } = imageSource;
  return (
    <Box
      className="ImageWrapper"
      sx={{
        display: "flex",
        flexDirection: "column",
        placeItems: "center",
        img: {
          maxHeight: "80vh",
        },
      }}
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
        src={url}
        handleClose={handleCloseModal}
        link={link}
      />
    </Box>
  );
}

export default ImageWrapper;
