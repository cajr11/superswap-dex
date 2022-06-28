import React from "react";
import SwapForm from "../components/SwapForm/SwapForm";

const Swap = (): JSX.Element => {
  return (
    <div className={styles.containerLight}>
      <SwapForm />
    </div>
  );
};

export default Swap;

const styles = {
  containerLight:
    "w-full h-full bg-gradient-to-r from-amber-500 via-amber-600 to-red-700 flex items-center justify-center",
  containerDark:
    "h-full w-full bg-gradient-to-r from-indigo-800 via-blue-900 to-zinc-800",
};
