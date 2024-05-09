import { Chip, Typography } from "@mui/material";
import ScheduleIcon from "@mui/icons-material/Schedule";

const TimestampChip = ({ timestamp }) => {
  return (
    <Chip
      sx={{ display: "flex", p: 0.5 }}
      icon={<ScheduleIcon fontSize="small" />}
      label={<Typography>{timestamp}</Typography>}
      size="small"
      variant="outlined"
    />
  );
};

export default TimestampChip;
