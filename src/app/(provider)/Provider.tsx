"use client";
import React from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { faIR } from "@mui/material/locale";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { OrderType } from "@/types/type";

interface ContextProps {
  order: OrderType | null;
  setOrder: Dispatch<SetStateAction<OrderType | null>>;
}

const GlobalContext = createContext<ContextProps>({
  order: null,
  setOrder: (): OrderType | null => null,
});

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [order, setOrder] = useState<OrderType | null>(null);

  const theme = createTheme(
    {
      palette: {
        primary: { main: "#1976d2" },
      },
    },
    faIR
  );

  return (
    <GlobalContext.Provider value={{ order, setOrder }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = () => useContext(GlobalContext);
export default Provider;
