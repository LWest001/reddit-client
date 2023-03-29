import { IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export default function ExpandCollapseButton({ expanded, handleCollapse }) {
  return (
    <IconButton
      size="small"
      sx={{ mr: 1, borderRadius: 0 }}
      onClick={handleCollapse}
    >
      {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
    </IconButton>
  );
}
