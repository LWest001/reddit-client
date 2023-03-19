import { Avatar, Box } from "@mui/material";
import replaceEntities from "../../functions/replaceEntities";

function FlairBox({ flair }) {
  const textColor = flair.textColor === "light" ? "white" : "black";
  return (
    <Box className="postFlairContainer">
      <span
        className="postFlair"
        style={{ backgroundColor: flair?.backgroundColor, color: textColor }}
      >
        {replaceEntities(flair?.text)}
      </span>
    </Box>
  );
}

export default FlairBox;
