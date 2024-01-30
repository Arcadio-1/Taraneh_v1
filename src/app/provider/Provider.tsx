"use client";
import React, { ReactNode, useEffect } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { faIR } from "@mui/material/locale";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { OrderSelectedDate } from "@prisma/client";

interface ContextProps {
  postingPrice: number;
  setPostingPric: Dispatch<SetStateAction<number>>;
  brand_list_filter: string[];
  set_brand_list_filter: Dispatch<SetStateAction<string[]>>;
  deliveryDate: OrderSelectedDate | null;
  setDeliveryDate: Dispatch<SetStateAction<OrderSelectedDate | null>>;
  beforeInstallPrompt: BeforeInstallPromptEvent | null;
  setBeforeInstallPrompt: React.Dispatch<
    React.SetStateAction<BeforeInstallPromptEvent | null>
  >;
}

const GlobalContext = createContext<ContextProps>({
  deliveryDate: null,
  setDeliveryDate: (): OrderSelectedDate | null => null,
  postingPrice: 0,
  setPostingPric: (): number => 0,
  brand_list_filter: [],
  set_brand_list_filter: (): string[] => [],
  beforeInstallPrompt: null,
  setBeforeInstallPrompt: (): BeforeInstallPromptEvent | null => null,
});

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}
// export let deferredPrompt: BeforeInstallPromptEvent|null = null;
const Provider = ({ children }: { children: ReactNode }) => {
  const [postingPrice, setPostingPric] = useState<number>(0);
  const [brand_list_filter, set_brand_list_filter] = useState<string[]>([]);
  const [beforeInstallPrompt, setBeforeInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [deliveryDate, setDeliveryDate] = useState<OrderSelectedDate | null>(
    null,
  );

  const theme = createTheme(
    {
      palette: {
        primary: { main: "#1976d2" },
      },
    },
    faIR,
  );

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js", { scope: "/" })
        .then((registration) => {
          //  registration.pushManager.subscribe({
          //    userVisibleOnly: true,
          //    applicationServerKey,
          // //  });
          // function sendNotification() {
          //   let title = "Test";
          //   let options = {
          //     body: "Test body",
          //     // Other options can go here
          //   };
          //   console.log("Creating new notification");
          //   let notification = new Notification(title, options);
          //   console.log(notification);
          // }
          // sendNotification();
          // console.log("scope is: ", registration.scope);
        });
    }
    self.addEventListener("beforeinstallprompt", (e) => {
      // console.log("prompt");
      e.preventDefault();
      setBeforeInstallPrompt(e);
      return false;
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalContext.Provider
        value={{
          deliveryDate,
          setDeliveryDate,
          postingPrice,
          setPostingPric,
          brand_list_filter,
          set_brand_list_filter,
          beforeInstallPrompt,
          setBeforeInstallPrompt,
        }}
      >
        {children}
      </GlobalContext.Provider>
    </ThemeProvider>
  );
};
export const useGlobalContext = () => useContext(GlobalContext);
export default Provider;
