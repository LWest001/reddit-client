import { Chip, Typography } from "@mui/material";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import { Link } from "react-router-dom";

const CommentsChip = ({ count, link }) => {
  const isLink = !!link;
  return (
    <Chip
      icon={<CommentOutlinedIcon />}
      label={<Typography>{count}</Typography>}
      clickable={isLink}
      component={isLink && Link}
      to={link}
      sx={{ marginY: 1 }}
      size={isLink ? "medium" : "small"}
      variant={isLink ? "filled" : "outlined"}
    />
  );
};

export default CommentsChip;
