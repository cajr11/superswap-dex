import React from "react";
import { useTranslation } from "react-i18next";
import ThemeContext from "../../context/theme-context";
import { useMoralis } from "react-moralis"; 
import Moralis from "moralis";
type SwapButtonProps = {
  setLoginModalOpen(val: boolean): void;
};

const SwapButton = ({ setLoginModalOpen }: SwapButtonProps): JSX.Element => {
  const { t } = useTranslation();
  const { isLight } = React.useContext(ThemeContext);
  const { isAuthenticated } = useMoralis();

  const swap = async() => {
    const makeSwap = await Moralis.Plugins.oneInch.swap
  }

  const options = {
    chain: 'bsc', // The blockchain you want to use (eth/bsc/polygon)
    fromTokenAddress: '0x0da6ed8b13214ff28e9ca979dd37439e8a88f6c4', // The token you want to swap
    toTokenAddress: '0x6fd7c98458a943f469e1cf4ea85b173f5cd342f4', // The token you want to receive
    amount: 1000,
    fromAddress: '0x6217e65d864d77DEcbFF0CFeFA13A93f7C1dD064', // Your wallet address
    slippage: 1,
  }

  const handleClick = () => {
    if (!isAuthenticated) {
      setLoginModalOpen(true);
    } else if (isAuthenticated){
    }
  }

  return (
    <div
      className={isLight ? styles.lightContainer : styles.darkContainer}
      onClick={handleClick}
    >
      {!isAuthenticated && <div className={isLight ? styles.lightButton : styles.darkButton}>
        {t("swap_form.connect")}
      </div>}
      {isAuthenticated &&  <div className={isLight ? styles.lightButton : styles.darkButton}>
        {t("swap_form.swap")}
      </div>}
    </div>
  );
};

const styles = {
  lightContainer: "border-orange-300 h-16 w-full rounded-3xl",
  darkContainer: "border-blue-500 h-16 w-full rounded-3xl",
  lightButton:
    "h-full w-full rounded-3xl flex justify-center items-center bg-orange-500 text-white font-semibold cursor-pointer",
  darkButton:
    "h-full w-full rounded-3xl flex justify-center items-center bg-blue-500 text-white font-semibold cursor-pointer",
};

export default SwapButton;
