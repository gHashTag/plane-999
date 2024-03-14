"use client";
import { ReactElement, useEffect } from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
// styles
import "styles/globals.css";
import "styles/command-pallette.css";
import "styles/nprogress.css";
import "styles/emoji.css";
import "styles/react-day-picker.css";
// constants
import { THEMES } from "constants/themes";
import { SITE_TITLE } from "constants/seo-variables";
// mobx store provider
import { StoreProvider } from "contexts/store-context";
import { NextUIProvider } from "@nextui-org/react";
import { HMSRoomProvider } from "@100mslive/react-sdk";
import { authenticateUser, initWeb3Auth, subscribeToEvents } from "services/utils/auth";
import { AppProvider } from "lib/app-provider";
// types
import { NextPageWithLayout } from "lib/types";
import { useWeb3Auth } from "@/hooks/999/useWeb3Auth";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const { setLoggedIn } = useWeb3Auth();

  useEffect(() => {
    initWeb3Auth();
    const unsubscribe = subscribeToEvents(async () => {
      await authenticateUser();
      setLoggedIn(true);
    });
    return unsubscribe;
  }, []);

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

  return (
    <>
      <Head>
        <title>{SITE_TITLE}</title>
      </Head>

      <StoreProvider {...pageProps}>
        <HMSRoomProvider>
          <NextUIProvider>
            <ThemeProvider themes={THEMES} defaultTheme="system">
              <AppProvider>{getLayout(<Component {...pageProps} />)}</AppProvider>
            </ThemeProvider>
          </NextUIProvider>
        </HMSRoomProvider>
      </StoreProvider>
    </>
  );
}

export default MyApp;
