import * as React from "react";
import { Router } from "next/router";

export const usePageLoading = () => {
  // default to true for first initial page load
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // set to false after first initial load
    setLoading(false);

    // setup handlers for router changes
    Router.events.on("routeChangeStart", () => setLoading(true));
    Router.events.on("routeChangeComplete", () => setLoading(false));
    Router.events.on("routeChangeError", () => setLoading(false));
  }, []);

  return { loading, setLoading };
};
