import React from "react";
import useWindowWidth from "../../hooks/useWindowWidth";
import { useTranslation } from "react-i18next";

const NavTabSwitcher = (): JSX.Element => {
  const { t } = useTranslation();
  const windowWidth = useWindowWidth();
  const isDesktop = windowWidth >= 920;

  return (
    <div
      className={`${isDesktop ? "basis-2/4" : ""} h-5/6 flex items-center justify-center`}
    >
      <div className=" w-52 h-full flex justify-evenly border rounded-3xl bg-gray-200 select-none">
        <a
          href="/"
          className="flex items-center justify-center bg-gray-100 rounded-3xl text-black w-full"
        >
          {t("nav.swap")}
        </a>
        <a
          href="/"
          className="flex items-center justify-center rounded-3xl text-gray-500 w-full"
        >
          {t("nav.charts")}
        </a>
      </div>
    </div>
  );
};

export default NavTabSwitcher;
