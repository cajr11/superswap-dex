import React from "react";
import "./App.css";
import Swap from "./pages/Swap";
import NavBar from "./components/NavBar/NavBar";
import ThemeContext from "./context/theme-context";
import { useOneInchTokens, useChain } from "react-moralis";
import { TokenList } from "./types";

function App(): JSX.Element {
  const { chainId, chain, account } = useChain();
  console.log(chainId, chain, account);
  const { isLight } = React.useContext(ThemeContext);
  const { getSupportedTokens, data } = useOneInchTokens({ chain: "eth" });
  const [tokenList, setTokenList] = React.useState<TokenList | []>([]);

  // Retrieve tokens on initial render and chain switch
  React.useEffect(() => {
    const getTokens = async () => {
      await getSupportedTokens();
    };
    if (data.length === 0) {
      getTokens();
      console.log(data);
    } else {
      const formattedData = JSON.parse(JSON.stringify(data, null, 2));
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
    "w-screen h-screen bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 overflow-hidden",
  containerDark:
    "w-screen h-screen bg-gradient-to-r from-indigo-800 via-blue-900 to-zinc-800",
};
