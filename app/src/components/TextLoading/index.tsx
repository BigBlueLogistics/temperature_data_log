"use client";

import { Box, Typography } from "@mui/material";

function TextLoading() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Typography sx={{ color: "#c3c3c3" }} fontSize={20}>
        Loading...
      </Typography>
    </Box>
  );
}

export default TextLoading;
