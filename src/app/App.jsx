import Layout from "../components/Layout";
import {
  ScrollRestoration,
} from "react-router-dom";
import { CssBaseline } from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { createContext, useState } from "react";

const queryClient = new QueryClient();
export const ThreadsContext = createContext([[], () => {}]);

function App() {
  const [threads, setThreads] = useState([]);


  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <ThreadsContext.Provider value={[threads, setThreads]}>
        <Layout />
      </ThreadsContext.Provider>

      <ScrollRestoration />
    </QueryClientProvider>
  );
}

export default App;
