import React from "react";
import { useTranslation } from "react-i18next";
import ThemeContext from "../../context/theme-context";
import { useMoralis } from "react-moralis";

type SwapButtonProps = {
  setLoginModalOpen(val: boolean): void;
  trySwap(): void;
};

const SwapButton = ({ setLoginModalOpen, trySwap }: SwapButtonProps): JSX.Element => {
  const { t } = useTranslation();
  const { isLight } = React.useContext(ThemeContext);
  const { isAuthenticated } = useMoralis();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setLoginModalOpen(true);
    } else if (isAuthenticated) {
      trySwap();
    }
  };

  return (
    <button
      className={isLight ? styles.lightContainer : styles.darkContainer}
      onClick={handleClick}
    >
      {!isAuthenticated && (
        <div className={isLight ? styles.lightButton : styles.darkButton}>
          {t("swap_form.connect")}
        </div>
      )}
      {isAuthenticated && (
        <div className={isLight ? styles.lightButton : styles.darkButton}>
          {t("swap_form.swap")}
        </div>
      )}
    </button>
  );
};

const styles = {
  lightContainer: "border-orange-300 h-16 w-full rounded-3xl",
  darkContainer: "border-blue-500 h-16 w-full rounded-3xl",
  lightButton:
    "h-full w-full rounded-3xl flex justify-center items-center bg-orange-500 text-white font-semibold cursor-pointer",
  darkButton:
    "h-full w-full rounded-3xl flex justify-center items-center bg-blue-500 text-white font-semibold cursor-pointer",
};

export default SwapButton;
