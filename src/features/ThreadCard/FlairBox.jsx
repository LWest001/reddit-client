import { Avatar, Box } from "@mui/material";
import theme from "../../assets/theme";
import replaceEntities from "../../functions/replaceEntities";

function FlairBox({ flair }) {
  const textColor = flair.textColor === "light" ? "white" : "black";
  return (
    <Box className="postFlairContainer">
      <span
        className="postFlair"
        style={{ backgroundColor: flair?.backgroundColor || theme.palette.primary.light, color: flair?.backgroundColor ? textColor : "white" }}
      >
        {replaceEntities(flair?.text)}
      </span>
    </Box>
  );
}

export default FlairBox;
