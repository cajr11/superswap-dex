import React from "react";
import useWindowWidth from "../../hooks/useWindowWidth";
import { useTranslation } from "react-i18next";
import ThemeContext from "../../context/theme-context";

const NavTabSwitcher = (): JSX.Element => {
  const { t } = useTranslation();
  const windowWidth = useWindowWidth();
  const isDesktop = windowWidth >= 920;
  const { isLight } = React.useContext(ThemeContext);

  return (
    <div
      className={`${isDesktop ? "basis-2/4" : ""} h-5/6 flex items-center justify-center`}
    >
      <div className={isLight ? styles.light : styles.dark}>
        <a
          href="/"
          className={isLight ? styles.swapLight : styles.swapDark}
        >
          {t("nav.swap")}
        </a>
        <a
          href="/"
          className=" flex items-center justify-center rounded-3xl text-gray-500 w-full"
        >
          {t("nav.transactions")}
        </a>
      </div>
    </div>
  );
};

const styles = {
  light: "w-52 h-full flex justify-evenly rounded-3xl bg-gray-200 select-none",
  dark: "w-52 h-full flex justify-evenly rounded-3xl bg-gray-800 select-none",
  swapDark: "flex items-center justify-center bg-blue-600 rounded-3xl text-gray-50 w-1/2",
  swapLight: "flex items-center justify-center bg-white rounded-3xl text-black w-1/2",
}

export default NavTabSwitcher;
