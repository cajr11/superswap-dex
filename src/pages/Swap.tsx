import React from "react";
import SwapForm from "../components/SwapForm/SwapForm";
import { TokenList } from "../types";

type SwapProps = {
  tokenList: TokenList;
  setLoginModalOpen(val: boolean): void;
};

const Swap = ({ tokenList, setLoginModalOpen }: SwapProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <SwapForm tokenList={tokenList} setLoginModalOpen={setLoginModalOpen} />
    </div>
  );
};

export default Swap;

const styles = {
  container: "flex items-center justify-center flex-grow",
};
