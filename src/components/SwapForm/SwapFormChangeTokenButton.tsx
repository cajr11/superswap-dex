import React from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import ethLogo from "../../assets/images/eth.png";
import maticLogo from "../../assets/images/matic.svg";
import bscLogo from "../../assets/images/bsc.png";
import { useTranslation } from "react-i18next";
import ThemeContext from "../../context/theme-context";
import ChainContext from "../../context/chain-context";

type SwapFormChangeTokenButtonProps = {
  initial?: boolean;
  select(val: boolean): void;
};

const SwapFormChangeTokenButton = ({
  initial,
  select,
}: SwapFormChangeTokenButtonProps): JSX.Element => {
  const { t } = useTranslation();
  const { isLight } = React.useContext(ThemeContext);
  const chainCtx = React.useContext(ChainContext);

  return (
    <div
      className={`flex whitespace-nowrap ml-1 rounded-3xl p-2 cursor-pointer ${
        initial ? "bg-gray-200" : `${isLight ? styles.changeLight : styles.changeDark}`
      }`}
      onClick={() => select(true)}
    >
      {initial && chainCtx.chain === "eth" && (
        <img src={ethLogo} alt="token logo" className="h-6 w-6" />
      )}
      {initial && chainCtx.chain === "polygon" && (
        <img src={maticLogo} alt="token logo" className="h-6 w-6" />
      )}
      {initial && chainCtx.chain === "bsc" && (
        <img src={bscLogo} alt="token logo" className="h-6 w-6" />
      )}
      <span
        className={`flex items-center ml-2 ${initial && "pr-2"} text-sm md:text-base`}
      >
        {initial && chainCtx.chain === "eth" && "ETH"}
        {initial && chainCtx.chain === "bsc" && "BSC"}
        {initial && chainCtx.chain === "polygon" && "MATIC"}
        {!initial && t("swap_form.select")}
        <ChevronDownIcon className={`h-4 w-4 ${initial && "mr-2"}`} />
      </span>
    </div>
  );
};

const styles = {
  changeLight: "bg-orange-400 text-white",
  changeDark: "bg-blue-400 text-white",
};

export default SwapFormChangeTokenButton;
