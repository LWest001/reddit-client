import { Button } from "@mui/material";

function ReadMoreButton({ data, id, onClick }) {
  return (
    <Button
      onClick={onClick}
      key={`btn_${data.id}`}
      id={id}
      type="readMore"
      variant="outlined"
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
