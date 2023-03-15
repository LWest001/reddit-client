import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";

const Layout = () => {
  return (
    <>
      <Container className="App">
        <Header />
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
