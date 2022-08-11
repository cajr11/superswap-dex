import React, { useContext } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import ThemeContext from "../context/theme-context";
import { useTranslation } from "react-i18next";
import Moralis from "moralis";
import { ChainHex, TransactionList } from "../types";
import ChainContext from "../context/chain-context";

type TransactionsProps = {
  setLoginModalOpen(val: boolean): void;
  madeTx: boolean;
  setMadeTx(val: boolean): void;
};

const Transactions = ({
  setLoginModalOpen,
  madeTx,
  setMadeTx,
}: TransactionsProps): JSX.Element => {
  const { isAuthenticated } = useMoralis();
  const { isLight } = React.useContext(ThemeContext);
  const { t } = useTranslation();
  const Web3Api = useMoralisWeb3Api();
  const [transactions, setTransactions] = React.useState<TransactionList>();
  const [chainHex, setChainHex] = React.useState<ChainHex>("0x1");
  const [PrevChainHex, setPrevChainHex] = React.useState<ChainHex>("0x1");
  const { chain } = useContext(ChainContext);

  React.useEffect(() => {
    if (chain === "eth") {
      setPrevChainHex(chainHex);
      setChainHex("0x1");
    }
    if (chain === "polygon") {
      setPrevChainHex(chainHex);
      setChainHex("0x89");
    }
    if (chain === "bsc") {
      setPrevChainHex(chainHex);
      setChainHex("0x38");
    }
  }, [chain, chainHex]);

  React.useEffect(() => {
    const fetchTransactions = async () => {
      const address = await Moralis.User.current()?.get("ethAddress");
      const txs = await Web3Api.account.getTransactions({
        chain: chainHex,
        address,
      });
      setTransactions(txs.result);
    };

    if (!transactions) {
      fetchTransactions();
    }

    if (madeTx) {
      fetchTransactions();
      setMadeTx(false);
    }

    if (chainHex !== PrevChainHex) {
      fetchTransactions();
    }
  }, [transactions, Web3Api, madeTx, setMadeTx, chainHex, PrevChainHex]);


  return (
    <div className="flex items-center justify-center flex-grow">
      {!isAuthenticated && (
        <div className={isLight ? styles.light : styles.dark}>
          <button
            className={isLight ? styles.connectLight : styles.connectDark}
            onClick={() => setLoginModalOpen(true)}
          >
            {t("transactions.connect")}
          </button>
        </div>
      )}
      {isAuthenticated && (
        <div className="flex flex-col justify-center">
          <h1
            className={`w-[300px] sm:w-[500px] text-center mb-4 text-sm sm:text-3xl underline underline-offset-4 ${
              isLight ? "text-gray-50" : "text-white"
            }`}
          >
            {t("transactions.transactions")}
          </h1>
          <div className={isLight ? styles.txLight : styles.txDark}>
            <div
              className={`w-full h-[40px] rounded-t-3xl flex items-center border px-4 text-white ${
                isLight ? "bg-orange-300" : ""
              }`}
            >
              <span className="w-2/12 font-semibold">{t("transactions.no")}</span>
              <span className="w-10/12  font-semibold">{t("transactions.hash")}</span>
            </div>
            <div
              className={`w-full h-[256px] sm:h-[456px] rounded-b-3xl flex flex-col border  overflow-y-scroll px-4 ${
                isLight ? "bg-orange-400" : "bg-blue-400"
              }`}
            >
              {transactions &&
                transactions?.map((tx, index) => (
                  <div
                    key={index}
                    className={`overflow-x-scroll min-h-[50px] px-4 pr-6 border border-x-0 border-t-0 border-b-white flex items-center`}
                  >
                    <div className="w-2/12 font-semibold text-white">{index + 1}</div>
                    <div className="w-10/12 font-semibold text-white text-sm">
                      {tx.block_hash}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;

const styles = {
  light:
    "border-2 border-orange-400 bg-orange-400 rounded-3xl h-[300px] w-11/12 sm:w-[300px] flex justify-center items-center",
  dark: "border-2 border-blue-700 bg-blue-700 rounded-3xl h-[300px] w-11/12 sm:w-[300px] flex justify-center items-center",
  connectLight:
    "bg-orange-300 w-[150px] h-[60px] rounded-2xl text-white font-bold border-white border-2",
  connectDark:
    "bg-blue-500 w-[150px] h-[60px] rounded-2xl text-white font-bold border-white border-2",
  txLight:
    "border-2 border-orange-400 bg-orange-400 rounded-3xl h-[300px] w-[300px] sm:w-[500px] sm:h-[500px]",
  txDark:
    "border-2 border-blue-500 bg-blue-500 rounded-3xl h-[300px] w-[300px] sm:w-[500px] sm:h-[500px]",
};
