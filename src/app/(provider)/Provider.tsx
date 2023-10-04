"use client";
import React from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { faIR } from "@mui/material/locale";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const theme = createTheme(
    {
      palette: {
        primary: { main: "#1976d2" },
      },
    },
    faIR
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Provider;
