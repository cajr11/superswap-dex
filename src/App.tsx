import React, { useContext } from "react";
import "./App.css";
import Swap from "./pages/Swap";
import NavBar from "./components/NavBar/NavBar";
import ThemeContext from "./context/theme-context";
import { useOneInchTokens } from "react-moralis";
import { useMoralis, useChain } from "react-moralis";
import { TokenList } from "./types";
import ChainContext from "./context/chain-context";

function App(): JSX.Element {
  // const { chainId, chain, account } = useChain();
  const chainCtx = useContext(ChainContext);
  const { isLight } = React.useContext(ThemeContext);
  const { isAuthenticated, isWeb3Enabled, enableWeb3, isWeb3EnableLoading } =
    useMoralis();
  const { switchNetwork } = useChain();
  const { getSupportedTokens, data } = useOneInchTokens({ chain: chainCtx.chain });
  const [tokenList, setTokenList] = React.useState<TokenList | []>([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
  console.log(tokenList);

  React.useEffect(() => {
    const updateNetwork = async () => {
      if (!isWeb3Enabled) enableWeb3();
      if (!isWeb3EnableLoading) {
        if (isAuthenticated) {
          if (chainCtx.chain === "eth") await switchNetwork("0x1");
          if (chainCtx.chain === "bsc") await switchNetwork("0x38");
          if (chainCtx.chain === "polygon") await switchNetwork("0x89");
        }
      }
    };
    updateNetwork();
  }, [
    chainCtx.chain,
    isAuthenticated,
    switchNetwork,
    enableWeb3,
    isWeb3EnableLoading,
    isWeb3Enabled,
  ]);

  // Retrieve tokens on initial render and chain switch
  React.useEffect(() => {
    const getTokens = async () => {
      await getSupportedTokens();
    };

    if (data.length === 0) {
      getTokens();
    } else {
      const formattedData = JSON.parse(JSON.stringify(data!, null, 2));
      setTokenList(Object.values(formattedData.tokens));
    }
  }, [data, getSupportedTokens]);

  return (
    <div className={isLight ? styles.containerLight : styles.containerDark}>
      <NavBar loginModalOpen={isLoginModalOpen} setLoginModalOpen={setIsLoginModalOpen} />
      <Swap tokenList={tokenList} setLoginModalOpen={setIsLoginModalOpen} />
    </div>
  );
}

export default App;

const styles = {
  containerLight:
    "w-screen h-screen bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 overflow-hidden relative",
  containerDark:
    "w-screen h-screen bg-gradient-to-r from-indigo-800 via-blue-900 to-zinc-800",
};
