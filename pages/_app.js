import "../styles/globals.css";
import { Provider } from "../frontend/gql/provider";

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
