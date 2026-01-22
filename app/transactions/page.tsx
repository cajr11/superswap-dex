'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useTranslation } from 'react-i18next';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import NavBar from '@/components/NavBar/NavBar';
import NavTabSwitcher from '@/components/NavBar/NavTabSwitcher';
import { useTheme } from '@/context/theme-context';
import { useChainContext } from '@/context/chain-context';
import { useTransactions } from '@/hooks/useTransactions';
import useWindowWidth from '@/hooks/useWindowWidth';

export default function TransactionsPage() {
  const { isConnected } = useAccount();
  const { isLight } = useTheme();
  const { chain } = useChainContext();
  const { t } = useTranslation();
  const windowWidth = useWindowWidth();
  const isDesktop = windowWidth >= 920;

  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const { data: transactions = [], isLoading, refetch } = useTransactions(chain);

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isLight
          ? 'bg-gradient-to-b from-amber-400 to-orange-600'
          : 'bg-gradient-to-b from-slate-700 to-slate-900'
      }`}
    >
      <NavBar loginModalOpen={loginModalOpen} setLoginModalOpen={setLoginModalOpen} />

      <main className="flex items-center justify-center flex-grow">
        {!isConnected && (
          <div className={isLight ? styles.light : styles.dark}>
            <ConnectButton.Custom>
              {({ openConnectModal }) => (
                <button
                  className={isLight ? styles.connectLight : styles.connectDark}
                  onClick={openConnectModal}
                >
                  {t('transactions.connect')}
                </button>
              )}
            </ConnectButton.Custom>
          </div>
        )}

        {isConnected && (
          <div className="flex flex-col justify-center">
            <h1
              className={`w-[300px] sm:w-[500px] text-center mb-4 text-sm sm:text-3xl underline underline-offset-4 ${
                isLight ? 'text-gray-50' : 'text-white'
              }`}
            >
              {t('transactions.transactions')}
            </h1>
            <div className={isLight ? styles.txLight : styles.txDark}>
              <div
                className={`w-full h-[40px] rounded-t-3xl flex items-center border px-4 text-white ${
                  isLight ? 'bg-orange-300' : ''
                }`}
              >
                <span className="w-2/12 font-semibold">{t('transactions.no')}</span>
                <span className="w-10/12 font-semibold">{t('transactions.hash')}</span>
              </div>
              <div
                className={`w-full h-[256px] sm:h-[456px] rounded-b-3xl flex flex-col border overflow-y-scroll px-4 ${
                  isLight ? 'bg-orange-400' : 'bg-blue-400'
                }`}
              >
                {isLoading && (
                  <div className="flex items-center justify-center h-full text-white">
                    Loading transactions...
                  </div>
                )}
                {!isLoading && transactions.length === 0 && (
                  <div className="flex items-center justify-center h-full text-white">
                    No transactions found
                  </div>
                )}
                {!isLoading &&
                  transactions.map((tx, index) => (
                    <div
                      key={tx.hash || index}
                      className="overflow-x-scroll min-h-[50px] px-4 pr-6 border border-x-0 border-t-0 border-b-white flex items-center"
                    >
                      <div className="w-2/12 font-semibold text-white">{index + 1}</div>
                      <div className="w-10/12 font-semibold text-white text-sm truncate">
                        {tx.hash}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {!isDesktop && <NavTabSwitcher />}
    </div>
  );
}

const styles = {
  light:
    'border-2 border-orange-400 bg-orange-400 rounded-3xl h-[300px] w-11/12 sm:w-[300px] flex justify-center items-center',
  dark: 'border-2 border-blue-700 bg-blue-700 rounded-3xl h-[300px] w-11/12 sm:w-[300px] flex justify-center items-center',
  connectLight:
    'bg-orange-300 w-[150px] h-[60px] rounded-2xl text-white font-bold border-white border-2',
  connectDark:
    'bg-blue-500 w-[150px] h-[60px] rounded-2xl text-white font-bold border-white border-2',
  txLight:
    'border-2 border-orange-400 bg-orange-400 rounded-3xl h-[300px] w-[300px] sm:w-[500px] sm:h-[500px]',
  txDark:
    'border-2 border-blue-500 bg-blue-500 rounded-3xl h-[300px] w-[300px] sm:w-[500px] sm:h-[500px]',
};
