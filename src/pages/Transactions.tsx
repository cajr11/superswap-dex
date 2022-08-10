import React from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import ThemeContext from "../context/theme-context";
import { useTranslation } from "react-i18next";
import Moralis from "moralis";
import type { TransactionList } from "../types"

type TransactionsProps = {
    setLoginModalOpen(val: boolean): void;
}

const Transactions = ({ setLoginModalOpen }: TransactionsProps): JSX.Element => {
    const { isAuthenticated } = useMoralis();
    const { isLight } = React.useContext(ThemeContext);
    const { t } = useTranslation();
    const Web3Api = useMoralisWeb3Api();
    const [transactions, setTransactions] = React.useState<TransactionList>();

    React.useEffect(() => {
        const fetchTransactions = async () => {
            const address = await Moralis.User.current()?.get("ethAddress");
            console.log(address);
            const txs = await Web3Api.account.getTransactions({
                address
            });
            setTransactions(txs.result);
        }

        if (!transactions) {
            fetchTransactions(); 
        }
    }, [transactions, Web3Api])

    console.log(transactions);

  return (
        <div className="flex items-center justify-center flex-grow">
            {!isAuthenticated && <div className={isLight ? styles.light : styles.dark}>
                <button className={isLight ? styles.connectLight : styles.connectDark} onClick={() => setLoginModalOpen(true)}>{t("transactions.connect")}</button>
            </div>}
            {isAuthenticated && <div className="flex flex-col justify-center">
                    <h1 className={`w-[300px] sm:w-[500px] text-center mb-4 text-sm sm:text-3xl underline underline-offset-4 ${isLight ? "text-gray-50" : "text-white"}`}>{t("transactions.transactions")}</h1>
                    <div className={isLight ? styles.txLight : styles.txDark}>

                    </div>
                </div>}
        </div>);
}

export default Transactions;

const styles = {
    light: "border-2 border-orange-400 bg-orange-400 rounded-3xl h-[300px] w-11/12 sm:w-[300px] flex justify-center items-center",
    dark: "border-2 border-blue-700 bg-blue-700 rounded-3xl h-[300px] w-11/12 sm:w-[300px] flex justify-center items-center",
    connectLight: "bg-orange-500 w-[150px] h-[60px] rounded-2xl text-white font-bold border-white border-2",
    connectDark: "bg-blue-500 w-[150px] h-[60px] rounded-2xl text-white font-bold border-white border-2",
    txLight: "border-2 border-orange-400 bg-orange-400 rounded-3xl h-[300px] w-[300px] sm:w-[500px] sm:h-[500px] flex justify-center items-center",
    txDark: "border-2 border-blue-500 bg-blue-500 rounded-3xl h-[300px] w-[300px] sm:w-[500px] sm:h-[500px] flex justify-center items-center"
  };
