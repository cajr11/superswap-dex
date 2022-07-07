import React, { useContext } from "react";
import "./App.css";
import Swap from "./pages/Swap";
import NavBar from "./components/NavBar/NavBar";
import ThemeContext from "./context/theme-context";
import { useOneInchTokens } from "react-moralis";
import { TokenList } from "./types";
import ChainContext from "./context/chain-context";

function App(): JSX.Element {
  // const { chainId, chain, account } = useChain();
  const chainCtx = useContext(ChainContext);

  const { isLight } = React.useContext(ThemeContext);
  const { getSupportedTokens, data } = useOneInchTokens({ chain: chainCtx.chain });
  const [tokenList, setTokenList] = React.useState<TokenList | []>([]);

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
      <NavBar />
      <Swap tokenList={tokenList} />
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
