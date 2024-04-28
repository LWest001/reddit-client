import { Button, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../../app/App";

function ReadMoreButton({ data, id, onClick }) {
  const { mode: colorMode } = useContext(ColorModeContext);
  console.log(colorMode);
  return (
    <Button
      onClick={onClick}
      key={`btn_${data.id}`}
      id={id}
      type="readMore"
      variant={colorMode === "light" ? "outlined" : "contained"}
      sx={{
        py: 0.2,
        mb: 0.3,
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      {data.children.length} more replies
    </Button>
  );
}

export default ReadMoreButton;
