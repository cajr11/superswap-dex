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
          ? 'bg-gradient-to-b from-[#2CC295] to-[#03624C]'
          : 'bg-[#000000]'
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
              className={`w-[300px] sm:w-[500px] text-center mb-6 text-xl sm:text-4xl font-light tracking-wider underline underline-offset-8 decoration-2 ${
                isLight ? 'text-white decoration-white/60' : 'text-white decoration-[#2CC295]'
              }`}
            >
              {t('transactions.transactions')}
            </h1>
            <div className={isLight ? styles.txLight : styles.txDark}>
              <div
                className={`w-full h-[40px] rounded-t-3xl flex items-center border px-4 ${
                  isLight ? 'bg-white text-[#333333] border-[#E8E8E8]' : 'bg-[#646464] text-white border-[#646464]'
                }`}
              >
                <span className="w-2/12 font-semibold">{t('transactions.no')}</span>
                <span className="w-10/12 font-semibold">{t('transactions.hash')}</span>
              </div>
              <div
                className={`w-full h-[256px] sm:h-[456px] rounded-b-3xl flex flex-col border overflow-y-scroll px-4 ${
                  isLight ? 'bg-[#F9F9F9] text-[#333333]' : 'bg-[#333333] text-white'
                }`}
              >
                {isLoading && (
                  <div className="flex items-center justify-center h-full">
                    Loading transactions...
                  </div>
                )}
                {!isLoading && transactions.length === 0 && (
                  <div className="flex items-center justify-center h-full">
                    No transactions found
                  </div>
                )}
                {!isLoading &&
                  transactions.map((tx, index) => (
                    <div
                      key={tx.hash || index}
                      className={`overflow-x-scroll min-h-[50px] px-4 pr-6 border border-x-0 border-t-0 flex items-center ${
                        isLight ? 'border-b-[#A7A7A7]' : 'border-b-[#646464]'
                      }`}
                    >
                      <div className="w-2/12 font-semibold">{index + 1}</div>
                      <div className="w-10/12 font-semibold text-sm truncate">
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
    'border-2 border-[#A7A7A7] bg-[#F9F9F9] rounded-3xl h-[300px] w-11/12 sm:w-[300px] flex justify-center items-center',
  dark: 'border-2 border-[#646464] bg-[#333333] rounded-3xl h-[300px] w-11/12 sm:w-[300px] flex justify-center items-center',
  connectLight:
    'bg-[#2CC295] w-[150px] h-[60px] rounded-2xl text-white font-bold border-white border-2 hover:bg-[#03624C] transition-colors',
  connectDark:
    'bg-[#2CC295] w-[150px] h-[60px] rounded-2xl text-white font-bold border-[#03624C] border-2 hover:bg-[#03624C] transition-colors',
  txLight:
    'border-2 border-[#A7A7A7] bg-[#F9F9F9] rounded-3xl h-[300px] w-[300px] sm:w-[500px] sm:h-[500px]',
  txDark:
    'border-2 border-[#646464] bg-[#333333] rounded-3xl h-[300px] w-[300px] sm:w-[500px] sm:h-[500px]',
};
