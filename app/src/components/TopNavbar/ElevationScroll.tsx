"use client";

import React from "react";
import { useScrollTrigger } from "@mui/material";

function ElevationScroll({ children }: { children: React.ReactNode }) {
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children as any, {
    elevation: trigger ? 4 : 0,
  });
}

export default ElevationScroll;
