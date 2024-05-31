import { Typography } from "@mui/material";
import { useContext } from "react";
import { ThreadContentContext } from "./ThreadCard";
import { getFlair } from "../../functions/getFlair";
import replaceEntities from "../../functions/replaceEntities";

function FlairBox({ crosspost }) {
  let data = useContext(ThreadContentContext);
  const flair = getFlair(data);

  if (!flair) return;
  return (
    <Typography
      className="postFlair"
      sx={{
        bgcolor: flair?.backgroundColor || "primary.light",
        color: flair?.textColor === "dark" ? "black" : "white",
        mr: 1,
      }}
    >
      {crosspost ? "Crosspost" : replaceEntities(flair.text)}
    </Typography>
  );
}

export default FlairBox;
