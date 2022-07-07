import React from "react";
import { useTranslation } from "react-i18next";
import ThemeContext from "../../context/theme-context";

type SwapButtonProps = {
  setLoginModalOpen(val: boolean): void;
}

const SwapButton = ({ setLoginModalOpen}: SwapButtonProps): JSX.Element => {
  const { t } = useTranslation();
  const { isLight } = React.useContext(ThemeContext);

  return (
    <div className={isLight ? styles.lightContainer : styles.darkContainer} onClick={() => setLoginModalOpen(true)}>
      <div className={isLight ? styles.lightButton : styles.darkButton}>
        {t("swap_form.connect")}
      </div>
    </div>
  );
};

const styles = {
  lightContainer: "border-orange-300 h-16 w-full rounded-3xl",
  darkContainer: "border-blue-500 h-16 w-full rounded-3xl",
  lightButton:
    "h-full w-full rounded-3xl flex justify-center items-center bg-orange-500 text-white font-semibold",
  darkButton:
    "h-full w-full rounded-3xl flex justify-center items-center bg-blue-500 text-white font-semibold",
};

export default SwapButton;
