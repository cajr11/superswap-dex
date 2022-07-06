import React from "react";
import SwapForm from "../components/SwapForm/SwapForm";
import { TokenList } from "../types";

type SwapProps = {
  tokenList: TokenList;
};

const Swap = ({ tokenList }: SwapProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <SwapForm tokenList={tokenList} />
    </div>
  );
};

export default Swap;

const styles = {
  container: "flex items-center justify-center flex-grow",
};
