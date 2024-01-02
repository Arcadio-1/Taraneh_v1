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
import { OrderSelectedDate } from "@prisma/client";

interface ContextProps {
  // order: OrderType | null;
  // setOrder: Dispatch<SetStateAction<OrderType | null>>;
  deliveryDate: OrderSelectedDate | null;
  setDeliveryDate: Dispatch<SetStateAction<OrderSelectedDate | null>>;
  postingPrice: number;
  setPostingPric: Dispatch<SetStateAction<number>>;
  brand_list_filter: string[];
  set_brand_list_filter: Dispatch<SetStateAction<string[]>>;
}

const GlobalContext = createContext<ContextProps>({
  // order: null,
  // setOrder: (): OrderType | null => null,
  deliveryDate: null,
  setDeliveryDate: (): OrderSelectedDate | null => null,
  postingPrice: 0,
  setPostingPric: (): number => 0,
  brand_list_filter: [],
  set_brand_list_filter: (): string[] => [],
});

const Provider = ({ children }: { children: React.ReactNode }) => {
  // const [order, setOrder] = useState<OrderType | null>(null);
  const [postingPrice, setPostingPric] = useState<number>(0);
  const [brand_list_filter, set_brand_list_filter] = useState<string[]>([]);
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
        brand_list_filter,
        set_brand_list_filter,
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = () => useContext(GlobalContext);
export default Provider;
