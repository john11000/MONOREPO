import "@/styles/globals.css";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import createEmotionCache from "@/styles/createEmotionCache";
import type { AppProps } from "next/app";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/styles/theme";
import { Provider } from "react-redux";
import { store, persistor } from "@/redux/store";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import { AxiosInterceptor } from "@/interceptors";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <AxiosInterceptor>
              <Component {...pageProps} />
            </AxiosInterceptor>
            <ToastContainer
              draggable
              closeOnClick
              pauseOnHover
              pauseOnFocusLoss
              rtl={false}
              limit={1}
              autoClose={5000}
              newestOnTop={false}
              hideProgressBar={false}
              position="top-right"
            />
          </ThemeProvider>
        </CacheProvider>
      </Provider>
    </PersistGate>
  );
}
