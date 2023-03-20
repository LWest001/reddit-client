import { Box, Typography } from "@mui/material";

function SortSelectorMenuItem({ icon, text }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      {icon}
      <Typography>{text.toUpperCase()}</Typography>
    </Box>
  );
}
export default SortSelectorMenuItem;
