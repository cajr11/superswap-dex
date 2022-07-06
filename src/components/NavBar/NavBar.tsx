import React from "react";
import { useTranslation } from "react-i18next";
import { ChevronDownIcon, DotsHorizontalIcon } from "@heroicons/react/solid";
import ethLogo from "../../assets/images/eth.png";
import NavLogo from "./NavLogo";
import NavTabSwitcher from "./NavTabSwitcher";
import useWindowWidth from "../../hooks/useWindowWidth";
import MoreOptionsDropDown from "./MoreOptionsDropDown";
import ThemeContext from "../../context/theme-context";
import { useMoralis } from "react-moralis";
import ChooseNetwork from "./ChooseNetwork";

const NavBar = (): JSX.Element => {
  const windowWidth = useWindowWidth();
  const isDesktop = windowWidth >= 920;
  const isBigDesktop = windowWidth >= 1250;
  const { t } = useTranslation();
  const [showOptions, setShowOptions] = React.useState(false);
  const { isLight } = React.useContext(ThemeContext);
  const { authenticate, isAuthenticated, logout } = useMoralis();

  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({ signingMessage: "Sign in with Superswap" })
        .then(function (user) {
          console.log(user!.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <nav className="w-screen h-20 bg-transparent p-3 mb-28">
      <div
        className={`w-full h-full flex items-center ${!isDesktop && "justify-between"}`}
      >
        <NavLogo />
        {isDesktop && <NavTabSwitcher />}
        <div
          className={`flex justify-end ${
            isDesktop ? "basis-1/4" : "basis-3/4"
          } space-x-2 h-12`}
        >
          <div className="flex items-center rounded-2xl bg-white p-2 select-none relative">
            <img src={ethLogo} alt="token logo" className="h-6 w-6 mr-1" />
            {isBigDesktop && (
              <span className="flex items-center mr-1 text-sm select-none">Ethereum</span>
            )}
            <ChevronDownIcon className="h-4 w-4" />
            <ChooseNetwork />
          </div>
          <button
            className={isLight ? styles.lightButton : styles.darkButton}
            onClick={login}
          >
            {t("nav.connect")}
          </button>
          <button onClick={logout}>logout</button>
          <div className="flex items-center justify-center rounded-2xl py-2 px-3 bg-white">
            <span
              className="h-full w-full flex items-center cursor-pointer"
              onClick={() => setShowOptions(!showOptions)}
            >
              <DotsHorizontalIcon className="h-5 w-5" />
            </span>
            {showOptions && <MoreOptionsDropDown />}
          </div>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  lightButton:
    "bg-orange-300 rounded-2xl p-2 border-2 border-white text-white text-semibold text-sm md:w-40 cursor-pointer select-none",
  darkButton:
    "bg-blue-500 rounded-2xl p-2 border-2 border-blue-400 text-white text-semibold text-sm md:w-40 cursor-pointer select-none",
};

export default NavBar;
