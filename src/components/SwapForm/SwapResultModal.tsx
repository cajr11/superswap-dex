import React from "react";
import { XIcon } from "@heroicons/react/solid";
import { ArrowCircleUpIcon } from "@heroicons/react/outline";
import { useTranslation } from "react-i18next";
import ThemeContext from "../../context/theme-context";
import { Circles } from "react-loader-spinner";
import ChainContext from "../../context/chain-context";

type SwapModalResultProps = {
  closeModal(): void;
  txHash: string;
  errorMessage: string;
};

const SwapResultModal = ({
  closeModal,
  txHash,
  errorMessage,
}: SwapModalResultProps): JSX.Element => {
  const { t } = useTranslation();
  const { isLight } = React.useContext(ThemeContext);
  const { chain } = React.useContext(ChainContext);
  const [href, setHref] = React.useState("https://etherscan.io/tx/");

  React.useEffect(() => {
    if (chain === "eth") setHref("https://etherscan.io/tx/");
    if (chain === "bsc") setHref("https://bscscan.com/tx");
    if (chain === "polygon") setHref("https://polygonscan.com/tx/");
  }, [chain]);

  return (
    <>
      <div
        className="absolute w-screen h-screen bg-gray-500 z-20 opacity-30"
        onClick={closeModal}
      ></div>
      <div
        className={`absolute ${
          isLight ? "bg-white" : "bg-blue-800"
        } z-40 rounded-2xl h-[350px] w-[308px] left-0 top-0 right-0 bottom-0 m-auto md:w-[350px]`}
      >
        <div className="flex justify-end items-center w-full px-3 h-[15%]">
          <XIcon
            className={isLight ? styles.lightX : styles.darkX}
            onClick={closeModal}
          />
        </div>
        {txHash === "" && errorMessage === "" && (
          <div className="h-[60%] flex justify-center items-center">
            <Circles height={50} width={50} color={isLight ? "#d97706" : "#3b82f6"} />
          </div>
        )}
        {txHash !== "" && (
          <div className="h-[60%] flex flex-col justify-center items-center">
            <ArrowCircleUpIcon
              className={isLight ? styles.arrowLight : styles.arrowDark}
            />
            <div className={isLight ? styles.lightHeadingsMain : styles.darkHeadingsMain}>
              {t("transaction.submitted")}
            </div>
            <a
              className={isLight ? styles.lightHeadings : styles.darkHeadings}
              href={href + txHash}
              target="_blank"
              rel="noreferrer"
            >
              {t("transaction.view")}
            </a>
          </div>
        )}
        {errorMessage !== "" && (
          <div className="h-[60%] flex justify-center items-center">
            <div
              className={isLight ? styles.lightHeadingsError : styles.darkHeadingsError}
            >
              {errorMessage}
            </div>
          </div>
        )}
        <div className="h-[25%] w-[100%] flex items-center justify-center pb-2">
          <button
            className={isLight ? styles.lightButton : styles.darkButton}
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default SwapResultModal;

const styles = {
  lightX: "h-6 w-6 cursor-pointer text-orange-400",
  darkX: "h-6 w-6 cursor-pointer text-blue-400",
  arrowDark: "h-24 w-24 mb-2 text-blue-400",
  arrowLight: "h-24 w-24 mb-2 text-orange-400",
  darkHeadings: "text-white text-sm",
  lightHeadings: "text-orange-300 text-sm",
  darkHeadingsMain: "text-white",
  lightHeadingsMain: "text-orange-300",
  darkButton: "w-[90%] h-[80%] bg-blue-500 text-center rounded-xl text-white",
  lightButton: "w-[90%] h-[80%] bg-orange-400 text-center rounded-xl text-white",
  lightHeadingsError: "text-orange-300 text-sm text-center",
  darkHeadingsError: "text-white text-sm text-center",
};
