import { Avatar, Box } from "@mui/material";
import { useContext } from "react";
import theme from "../../assets/theme";
import replaceEntities from "../../functions/replaceEntities";
import { ThreadContentContext } from "./ThreadCard";

function FlairBox() {
  let { flair } = useContext(ThreadContentContext);
  if (!flair.text) {
    flair = {
      text: "Text post",
      backgroundColor: theme.palette.primary.main,
      textColor: "light",
    };
  }

  const textColor = flair.textColor === "light" ? "white" : "black";
  return (
    <Box className="postFlairContainer">
      <span
        className="postFlair"
        style={{
          backgroundColor:
            flair?.backgroundColor || theme.palette.primary.light,
          color: flair?.backgroundColor ? textColor : "white",
        }}
      >
        {replaceEntities(flair?.text)}
      </span>
    </Box>
  );
}

export default FlairBox;
