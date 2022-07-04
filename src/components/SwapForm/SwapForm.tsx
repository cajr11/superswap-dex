import React from "react";
import SwapFormHeader from "./SwapFormHeader";
import SwapFormInput from "./SwapFormInput";
import SwapButton from "./SwapButton";
import ThemeContext from "../../context/theme-context";

const SwapForm = (): JSX.Element => {
  const { isLight } = React.useContext(ThemeContext)


  return (
    <form className={isLight ? styles.light : styles.dark}>
      <div className="w-full rounded-3xl p-2">
        <SwapFormHeader />
        <SwapFormInput initial={true} />
        <SwapFormInput />
        <SwapButton />
      </div>
    </form>
  );
};

const styles = {
  light: "border-2 border-orange-400 bg-orange-400 rounded-3xl h-80 w-11/12 sm:w-[500px]",
  dark: "border-2 border-blue-700 bg-blue-700 rounded-3xl h-80 w-11/12 sm:w-[500px]"
}

export default SwapForm;
