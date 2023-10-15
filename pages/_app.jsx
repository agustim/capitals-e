import { App } from "konsta/react";
import "@/styles/globals.css";
import { GlobalContextProvider } from "../context/globalContext";

export default function MyApp({ Component, pageProps }) {
  return (
    // Wrap our app with App component
    <App theme="ios">
      <GlobalContextProvider>
        <Component {...pageProps} />
      </GlobalContextProvider>
    </App>
  );
}
