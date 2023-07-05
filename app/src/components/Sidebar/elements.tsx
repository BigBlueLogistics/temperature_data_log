import { styled, Drawer } from "@mui/material";

export const DrawerContainer = styled(Drawer)(({ theme }) => {
  return {
    "& .MuiDrawer-paper": {
      width: 240,
    },
  };
});
