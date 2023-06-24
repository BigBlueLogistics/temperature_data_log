import { Box, styled, Typography } from "@mui/material";

export const Title = styled(Typography)(({ theme }) => {
  const {
    palette: { common },
    typography: { pxToRem },
    breakpoints,
  } = theme;
  return {
    color: common.white,
    fontWeight: 600,
    fontSize: pxToRem(24),
    marginBottom: pxToRem(12),

    [breakpoints.up("xs")]: {
      textAlign: "center",
    },
    [breakpoints.up("md")]: {
      textAlign: "left",
    },
  };
});

export const Wrapper = styled(Box)(({ theme }) => {
  const {
    typography: { pxToRem },
    breakpoints,
  } = theme;

  return {
    [breakpoints.up("xs")]: {
      width: "auto",
    },
    padding: `${pxToRem(16)} ${pxToRem(20)}`,
    backgroundColor: "#2626264d",
    border: "1px solid #404040",
    borderRadius: 8,
    "&:hover": {
      cursor: "pointer",
      boxShadow: "-1px 1px 9px 2px rgba(203,203,203,0.28)",
      borderColor: "#7a7a7a",
    },
  };
});
