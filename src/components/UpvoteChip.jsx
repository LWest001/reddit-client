import { Chip } from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";

const UpvoteChip = ({ score }) => {
  return (
    <Chip
      sx={{ display: "flex", marginY: 0.5 }}
      icon={<ThumbUpOutlinedIcon fontSize="small" />}
      label={score}
      size="small"
    />
  );
};

export default UpvoteChip;
