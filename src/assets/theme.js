import { createTheme } from "@mui/material";
import { purple, green, grey, blue } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#006064",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#d3d3d3",
    },
  },
});

export default theme;
