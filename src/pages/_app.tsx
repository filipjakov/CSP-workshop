import type { AppContext, AppProps } from "next/app";
import App from "next/app";

type ExtendedAppProps = AppProps & {
  // Passed from _document.tsx
  nonce: string;
} & Omit<Awaited<ReturnType<typeof getInitialProps>>, "pageProps">;

function RootApp({ Component, pageProps, nonce }: ExtendedAppProps) {
  return <Component {...pageProps} />;
}

// This disables the ability to perform automatic static optimization, causing every page in the app to be server-side rendered.
// Necessary in order to move builds back to CI (single build) and make them environment agnostic
const getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

RootApp.getInitialProps = getInitialProps;

export default RootApp;
