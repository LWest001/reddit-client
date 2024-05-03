import { blue, deepPurple, grey, teal } from "@mui/material/colors";

const lightHeaderGradient =
  "radial-gradient(ellipse at top left, #ffffff, lightgray)";
const darkHeaderGradient = `radial-gradient(ellipse at top left, ${grey[900]}, ${teal[900]})`;

function getHeaderGradient(mode) {
  return mode === "light" ? lightHeaderGradient : darkHeaderGradient;
}

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: "#006064",
          },
          secondary: {
            main: "#640061",
          },
          background: {
            default: "#d3d3d3",
          },
          headerGradient: {
            default: lightHeaderGradient,
          },
        }
      : {
          // palette values for dark mode
          primary: { main: teal[500], contrastText: grey[50] },
          secondary: {
            main: deepPurple[500],
          },
          divider: teal[700],
          background: {
            default: teal[900],
            paper: teal[900],
          },
          text: {
            primary: grey[50],
            secondary: grey[500],
          },
          headerGradient: {
            default: darkHeaderGradient,
          },
        }),
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
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
          // borderTopLeftRadius: "calc(var(--radius) + var(--border))",
          // borderTopRightRadius: "calc(var(--radius) + var(--border))",
          background: getHeaderGradient(mode),
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          // borderRadius: "calc(var(--radius) + var(--border));",
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
    MuiAccordionSummary: {
      styleOverrides: {
        content: {
          flexDirection: "column",
        },
      },
    },
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
    MuiSvgIcon: {
      variants: [
        {
          props: { variant: "headerIcon" },
          style: {
            color: getHeaderGradient(mode),
          },
        },
      ],
    },
    MuiLink: {
      styleOverrides: {
        root: { color: mode === "dark" && blue[300] },
      },
    },
  },
});
