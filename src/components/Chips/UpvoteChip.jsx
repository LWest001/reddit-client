import { Chip, Typography } from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";

const UpvoteChip = ({ score }) => {
  return (
    <Chip
      sx={{ display: "flex", marginY: 0.5, p: 0.5 }}
      icon={<ThumbUpOutlinedIcon fontSize="small" />}
      label={<Typography>{score}</Typography>}
      size="small"
      variant="outlined"
    />
  );
};

export default UpvoteChip;
