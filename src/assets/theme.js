import { createTheme } from "@mui/material";
import { purple, green, grey, blue } from "@mui/material/colors";

let theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#006064",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#d3d3d3",
    },
  },
});

// MuiCard*
theme = createTheme(theme, {
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
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 8 },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          paddingRight: 0,
          paddingTop: "0.2rem",
          ":last-child": {
            paddingBottom: "inherit",
          },
        },
      },
    },
  },
});

// MuiSvgIcon
theme = createTheme(theme, {
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: theme.palette.primary.contrastText,
        },
      },
    },
  },
});

// MuiToolbar

theme = createTheme(theme, {
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: {
          justifyContent: "space-between",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        color: theme.palette.primary.contrastText,
      },
    },
  },
});

export default theme;
