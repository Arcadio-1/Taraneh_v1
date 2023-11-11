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
// import { OrderType } from "@/types/type";
import { OrderSelectedDate, OrderStatus } from "@prisma/client";

interface ContextProps {
  // order: OrderType | null;
  // setOrder: Dispatch<SetStateAction<OrderType | null>>;
  deliveryDate: OrderSelectedDate | null;
  setDeliveryDate: Dispatch<SetStateAction<OrderSelectedDate | null>>;
  postingPrice: number;
  setPostingPric: Dispatch<SetStateAction<number>>;
}

const GlobalContext = createContext<ContextProps>({
  // order: null,
  // setOrder: (): OrderType | null => null,
  deliveryDate: null,
  setDeliveryDate: (): OrderSelectedDate | null => null,
  postingPrice: 0,
  setPostingPric: (): number => 0,
});

const Provider = ({ children }: { children: React.ReactNode }) => {
  // const [order, setOrder] = useState<OrderType | null>(null);
  const [postingPrice, setPostingPric] = useState<number>(0);
  const [deliveryDate, setDeliveryDate] = useState<OrderSelectedDate | null>(
    null
  );

  const theme = createTheme(
    {
      palette: {
        primary: { main: "#1976d2" },
      },
    },
    faIR
  );

  return (
    <GlobalContext.Provider
      value={{
        deliveryDate,
        setDeliveryDate,
        postingPrice,
        setPostingPric,
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = () => useContext(GlobalContext);
export default Provider;
