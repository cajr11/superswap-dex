import React from "react";
import SwapForm from "../components/SwapForm/SwapForm";
import { TokenList } from "../types";

type SwapProps = {
  tokenList: TokenList;
  setLoginModalOpen(val: boolean): void;
  openTransactionModal(val: boolean): void;
  getTxHash(hash: string): void;
  getErrorMessage(message: string): void;
  setMadeTx(val: boolean): void;
};

const Swap = ({
  tokenList,
  setLoginModalOpen,
  openTransactionModal,
  getTxHash,
  getErrorMessage,
  setMadeTx,
}: SwapProps): JSX.Element => {
  return (
    <>
      <div className={styles.container}>
        <SwapForm
          tokenList={tokenList}
          setLoginModalOpen={setLoginModalOpen}
          openTransactionModal={openTransactionModal}
          getTxHash={getTxHash}
          getErrorMessage={getErrorMessage}
          setMadeTx={setMadeTx}
        />
      </div>
    </>
  );
};

export default Swap;

const styles = {
  container: "flex items-center justify-center flex-grow",
};
