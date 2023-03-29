import { Typography } from "@mui/material";
import { useContext } from "react";
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
      {flair?.text}
    </Typography>
  );
}

export default FlairBox;
