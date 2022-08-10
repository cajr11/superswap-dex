import React from "react";
import SwapForm from "../components/SwapForm/SwapForm";
import { TokenList } from "../types";

type SwapProps = {
  tokenList: TokenList;
  setLoginModalOpen(val: boolean): void;
  openTransactionModal(val: boolean): void;
  getTxHash(hash: string): void;
  getErrorMessage(message: string): void;
};

const Swap = ({
  tokenList,
  setLoginModalOpen,
  openTransactionModal,
  getTxHash,
  getErrorMessage,
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
        />
      </div>
    </>
  );
};

export default Swap;

const styles = {
  container: "flex items-center justify-center flex-grow",
};
