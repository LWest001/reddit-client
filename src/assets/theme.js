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
  components: {
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: "0.2rem 1rem",
        },
        title: {
          fontSize: 14,
        },
        content: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        },
        subheader: {
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          paddingRight: 0,
          ":last-child": {
            paddingBottom: "inherit",
          },
        },
      },
    },
  },
});

export default theme;
