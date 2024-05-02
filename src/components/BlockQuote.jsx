import { Divider, Paper } from "@mui/material";

const BlockQuote = ({ children }) => {
  return (
    <Paper
      component="blockquote"
      sx={{
        display: "flex",
        margin: "1rem",
        padding: "0.5rem",
        width: "fit-content",
      }}
    >
      <Divider
        flexItem
        orientation="vertical"
        // variant="middle"
        sx={{ mr: 1 }}
      />
      <blockquote>{children}</blockquote>
    </Paper>
  );
};

export default BlockQuote;
