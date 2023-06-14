import { styled, Typography, Box } from "@mui/material";

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

export const TitleRH = styled("div")(({ theme }) => {
  const {
    palette: { common },
    typography: { pxToRem },
  } = theme;
  return {
    color: common.white,
    fontWeight: 400,
    fontSize: pxToRem(20),
    textAlign: "left",
    // backgroundColor: "#fffffff2",
    // borderRadius: "5px",
    // padding: "7px 5px",
  };
});

export const Humidity = styled(Typography)(({ theme }) => {
  const {
    typography: { pxToRem },
  } = theme;
  return {
    color: "#444",
    backgroundColor: "#babab2",
    border: "2px solid #444",
    borderRadius: 5,
    display: "inline",
    padding: "0px 5px",
    marginLeft: "5px",
    marginRight: "3px",
    fontWeight: 500,
    fontSize: pxToRem(22),
    textAlign: "left",
    textShadow:
      "-1px -1px 1px rgba(255,255,255,.1), 1px 1px 1px rgba(0,0,0,.5)",
  };
});

export const GridWrapper = styled(Box)(({ theme }) => {
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
  };
});
