import Layout from "../components/Layout";
import { ScrollRestoration } from "react-router-dom";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useEffect, useMemo, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getDesignTokens } from "../assets/theme";

const queryClient = new QueryClient();
export const ThreadsContext = createContext([[], () => {}]);
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});
const sessionColorMode = localStorage.getItem("colorMode");

export default function ToggleColorMode() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(prefersDarkMode ? "dark" : "light");
  useEffect(() => {
    sessionColorMode && setMode(sessionColorMode);
  }, []);

  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === "light" ? "dark" : "light";
          localStorage.setItem("colorMode", newMode);
          return newMode;
        });
      },
      mode,
    }),
    [mode]
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <CssBaseline />
      <Layout />
      <ScrollRestoration />
    </QueryClientProvider>
  );
}
