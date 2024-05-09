import { Chip, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const AuthorChip = ({ author }) => {
  return (
    <Chip
      sx={{ display: "flex", p: 0.5, overflow:"hidden" }}
      icon={<AccountCircleIcon fontSize="small" />}
      label={<Typography>u/{author}</Typography>}
      size="small"
      variant="outlined"
      
    />
  );
};

export default AuthorChip;
