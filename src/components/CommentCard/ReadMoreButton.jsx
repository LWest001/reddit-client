import { Chip } from "@mui/material";
import { useState } from "react";
import ListRoundedIcon from "@mui/icons-material/ExpandCircleDown";

function ReadMoreButton({ data, id, onClick }) {
  const [hidden, setHidden] = useState(false);
  return (
    <Chip
      clickable
      onClick={() => {
        setHidden(true);
        onClick(data);
      }}
      key={`btn_${data.id}`}
      id={id}
      // type="readMore"
      size="small"
      sx={{
        display: hidden ? "none" : undefined,
        // color: colorMode === "dark" ? "lightblue" : undefined,
        width: "fit-content",
        marginY: 0.5,
      }}
      icon={<ListRoundedIcon fontSize="small" />}
      label={data.children.length + " replies"}
    ></Chip>
  );
}

export default ReadMoreButton;
