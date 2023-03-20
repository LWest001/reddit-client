import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";

const Layout = () => {
  return (
    <>
      <Container className="App" sx={{ px: { xs: 0.2, sm: 1 } }}>
        <Header />
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
