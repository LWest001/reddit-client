import {
  Box,
  Button,
  MobileStepper,
  Typography,
  useTheme,
} from "@mui/material";
import { useContext, useState } from "react";
import generateImgSrcset from "../../../functions/generateSrcset";
import ThreadTitle from "../ThreadTitle";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import ImageModal from "../../../components/ImageModal/ImageModal";
import { ThreadContentContext } from "../ThreadCard";

function GalleryWrapper({ modal, onModalClick, imageHeight }) {
  const theme = useTheme();
  const data = useContext(ThreadContentContext);
  if (!data?.gallery_data) return <Typography>{data.title}</Typography>;
  const galleryCaptions = data.gallery_data.items;
  const galleryOrder = data.gallery_data.items.map((item) => item.media_id);
  const galleryData = data.media_metadata;

  const steps = [];
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  for (let image in galleryData) {
    const index = galleryOrder.findIndex((id) => id === galleryData[image].id);
    steps[index] = generateImgSrcset(galleryData[image].p, "gallery");
  }

  for (let i = 0; i < galleryCaptions.length; i++) {
    steps[i].caption = galleryCaptions[i]?.caption;
  }
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box className="GalleryWrapper">
      {!modal && <ThreadTitle />}
      <Box
        className="carouselContainer"
        sx={{
          maxWidth: "100%",
          maxHeight: modal ? `calc(${imageHeight}+20vh)` : "80vh",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            maxHeight: "100%",
            p: 2,
            m: "auto",
            textAlign: "center",
          }}
          className="CarouselImageContainer"
          component="figure"
        >
          <img
            onClick={modal ? onModalClick : handleOpenModal}
            srcSet={modal ? undefined : steps[activeStep].srcset}
            sizes={modal ? undefined : steps[activeStep].sizes}
            src={steps[activeStep].src}
            style={{
              maxHeight: modal ? imageHeight : "60vh",
              maxWidth: "100%",
            }}
            alt={`Image ${activeStep + 1}: "${steps[activeStep]?.caption}"`}
          />
          <Box
            component="figcaption"
            sx={{
              bgcolor: "rgba(0,0,0,0.5)",
            }}
          >
            <Typography color="white">{steps[activeStep]?.caption}</Typography>
          </Box>
        </Box>

        <MobileStepper
          sx={{ maxWidth: 600, width: "100%", margin: "auto" }}
          variant="text"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeftRoundedIcon />
              ) : (
                <KeyboardArrowRightRoundedIcon />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRightRoundedIcon />
              ) : (
                <KeyboardArrowLeftRoundedIcon />
              )}
              Back
            </Button>
          }
        />
      </Box>
      <ImageModal
        open={openModal}
        srcSet={steps[activeStep].srcset}
        sizes={steps[activeStep].sizes}
        src={steps[activeStep].src}
        handleClose={handleCloseModal}
        caption={steps[activeStep]?.caption}
      />
    </Box>
  );
}
export default GalleryWrapper;
