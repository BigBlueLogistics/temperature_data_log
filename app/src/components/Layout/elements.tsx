import { Box, styled } from "@mui/material";

export const Main = styled(Box)(({ theme }) => {
  const {
    palette: { common },
  } = theme;
  return {
    background: common.black,
    width: "100%",
    minHeight: "100vh",
  };
});
