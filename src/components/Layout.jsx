import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import { createContext, useEffect, useRef, useState } from "react";

export const HeaderHeight = createContext(0);

const Layout = () => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const appbarRef = useRef();

  useEffect(() => {
    if (!appbarRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      setHeaderHeight(appbarRef.current?.offsetHeight);
    });
    resizeObserver.observe(appbarRef.current);
    return () => resizeObserver.disconnect(); // clean up
  }, []);

  return (
    <>
      <Container className="App" sx={{ px: { xs: 0.2, sm: 1 } }}>
        <Header ref={appbarRef} />
        <HeaderHeight.Provider value={headerHeight}>
          <Outlet />
        </HeaderHeight.Provider>
      </Container>
    </>
  );
};

export default Layout;
