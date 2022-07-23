import React from "react";
import SwapFormHeader from "./SwapFormHeader";
import SwapFormInput from "./SwapFormInput";
import SwapButton from "./SwapButton";
import ThemeContext from "../../context/theme-context";
import type { TokenList } from "../../types";
import type { SelectedToken } from "../../types";
import ChainContext from "../../context/chain-context";
import { useMoralis, useOneInchSwap } from "react-moralis";
import Moralis from "moralis";
import { useTranslation } from "react-i18next";

type SwapFormProps = {
  tokenList: TokenList;
  setLoginModalOpen(val: boolean): void;
};

const SwapForm = ({ tokenList, setLoginModalOpen }: SwapFormProps): JSX.Element => {
  const { isLight } = React.useContext(ThemeContext);
  const { chain } = React.useContext(ChainContext);
  const { user } = useMoralis();
  const { t } = useTranslation();
  const [firstToken, setFirstToken] = React.useState<SelectedToken>({decimals: 0});
  const [secondToken, setSecondToken] = React.useState<SelectedToken>({decimals: 0});
  const [firstAmount, setFirstAmount] = React.useState<number | undefined| string>();
  const [secondAmount, setSecondAmount] = React.useState<number | undefined| string>();
  const [gas, setGas] = React.useState<number | undefined>()

    const getQuoteFirst = async (val: string) => {
     const amount =  Number(Number(val) * (10**firstToken.decimals));
     setFirstAmount(val)
      if (amount === 0 || amount === undefined) {
        setFirstAmount("")
        setSecondAmount("")
        setGas(undefined)
        setTimeout(() => {
          if (secondAmount !== "") {
            setSecondAmount("")
          }
        }, 300)
      } else if (firstToken.address && secondToken.address) {
        const quote = await Moralis.Plugins.oneInch.quote({
          chain, // The blockchain you want to use (eth/bsc/polygon)
          fromTokenAddress: firstToken.address, // The token you want to swap
          toTokenAddress: secondToken.address, // The token you want to receive
          amount
        });
        setSecondAmount(quote.toTokenAmount / (10**quote.toToken.decimals));
        setGas(quote.estimatedGas);
      }
    };

    const getQuoteSecond = async(val: string) => {
      const amount = Number(Number(val) * (10**secondToken.decimals))
      setSecondAmount(val);
      if (amount === 0 || amount === undefined) {
        setFirstAmount("")
        setSecondAmount("")
        setGas(undefined)
        setTimeout(() => {
          if (firstAmount !== "") {
            setFirstAmount("")
          }
        }, 300)
      } else if (firstToken.address && secondToken.address) {
        const quote = await Moralis.Plugins.oneInch.quote({
          chain, // The blockchain you want to use (eth/bsc/polygon)
          fromTokenAddress: secondToken.address, // The token you want to swap
          toTokenAddress: firstToken.address, // The token you want to receive
          amount,
        });
        setFirstAmount(quote.toTokenAmount / (10**quote.toToken.decimals));
        setGas(quote.estimatedGas);
      }
    }
    console.log(firstToken.address);
    console.log(secondToken.address);
  

    const makeSwap = async () => {
      const amount =  Number(Number(firstAmount) * (10**firstToken.decimals));
      const address = Moralis.User.current()?.get("ethAddress")
      console.log(address);

      const options = {
        chain: "eth",
        fromTokenAddress: "0x04fa0d235c4abf4bcf4787af4cf447de572ef828",
        toTokenAddress: "0x0327112423f3a68efdf1fcf402f6c5cb9f7c33fd",
        amount,
        fromAddress: "0x254a9b31a4e6a679b7202d3290d7c7ca0f92d28a",
        slippage: 1
      }
      await Moralis.Plugins.oneInch.approve({
        chain: 'eth', // The blockchain you want to use (eth/bsc/polygon)
        tokenAddress: "0x04fa0d235c4abf4bcf4787af4cf447de572ef828", // The token you want to swap
        fromAddress: "0x254a9b31a4e6a679b7202d3290d7c7ca0f92d28a", // Your wallet address
      });

      await Moralis.Plugins.oneInch.swap(options)
     

      
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
          changeValue={setFirstAmount}
          changeCounterValue={setSecondAmount}
        />
        <SwapFormInput
          tokenList={tokenList}
          choose={setSecondToken}
          selected={secondToken}
          getQuote={getQuoteSecond}
          value={secondAmount}
          changeValue={setFirstAmount}
          changeCounterValue={setFirstAmount}
        />
       {gas && <div className="w-full h-3 flex items-center justify-center py-4">
          <div className="w-[95%] h-full flex items-center justify-end text-sm text-white font-semibold">{t("swap_form.estimated")}{gas}</div>
        </div>}
        <SwapButton setLoginModalOpen={setLoginModalOpen} trySwap={makeSwap} />
      </div>
    </form>
  );
};

const styles = {
  light: "border-2 border-orange-400 bg-orange-400 rounded-3xl h-90 w-11/12 sm:w-[500px]",
  dark: "border-2 border-blue-700 bg-blue-700 rounded-3xl h-90 w-11/12 sm:w-[500px]",
};

export default SwapForm;
