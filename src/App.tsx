import React, { useContext } from "react";
import "./App.css";
import Swap from "./pages/Swap";
import NavBar from "./components/NavBar/NavBar";
import ThemeContext from "./context/theme-context";
import { useMoralis, useChain, useOneInchTokens } from "react-moralis";
import { TokenList } from "./types";
import ChainContext from "./context/chain-context";

function App(): JSX.Element {
  const chainCtx = useContext(ChainContext);
  const { isLight } = React.useContext(ThemeContext);
  const { isAuthenticated, enableWeb3, isWeb3Enabled } = useMoralis();
  const { switchNetwork } = useChain();
  const { getSupportedTokens, data } = useOneInchTokens({ chain: chainCtx.chain });
  const [tokenList, setTokenList] = React.useState<TokenList | []>([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);


  React.useEffect(() => {
    const updateNetwork = async () => {
        if (isAuthenticated) {
          if (chainCtx.chain === "eth") await switchNetwork("0x1");
          if (chainCtx.chain === "bsc") await switchNetwork("0x38");
          if (chainCtx.chain === "polygon") await switchNetwork("0x89");
        }
      }
      if(isWeb3Enabled){
        updateNetwork();
      }
  }, [
    chainCtx.chain,
    isAuthenticated,
    switchNetwork,
    isWeb3Enabled
  ]);

  // Retrieve tokens on initial render and chain switch
  React.useEffect(() => {
    const getTokens = async () => {
      await enableWeb3();
      await getSupportedTokens();
    };

    if (data.length === 0) {
      getTokens();
    } else {
      const formattedData = JSON.parse(JSON.stringify(data!, null, 2));
      setTokenList(Object.values(formattedData.tokens));
    }
  }, [data, getSupportedTokens, enableWeb3]);

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
