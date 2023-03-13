import { Button } from "@mui/material";

function ReadMoreButton({ data, id, onClick }) {


  return (
    <Button
      onClick={onClick}
      key={`btn_${data.id}`}
      id={id}
      type="readMore"
      style={{ transition: "2s" }}
      variant="outlined"
    >
      {data.children.length} more replies
    </Button>
  );
}

export default ReadMoreButton;
