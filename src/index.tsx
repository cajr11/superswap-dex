import React from "react";
import ReactDOM from "react-dom/client";
import "./i18n";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MoralisProvider } from "react-moralis";
import { ThemeContextProvider } from "./context/theme-context";
import { AuthContextProvider } from "./context/auth-context";
import { ChainContextProvider } from "./context/chain-context";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <MoralisProvider
      serverUrl={process.env.REACT_APP_SERVER_URL_MORALIS!}
      appId={process.env.REACT_APP_ID_MORALIS!}
    >
      <ThemeContextProvider>
        <ChainContextProvider>
          <AuthContextProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/#/swap?chain=mainnet" element={<App />} />
                <Route path="transactions" element={<App />} />
              </Routes>
            </BrowserRouter>
          </AuthContextProvider>
        </ChainContextProvider>
      </ThemeContextProvider>
    </MoralisProvider>
  </React.StrictMode>,
);
