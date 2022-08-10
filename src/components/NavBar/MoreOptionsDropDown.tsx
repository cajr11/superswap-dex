import React from "react";
import { useTranslation } from "react-i18next";
import {
  GlobeIcon,
  MoonIcon,
  SunIcon,
  ChevronLeftIcon,
  CheckIcon,
} from "@heroicons/react/outline";
import { LanguageType } from "../../types";
import ThemeContext from "../../context/theme-context";
import i18n from "../../i18n";

type MoreOptionsDropDownProps = {
  showOptions(val: boolean): void;
};

const MoreOptionsDropDown = ({ showOptions }: MoreOptionsDropDownProps): JSX.Element => {
  const { t } = useTranslation();
  const [changeLanguage, setChangeLanguage] = React.useState(false);
  const [isSelected, setIsSelected] = React.useState<LanguageType>("en");
  const { isLight, changeTheme } = React.useContext(ThemeContext);

  const selectLanguage = (lng: string) => {
    setIsSelected(lng as LanguageType);
    i18n.changeLanguage(lng);
  }

  return (
    <span
      className="bg-white min-w-[180px] h-20 rounded-lg absolute right-3 top-20 shadow-md p-3 flex flex-col justify-between"
      onMouseLeave={() => showOptions(false)}
    >
      {changeLanguage === false && (
        <>
          <button
            className="w-full text-gray-400 flex justify-between text-sm cursor-pointer"
            onClick={() => setChangeLanguage(true)}
          >
            <span className="select-none">{t("nav.dropdown.language")}</span>
            <GlobeIcon className="h-4 w-4" />
          </button>
          {isLight && (
            <>
              <button
                className="w-full text-gray-400 flex justify-between text-sm cursor-pointer"
                onClick={changeTheme}
              >
                <span className="select-none">{t("nav.dropdown.dark")}</span>
                <MoonIcon className="h-4 w-4" />
              </button>
            </>
          )}
          {!isLight && (
            <>
              <button
                className="w-full text-gray-400 flex justify-between text-sm cursor-pointer"
                onClick={changeTheme}
              >
                <span className="select-none">{t("nav.dropdown.light")}</span>
                <SunIcon className="h-5 w-5" />
              </button>
            </>
          )}
        </>
      )}
      {changeLanguage === true && (
        <span className="h-full flex flex-col justify-between">
          <button
            className="w-full text-gray-400 flex justify-between text-sm mb-1 outline-none cursor-pointer"
            onClick={() => setChangeLanguage(false)}
          >
            <ChevronLeftIcon className="h-3 w-3" />
          </button>
          <button
            className="w-full text-gray-400 flex justify-between text-sm outline-none cursor-pointer"
            onClick={() => setIsSelected("en")}
          >
            <span className="select-none">{t("nav.language.english")}</span>
            {isSelected === "en" && <CheckIcon className="h-3 w-3" />}
          </button>
          <button
            className="w-full text-gray-400 flex justify-between text-sm outline-none cursor-pointer"
            onClick={() => setIsSelected("es")}
          >
            <span className="select-none">{t("nav.language.spanish")}</span>
            {isSelected === "es" && <CheckIcon className="h-3 w-3" />}
          </button>
        </span>
      )}
    </span>
  );
};

export default MoreOptionsDropDown;
