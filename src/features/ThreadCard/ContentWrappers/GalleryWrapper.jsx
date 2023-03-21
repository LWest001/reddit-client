import {
  Box,
  Button,
  MobileStepper,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import generateImgSrcset from "../../../functions/generateSrcset";
import ThreadTitle from "../ThreadTitle";

function GalleryWrapper({ galleryData, galleryCaptions }) {
  const theme = useTheme();

  const steps = [];

  for (let image in galleryData) {
    steps.push(generateImgSrcset(galleryData[image].p, "gallery"));
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
      <ThreadTitle />
      <Box
        className="carouselContainer"
        sx={{
          maxWidth: "100%",
          maxHeight: "80vh",
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
            srcSet={steps[activeStep].srcset}
            sizes={steps[activeStep].sizes}
            src={steps[activeStep].src}
            style={{ maxHeight: "60vh" }}
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
              {theme.direction === "rtl" ? "<" : ">"}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? "> " : "<"}
              Back
            </Button>
          }
        />
      </Box>
    </Box>
  );
}
export default GalleryWrapper;
