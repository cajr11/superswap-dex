import React from "react";
import SwapForm from "../components/SwapForm/SwapForm";

const Swap = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <SwapForm />
    </div>
  );
};

export default Swap;

const styles = {
  container: "flex items-center justify-center flex-grow",
};
