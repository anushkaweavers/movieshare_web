"use client";

import { persistedStore, store } from "@/Redux/store";
import { ChildType } from "@/Types/Common/Common.types";
import { ability, AbilityContext } from "@/Utils/CAN/can";
import i18n from "@/Utils/i18Config/i18";
import { StyledEngineProvider } from "@mui/material";
import { ThemeProvider } from "next-themes";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {
  createTheme,
  ThemeProvider as ThemeProviderMui,
} from "@mui/material/styles";

const MainLayout = ({ children }: ChildType) => {
  const [persisitAvailable, setPersistAvailable] = useState<boolean>(false);
  const handlePersistAvailable = () => {
    setPersistAvailable(true);
  };
  const theme = createTheme({
    typography: {
      fontFamily: "Montserrat, sans-serif", // your desired font family
    },
  });
  return (
    <ThemeProviderMui theme={theme}>
      <ThemeProvider attribute='class'>
        <StyledEngineProvider injectFirst>
          <Provider store={store}>
            <I18nextProvider i18n={i18n}>
              <Toaster
                toastOptions={{
                  className: "hot-toast",
                  duration: 5000,
                  success: {
                    duration: 4000,
                    style: {
                      background: "green",
                      color: "white",
                    },
                  },
                  error: {
                    duration: 6000,
                    style: {
                      background: "red",
                      color: "white",
                    },
                  },
                }}
              />
              <AbilityContext.Provider value={ability}>
                <PersistGate
                  onBeforeLift={handlePersistAvailable}
                  persistor={persistedStore}
                >
                  {persisitAvailable && children}
                </PersistGate>
              </AbilityContext.Provider>
            </I18nextProvider>
          </Provider>
        </StyledEngineProvider>
      </ThemeProvider>
    </ThemeProviderMui>
  );
};

export default MainLayout;
