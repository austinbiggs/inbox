import * as React from "react";
import type { AppProps } from "next/app";
import { SSRProvider } from "react-bootstrap";
import { useRouter } from "next/router";

import "../styles/theme.scss";
import { Provider } from "../frontend/gql/provider";
import { Sidenav } from "../components";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  const authPages = [
    "/error-illustration",
    "/error",
    "/password-reset-cover",
    "/password-reset-illustration",
    "/password-reset",
    "/sign-in-cover",
    "/sign-in-illustration",
    "/sign-in",
    "/sign-up-cover",
    "/sign-up-illustration",
    "/sign-up",
  ];

  // intentionally disabled unless we want it
  const sidebarEnabled = false;

  return (
    <SSRProvider>
      <Provider>
        {!authPages.includes(router.pathname) && sidebarEnabled && <Sidenav />}
        <Component {...pageProps} />
      </Provider>
    </SSRProvider>
  );
};

export default App;
