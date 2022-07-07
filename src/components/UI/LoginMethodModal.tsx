import React from "react";
import { useTranslation } from "react-i18next";
import { XIcon } from "@heroicons/react/solid";
import {
  DuplicateIcon,
  ExternalLinkIcon,
  CheckCircleIcon,
} from "@heroicons/react/outline";
import wc from "../../assets/images/wc.svg";
import metamask from "../../assets/images/metamask.png";
import ThemeContext from "../../context/theme-context";
import { useMoralis } from "react-moralis";
import { Oval } from "react-loader-spinner";
import ChainContext from "../../context/chain-context";

type LoginMethodModalProps = {
  close(val: boolean): void;
};

const LoginMethodModal = ({ close }: LoginMethodModalProps): JSX.Element => {
  const { t } = useTranslation();
  const themeCtx = React.useContext(ThemeContext);
  const chainCtx = React.useContext(ChainContext);
  const [isCopying, setisCopying] = React.useState(false);
  const [walletChosen, setWalletChosen] = React.useState("");
  const { authenticate, isAuthenticated, logout, isAuthenticating, user } = useMoralis();
  const address = user?.attributes.ethAddress;
  const shortUserAddress =
    String(user?.attributes.ethAddress).slice(0, 6) +
    "..." +
    String(user?.attributes.ethAddress).slice(-4);

  const loginMetamask = async () => {
    if (!isAuthenticated) {
      await authenticate({
        provider: "metamask",
        signingMessage: "Sign in with Superswap",
        chainId: 0x1,
      })
        .then(function (user) {
          console.log(user!.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
      setWalletChosen("Metamask");
    }
  };

  const loginWC = async () => {
    if (!isAuthenticated) {
      await authenticate({
        provider: "walletconnect",
        signingMessage: "Sign in with Superswap",
      })
        .then(function (user) {
          console.log(user!.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    setWalletChosen("WalletConnect");
  };

  const handleCopy = () => {
    setisCopying(true);
    navigator.clipboard.writeText(address);
    setTimeout(() => {
      setisCopying(false);
    }, 1000);
  };

  return (
    <>
      <div
        className="absolute w-screen h-screen bg-gray-500 z-40 opacity-30"
        onClick={() => close(false)}
      ></div>
      {/* Header */}
      <div className={themeCtx.isLight ? styles.lightContainer : styles.darkContainer}>
        <div className="h-10 w-full flex flex-row justify-between items-center px-5">
          {!isAuthenticated && (
            <span className="font-semibold text-lg">{t("login.connect")}</span>
          )}
          {isAuthenticated && (
            <span className="font-semibold text-lg">{t("login.account")}</span>
          )}
          <XIcon className="h-6 w-6 cursor-pointer" onClick={() => close(false)} />
        </div>

        {/* Login choices */}
        {!isAuthenticating && !isAuthenticated && (
          <div className="flex-1 rounded-2xl p-2 flex flex-col justify-between">
            <div
              className={`w-full h-[73px] flex justify-between items-center py-2 px-4 rounded-2xl ${themeCtx.isLight ? "bg-gray-100" : "bg-blue-800"} cursor-pointer`}
              onClick={loginMetamask}
            >
              <span>{t("login.metamask")}</span>
              <img src={metamask} alt="metamask" className="h-8 w-8" />
            </div>

            <div
              className={`w-full h-[73px] flex justify-between items-center py-2 px-4 rounded-2xl ${themeCtx.isLight ? "bg-gray-100" : "bg-blue-800"} cursor-pointer`}
              onClick={loginWC}
            >
              <span>{t("login.wc")}</span>
              <img src={wc} alt="wallet connect" className="h-8 w-8" />
            </div>
          </div>
        )}

        {/* Copy and address */}
        {isAuthenticating && (
          <div className="flex flex-1 justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <Oval
                ariaLabel="loading-indicator"
                height={50}
                width={50}
                strokeWidth={5}
                color="black"
                secondaryColor="grey"
              />
              <span>{t("login.authenticate")}</span>
            </div>
          </div>
        )}
        {isAuthenticated && (
          <div className="flex flex-1 p-5 rounded-2xl">
            <div className="flex flex-1 flex-col border rounded-2xl">
              <div className="px-2 pt-3 flex items-center justify-between w-full">
                <span className=" text-gray-500 font-medium text-xs md:text-base w-2/3">
                  {t("login.connected", { wallet: walletChosen })}
                </span>
                <span
                  className="w-1/3 border h-9 text-sm flex items-center justify-center rounded-2xl border-orange-400 text-orange-400 cursor-pointer"
                  onClick={logout}
                >
                  {t("login.disconnect")}
                </span>
              </div>

              <div className="px-4 py-2 text-xl font-semibold">{shortUserAddress}</div>

              <div className="p-4 text-xl font-semibold flex justify-between">
                {!isCopying && (
                  <span
                    className="text-gray-500 flex items-center text-sm cursor-copy"
                    onClick={handleCopy}
                  >
                    <DuplicateIcon className="h-4 w-4 mr-1" />
                    {t("login.copy")}
                  </span>
                )}
                {isCopying && (
                  <span
                    className="text-gray-500 flex items-center text-sm"
                    onClick={handleCopy}
                  >
                    <CheckCircleIcon className="h-4 w-4 mr-1" />
                    {t("login.copied")}
                  </span>
                )}
                {chainCtx.chain === "eth" && (
                  <a
                    href={`https://etherscan.io/address/${address}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm flex text-gray-500"
                  >
                    <ExternalLinkIcon className="h-4 w-4" />
                    {t("login.view")}
                  </a>
                )}
                {chainCtx.chain === "polygon" && (
                  <a
                    href={`https://polygonscan.com/address/${address}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm flex text-gray-500"
                  >
                    <ExternalLinkIcon className="h-4 w-4" />
                    {t("login.view")}
                  </a>
                )}
                {chainCtx.chain === "bsc" && (
                  <a
                    href={`https://bscscan.com/address/${address}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm flex text-gray-500"
                  >
                    <ExternalLinkIcon className="h-4 w-4" />
                    {t("login.view")}
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const styles = {
  lightContainer: `absolute w-[350px] h-[260px] bottom-0 left-0 top-0 right-0 m-auto bg-white rounded-t-2xl z-40 py-5 flex flex-col md:w-[450px] md:h-[220px] md:pb-2 rounded-xl md:py-2 md:pb-0`,
  darkContainer:
    "absolute w-[350px] h-[260px] bottom-0 left-0 top-0 right-0 m-auto bg-blue-900 rounded-t-2xl z-40 py-5 flex flex-col md:w-[450px] md:h-[220px] md:pb-2 rounded-xl md:py-2 md:pb-0 text-gray-200",
};

export default LoginMethodModal;
