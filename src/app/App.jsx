import Layout from "../components/Layout";
import { ScrollRestoration } from "react-router-dom";
import { Button, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useContext, useMemo, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getDesignTokens } from "../assets/theme";

const queryClient = new QueryClient();
export const ThreadsContext = createContext([[], () => {}]);
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});



export default function ToggleColorMode() {
  const [mode, setMode] = useState("light");
  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
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
