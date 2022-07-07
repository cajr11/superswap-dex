import React from "react";
import { useTranslation } from "react-i18next";
import { ChevronDownIcon, DotsHorizontalIcon } from "@heroicons/react/solid";
import ethLogo from "../../assets/images/eth.png";
import maticLogo from "../../assets/images/matic.svg";
import bscLogo from "../../assets/images/bsc.png";
import NavLogo from "./NavLogo";
import NavTabSwitcher from "./NavTabSwitcher";
import useWindowWidth from "../../hooks/useWindowWidth";
import MoreOptionsDropDown from "./MoreOptionsDropDown";
import ThemeContext from "../../context/theme-context";
import ChooseNetwork from "./ChooseNetwork";
import { Chain } from "../../types";
import LoginMethodModal from "../UI/LoginMethodModal";

const NavBar = (): JSX.Element => {
  const { t } = useTranslation();
  const windowWidth = useWindowWidth();
  const isDesktop = windowWidth >= 920;
  const isBigDesktop = windowWidth >= 1250;
  const { isLight } = React.useContext(ThemeContext);
  const [chooseNetwork, setChooseNetwork] = React.useState(false);
  const [activeChain, setActiveChain] = React.useState<Chain>("eth");
  const [showOptions, setShowOptions] = React.useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);

  return (
    <>
      {isLoginModalOpen && <LoginMethodModal close={setIsLoginModalOpen} />}
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
            <div
              className="flex items-center rounded-2xl bg-white p-2 select-none relative"
              onMouseEnter={() => setChooseNetwork(true)}
            >
              {activeChain === "eth" && (
                <img src={ethLogo} alt="token logo" className="h-6 w-6 mr-1" />
              )}
              {activeChain === "polygon" && (
                <img src={maticLogo} alt="token logo" className="h-6 w-6 mr-1" />
              )}
              {activeChain === "bsc" && (
                <img src={bscLogo} alt="token logo" className="h-6 w-6 mr-1" />
              )}
              {isBigDesktop && (
                <span className="flex items-center mr-1 text-sm select-none">
                  {activeChain === "eth" && t("choose-network.networks.eth")}
                  {activeChain === "polygon" && t("choose-network.networks.matic")}
                  {activeChain === "bsc" && t("choose-network.networks.bsc")}
                </span>
              )}
              <ChevronDownIcon className="h-4 w-4" />
              {chooseNetwork && (
                <ChooseNetwork
                  isChoosing={setChooseNetwork}
                  activeChain={activeChain}
                  chooseChain={setActiveChain}
                />
              )}
            </div>
            <div
              className={isLight ? styles.lightButton : styles.darkButton}
              onClick={() => setIsLoginModalOpen(true)}
            >
              {t("nav.connect")}
            </div>
            {/* <button onClick={logout}>logout</button> */}
            <div className="flex items-center justify-center rounded-2xl py-2 px-3 bg-white">
              <span
                className="h-full w-full flex items-center cursor-pointer"
                onClick={() => setShowOptions(!showOptions)}
              >
                <DotsHorizontalIcon className="h-5 w-5" />
              </span>
              {showOptions && <MoreOptionsDropDown showOptions={setShowOptions} />}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

const styles = {
  lightButton:
    "bg-orange-300 rounded-2xl p-2 border-2 border-white text-white text-semibold text-sm md:w-40 cursor-pointer select-none",
  darkButton:
    "bg-blue-500 rounded-2xl p-2 border-2 border-blue-400 text-white text-semibold text-sm md:w-40 cursor-pointer select-none",
};

export default NavBar;
