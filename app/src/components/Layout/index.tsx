"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ThemeProvider, CssBaseline, Container, Toolbar } from "@mui/material";
import theme from "@/assets/theme/base";
import TopNavbar from "@/components/TopNavbar";
import Sidebar from "@/components/Sidebar";
import { Main } from "./elements";
import { TLayout } from "./types";

function Layout({ menuList, children }: TLayout) {
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false);

  const onDrawer = () => {
    setOpenDrawer((prev) => !prev);
  };

  useEffect(() => {
    if (menuList.length) {
      const defaultPage = `/temperature/${menuList[0].tag_id}`;
      router.replace(defaultPage);
    }
  }, [menuList, router]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Main>
        <Sidebar menuList={menuList} open={openDrawer} onClose={onDrawer} />
        <TopNavbar onDrawer={onDrawer} />
        <Container sx={{ paddingY: 5 }}>
          <Toolbar />
          {children}
        </Container>
      </Main>
    </ThemeProvider>
  );
}

export default Layout;
