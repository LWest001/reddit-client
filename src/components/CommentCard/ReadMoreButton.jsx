import { Button } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../../app/App";

function ReadMoreButton({ data, id, onClick }) {
  const { mode: colorMode } = useContext(ColorModeContext);
  return (
    <Button
      onClick={onClick}
      key={`btn_${data.id}`}
      id={id}
      type="readMore"
      size="small"
      variant={"text"}
      sx={{
        py: 0.2,
        mb: 0.3,
        fontWeight: "bold",
        cursor: "pointer",
        color:colorMode === "dark" ? "whitesmoke" : undefined
      }}
    >
      {data.children.length} more replies
    </Button>
  );
}

export default ReadMoreButton;
