import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import { createContext, useState } from "react";

export const HeaderHeight = createContext(0);

const Layout = () => {
  const [headerHeight, setHeaderHeight] = useState(0);

  return (
    <>
      <Container className="App" sx={{ px: { xs: 0.2, sm: 1 } }}>
        <Header onResize={setHeaderHeight} />
        <HeaderHeight.Provider value={headerHeight}>
          <Outlet />
        </HeaderHeight.Provider>
      </Container>
    </>
  );
};

export default Layout;
