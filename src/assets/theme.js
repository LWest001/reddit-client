import { createTheme } from "@mui/material";

let theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#006064",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#640061",
    },
    background: {
      default: "#d3d3d3",
    },
    headerGradient: {
      default: "radial-gradient(ellipse at top left, #ffffff, lightgray)",
    },
  },
});

// MuiCard*
theme = createTheme(theme, {
  components: {
    MuiCardHeader: {
      variants: [
        {
          props: { variant: "commentCard" },
          style: {
            padding: 0,
            paddingRight: "1rem",
            fontSize: 14,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          },
        },
      ],
      styleOverrides: {
        root: {
          background: theme.palette.headerGradient.default,
          borderTopLeftRadius: "calc(var(--radius) + var(--border))",
          borderTopRightRadius: "calc(var(--radius) + var(--border))",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "calc(var(--radius) + var(--border));",
          margin: "5px auto",
          width: "100%",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          wordBreak: "break-word",
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
      variants: [
        {
          props: { variant: "headerIcon" },
          style: {
            color: theme.palette.primary.contrastText,
          },
        },
      ],
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
        select: {
          "&:before": {
            borderColor: "white",
          },
          "&:after": {
            borderColor: "white",
          },
          "&:not(.Mui-disabled):hover::before": {
            borderColor: "white",
          },
        },
        icon: {
          fill: "white",
        },
        root: {
          color: "white",
        },
      },
    },
  },
});

// MuiAccordion

theme = createTheme(theme, {
  components: {
    MuiAccordionSummary: {
      styleOverrides: {
        content: {
          flexDirection: "column",
        },
      },
    },
  },
});

export default theme;
