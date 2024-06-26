"use client";

import { Box, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { usePathname } from "next/navigation";
import ElevationScroll from "./ElevationScroll";
import { TTopNavbar } from "./types";

function TopNavbar({ onDrawer }: TTopNavbar) {
  const path = usePathname();
  let headerTitle = "";
  if (path === "/") {
    headerTitle = "Home";
  } else {
    headerTitle = path.replace(/\//g, " ");
  }

  return (
    <ElevationScroll>
      <Box flexGrow="1">
        <AppBar sx={{ backgroundColor: "black" }}>
          <Toolbar>
            <IconButton size="large" onClick={onDrawer}>
              <MenuIcon color="secondary" />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              textTransform="uppercase"
              marginLeft={{ md: 6, sm: 2 }}
            >
              {headerTitle}
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </ElevationScroll>
  );
}

export default TopNavbar;
