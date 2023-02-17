import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    h1: {
      fontSize: "2rem",
    },
    h2: {
      fontSize: "1.5rem",
    },
  },
  components: {
    // Name of the component
    MuiContainer: {
      styleOverrides: { root: { maxWidth: "100vw", padding: "0" } },
    },
    MuiButtonBase: {
      defaultProps: {
        // The props to change the default for.
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
  },
});

export default theme;
