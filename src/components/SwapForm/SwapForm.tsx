import React from "react";
import SwapFormHeader from "./SwapFormHeader";
import SwapFormInput from "./SwapFormInput";
import SwapButton from "./SwapButton";
import ThemeContext from "../../context/theme-context";
import type { TokenList } from "../../types";
import { useMoralis } from "react-moralis";
import type { SelectedToken } from "../../types";
import ChainContext from "../../context/chain-context";
import Moralis from "moralis";

type SwapFormProps = {
  tokenList: TokenList;
  setLoginModalOpen(val: boolean): void;
};

const SwapForm = ({ tokenList, setLoginModalOpen }: SwapFormProps): JSX.Element => {
  const { isLight } = React.useContext(ThemeContext);
  const { chain } = React.useContext(ChainContext);
  const { isAuthenticated } = useMoralis();
  const [firstToken, setFirstToken] = React.useState<SelectedToken>({decimals: 0});
  const [secondToken, setSecondToken] = React.useState<SelectedToken>({decimals: 0});
  const [firstAmount, setFirstAmount] = React.useState<number | undefined>();
  const [secondAmount, setSecondAmount] = React.useState<number | undefined>();


    const getQuoteFirst = async (val: string) => {
     const amount =  Number(Number(val) * (10**firstToken.decimals));
      if (firstToken.address && secondToken.address) {
        const quote = await Moralis.Plugins.oneInch.quote({
          chain, // The blockchain you want to use (eth/bsc/polygon)
          fromTokenAddress: firstToken.address, // The token you want to swap
          toTokenAddress: secondToken.address, // The token you want to receive
          amount
        });
        console.log(quote);
        setSecondAmount(quote.toTokenAmount / (10**quote.toToken.decimals));
      }
    };

    const getQuoteSecond = async(val: string) => {
      const amount = Number(Number(val) * (10**secondToken.decimals))
      if (firstToken.address && secondToken.address) {
        const quote = await Moralis.Plugins.oneInch.quote({
          chain, // The blockchain you want to use (eth/bsc/polygon)
          fromTokenAddress: secondToken.address, // The token you want to swap
          toTokenAddress: firstToken.address, // The token you want to receive
          amount,
        });
        setFirstAmount(quote.toTokenAmount / (10**quote.toToken.decimals));
      }
    }


  return (
    <form className={isLight ? styles.light : styles.dark}>
      <div className="w-full rounded-3xl p-2 select-none">
        <SwapFormHeader />
        <SwapFormInput
          initial={true}
          tokenList={tokenList}
          choose={setFirstToken}
          selected={firstToken}
          getQuote={getQuoteFirst}
          value={firstAmount}
        />
        <SwapFormInput
          tokenList={tokenList}
          choose={setSecondToken}
          selected={secondToken}
          getQuote={getQuoteSecond}
          value={secondAmount}
        />
        {!isAuthenticated && <SwapButton setLoginModalOpen={setLoginModalOpen} />}
      </div>
    </form>
  );
};

const styles = {
  light: "border-2 border-orange-400 bg-orange-400 rounded-3xl h-80 w-11/12 sm:w-[500px]",
  dark: "border-2 border-blue-700 bg-blue-700 rounded-3xl h-80 w-11/12 sm:w-[500px]",
};

export default SwapForm;
