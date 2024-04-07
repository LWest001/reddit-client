import Layout from "../components/Layout";
import ErrorPage from "../features/ErrorPage";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import { ScrollRestoration } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  //
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <BottomScrollListener onBottom={() => {}} offset={5000} />
      <Layout />
      {status === "failed" && <ErrorPage />}

      <ScrollRestoration />
    </QueryClientProvider>
  );
}

export default App;
