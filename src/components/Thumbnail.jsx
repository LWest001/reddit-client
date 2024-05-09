import { Box } from "@mui/material";
import React from "react";
import replaceEntities from "../functions/replaceEntities";

const Thumbnail = ({ image, alt }) => {
  return (
    <Box
      bgcolor={"white"}
      height="min-content"
      p={0}
      display="flex"
      className="thumbnail"
    >
      <img
        src={replaceEntities(image)}
        alt={alt}
        width="96px"
        // height="auto"
      />
    </Box>
  );
};

export default Thumbnail;
