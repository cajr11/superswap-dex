import React from "react";
import useWindowWidth from "../../hooks/useWindowWidth";
import { useTranslation } from "react-i18next";
import ThemeContext from "../../context/theme-context";
import { Link, useLocation } from "react-router-dom";

const NavTabSwitcher = (): JSX.Element => {
  const { t } = useTranslation();
  const windowWidth = useWindowWidth();
  const isDesktop = windowWidth >= 920;
  const { isLight } = React.useContext(ThemeContext);
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <div
      className={`${isDesktop ? "basis-2/4" : ""} h-5/6 flex items-center justify-center`}
    >
      <div className={isLight ? styles.light : styles.dark}>
        <Link
          to="/#/swap?chain=mainnet"
          className={`flex items-center justify-center rounded-3xl w-1/2 ${pathName === "/" && !isLight ? "bg-blue-600 text-gray-50" : "text-white"} ${pathName === "/" && isLight ? "bg-white" : ""}`}
        >
          {t("nav.swap")}
        </Link>
        <Link
          to="/transactions"
          className={`flex items-center justify-center rounded-3xl w-full ${isLight && pathName !== "/" ? "bg-white" : ""} ${pathName !== "/" && !isLight ? "bg-blue-600 text-gray-50" : "text-white"}`}
        >
          {t("nav.transactions")}
        </Link>
      </div>
    </div>
  );
};

const styles = {
  light: "w-52 h-full flex justify-evenly rounded-3xl bg-gray-200 select-none",
  dark: "w-52 h-full flex justify-evenly rounded-3xl bg-blue-400 select-none",
  swapDark: "flex items-center justify-center bg-blue-600 rounded-3xl text-gray-50 w-1/2",
  swapLight: "flex items-center justify-center bg-white rounded-3xl w-1/2",
  transactionLight: "flex items-center justify-center rounded-3xl w-full",
  transctionDark: "flex items-center justify-center rounded-3xl text-white w-full",
};

export default NavTabSwitcher;
