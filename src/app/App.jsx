import Layout from "../components/Layout";
import { ScrollRestoration } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
export const ThreadsContext = createContext([[], () => {}]);

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

export default App;
