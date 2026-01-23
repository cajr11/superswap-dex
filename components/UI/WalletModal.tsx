'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { XMarkIcon } from '@heroicons/react/24/solid';
import {
  DocumentDuplicateIcon,
  ArrowTopRightOnSquareIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi';
import { Oval } from 'react-loader-spinner';
import { useTheme } from '@/context/theme-context';
import { useChainContext } from '@/context/chain-context';
import { CHAIN_METADATA } from '@/lib/chains';

type WalletModalProps = {
  close: (val: boolean) => void;
}

export default function WalletModal({ close }: WalletModalProps) {
  const { t } = useTranslation();
  const { isLight } = useTheme();
  const { chain } = useChainContext();
  const { address, isConnected, isConnecting } = useAccount();
  const { disconnect } = useDisconnect();
  const [isCopying, setIsCopying] = useState(false);

  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : '';

  const handleCopy = () => {
    if (address) {
      setIsCopying(true);
      navigator.clipboard.writeText(address);
      setTimeout(() => {
        setIsCopying(false);
      }, 1000);
    }
  };

  const explorerUrl = `${CHAIN_METADATA[chain].explorer}/address/${address}`;

  return (
    <>
      <div
        className="absolute w-screen h-screen bg-gray-500 z-40 opacity-30"
        onClick={() => close(false)}
      />
      <div className={isLight ? styles.lightContainer : styles.darkContainer}>
        <div className={`h-10 w-full flex flex-row justify-between items-center px-5 ${
          isLight ? 'text-[#333333]' : 'text-white'
        }`}>
          {!isConnected && (
            <span className="font-semibold text-lg">{t('login.connect')}</span>
          )}
          {isConnected && (
            <span className="font-semibold text-lg">{t('login.account')}</span>
          )}
          <XMarkIcon className="h-6 w-6 cursor-pointer" onClick={() => close(false)} />
        </div>

        {/* Login with RainbowKit */}
        {!isConnecting && !isConnected && (
          <div className="flex-1 rounded-2xl p-4 flex flex-col justify-center items-center">
            <ConnectButton.Custom>
              {({ openConnectModal }) => (
                <button
                  onClick={openConnectModal}
                  className="w-full py-4 px-6 rounded-2xl font-semibold bg-[#2CC295] text-white hover:bg-[#03624C] transition-colors"
                >
                  {t('login.connect')}
                </button>
              )}
            </ConnectButton.Custom>
          </div>
        )}

        {/* Loading state */}
        {isConnecting && (
          <div className="flex flex-1 justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <Oval
                height={50}
                width={50}
                strokeWidth={5}
                color={isLight ? '#2CC295' : '#00DF81'}
                secondaryColor={isLight ? '#03624C' : '#333333'}
              />
              <span className={isLight ? 'text-[#333333]' : 'text-white'}>{t('login.authenticate')}</span>
            </div>
          </div>
        )}

        {/* Connected state */}
        {isConnected && (
          <div className="flex flex-1 p-5 rounded-2xl">
            <div className={`flex flex-1 flex-col border rounded-2xl ${
              isLight ? 'border-[#A7A7A7]' : 'border-[#646464]'
            }`}>
              <div className="px-2 pt-3 flex items-center justify-between w-full">
                <span
                  className={`${
                    isLight ? 'text-[#646464]' : 'text-[#A7A7A7]'
                  } p-2 font-medium text-xs md:text-base w-2/3`}
                >
                  {t('login.connected', { wallet: 'Wallet' })}
                </span>
                <span
                  className="w-1/3 h-9 text-sm flex items-center justify-center rounded-2xl bg-[#2CC295] text-white hover:bg-[#03624C] transition-colors cursor-pointer"
                  onClick={() => disconnect()}
                >
                  {t('login.disconnect')}
                </span>
              </div>

              <div className={`px-4 py-2 text-xl font-semibold ${
                isLight ? 'text-[#333333]' : 'text-white'
              }`}>{shortAddress}</div>

              <div
                className={`p-4 text-xl font-semibold flex justify-between ${
                  isLight ? 'text-[#646464]' : 'text-[#A7A7A7]'
                }`}
              >
                {!isCopying && (
                  <span
                    className="flex items-center text-sm cursor-copy hover:text-[#2CC295] transition-colors"
                    onClick={handleCopy}
                  >
                    <DocumentDuplicateIcon className="h-4 w-4 mr-1" />
                    {t('login.copy')}
                  </span>
                )}
                {isCopying && (
                  <span className="flex items-center text-sm text-[#00DF81]">
                    <CheckCircleIcon className="h-4 w-4 mr-1" />
                    {t('login.copied')}
                  </span>
                )}
                <a
                  href={explorerUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm flex hover:text-[#2CC295] transition-colors"
                >
                  <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                  {t('login.view')}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const styles = {
  lightContainer:
    'absolute w-[350px] h-[260px] bottom-0 left-0 top-0 right-0 m-auto bg-[#F9F9F9] rounded-t-2xl z-40 py-5 flex flex-col md:w-[450px] md:h-[220px] md:pb-2 rounded-xl md:py-2 md:pb-0',
  darkContainer:
    'absolute w-[350px] h-[260px] bottom-0 left-0 top-0 right-0 m-auto bg-[#333333] rounded-t-2xl z-40 py-5 flex flex-col md:w-[450px] md:h-[220px] md:pb-2 rounded-xl md:py-2 md:pb-0',
};
