import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./i18n";
import { MoralisProvider } from "react-moralis";
import { ThemeContextProvider } from "./context/theme-context";
import { AuthContextProvider } from "./context/auth-context";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <MoralisProvider
      serverUrl={process.env.REACT_APP_SERVER_URL_MORALIS!}
      appId={process.env.REACT_APP_ID_MORALIS!}
    >
      <ThemeContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </ThemeContextProvider>
    </MoralisProvider>
  </React.StrictMode>,
);
