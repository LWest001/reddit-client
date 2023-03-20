import { Typography } from "@mui/material";
import { useContext } from "react";

import replaceEntities from "../../functions/replaceEntities";
import { ThreadContentContext } from "./ThreadCard";

function FlairBox() {
  let { flair } = useContext(ThreadContentContext);
  if (!flair?.text) {
    flair = {
      text: "Text post",
      bgcolor: "primary.main",
      textColor: "light",
    };
  }

  const textColor = flair.textColor === "light" ? "white" : "black";
  return (
    <Typography
      className="postFlair"
      sx={{
        bgcolor: flair?.backgroundColor || "primary.light",
        color: flair?.backgroundColor ? textColor : "white",
        mr: 1,
      }}
    >
      {replaceEntities(flair?.text)}
    </Typography>
  );
}

export default FlairBox;
