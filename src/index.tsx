import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./i18n";
import { MoralisProvider } from "react-moralis";
import { ThemeContextProvider } from "./context/theme-context";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <MoralisProvider
      serverUrl="https://bcky7pjagx2p.usemoralis.com:2053/server"
      appId="feNQRomelHsknyu7ldyNzLTVsFTOLwS9pvu0Bscd"
    >
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </MoralisProvider>
  </React.StrictMode>,
);
