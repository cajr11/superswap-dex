'use client';

import { useMemo } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { Circles } from 'react-loader-spinner';
import { useTheme } from '@/context/theme-context';
import { useChainContext } from '@/context/chain-context';
import { CHAIN_METADATA } from '@/lib/chains';

type SwapResultModalProps = {
  closeModal: () => void;
  txHash: string;
  errorMessage: string;
}

export default function SwapResultModal({
  closeModal,
  txHash,
  errorMessage,
}: SwapResultModalProps) {
  const { t } = useTranslation();
  const { isLight } = useTheme();
  const { chain } = useChainContext();

  const explorerTxUrl = useMemo(() => {
    return `${CHAIN_METADATA[chain].explorer}/tx/${txHash}`;
  }, [chain, txHash]);

  // Parse error message to show user-friendly text
  const friendlyError = useMemo(() => {
    if (!errorMessage) return '';

    const lowerError = errorMessage.toLowerCase();

    if (lowerError.includes('user rejected') || lowerError.includes('user denied')) {
      return t('transaction.errors.rejected');
    }
    if (lowerError.includes('insufficient funds') || lowerError.includes('insufficient balance')) {
      return t('transaction.errors.insufficient');
    }
    if (lowerError.includes('gas')) {
      return t('transaction.errors.gas');
    }
    if (lowerError.includes('network') || lowerError.includes('timeout')) {
      return t('transaction.errors.network');
    }
    if (lowerError.includes('allowance') || lowerError.includes('approve')) {
      return t('transaction.errors.approval');
    }

    // Return a truncated version if message is too long
    if (errorMessage.length > 100) {
      return errorMessage.substring(0, 100) + '...';
    }

    return errorMessage;
  }, [errorMessage, t]);

  return (
    <>
      <div
        className="absolute w-screen h-screen bg-gray-500 z-20 opacity-30"
        onClick={closeModal}
      />
      <div
        className={`absolute ${
          isLight ? 'bg-[#F9F9F9]' : 'bg-[#333333]'
        } z-40 rounded-2xl h-[350px] w-[308px] left-0 top-0 right-0 bottom-0 m-auto md:w-[350px] overflow-hidden`}
      >
        <div className="flex justify-end items-center w-full px-3 h-[15%]">
          <XMarkIcon
            className={isLight ? styles.lightX : styles.darkX}
            onClick={closeModal}
          />
        </div>

        {/* Loading state */}
        {txHash === '' && errorMessage === '' && (
          <div className="h-[60%] flex flex-col justify-center items-center">
            <Circles
              height={50}
              width={50}
              color="#2CC295"
            />
            <span className={`mt-4 text-sm ${isLight ? 'text-[#333333]' : 'text-white'}`}>
              {t('transaction.pending')}
            </span>
          </div>
        )}

        {/* Success state */}
        {txHash !== '' && (
          <div className="h-[60%] flex flex-col justify-center items-center">
            <ArrowUpCircleIcon
              className={isLight ? styles.arrowLight : styles.arrowDark}
            />
            <div className={isLight ? styles.lightHeadingsMain : styles.darkHeadingsMain}>
              {t('transaction.submitted')}
            </div>
            <a
              className={isLight ? styles.lightHeadings : styles.darkHeadings}
              href={explorerTxUrl}
              target="_blank"
              rel="noreferrer"
            >
              {t('transaction.view')}
            </a>
          </div>
        )}

        {/* Error state */}
        {errorMessage !== '' && (
          <div className="h-[60%] flex flex-col justify-center items-center px-6">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-3">
              <XMarkIcon className="h-6 w-6 text-red-500" />
            </div>
            <div className={`text-base font-medium mb-2 ${isLight ? 'text-[#333333]' : 'text-white'}`}>
              {t('transaction.failed')}
            </div>
            <div
              className={`text-sm text-center w-full break-words ${
                isLight ? 'text-[#646464]' : 'text-[#A7A7A7]'
              }`}
            >
              {friendlyError}
            </div>
          </div>
        )}

        <div className="h-[25%] w-[100%] flex items-center justify-center pb-2">
          <button
            className={isLight ? styles.lightButton : styles.darkButton}
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}

const styles = {
  lightX: 'h-6 w-6 cursor-pointer text-[#646464] hover:text-[#333333] transition-colors',
  darkX: 'h-6 w-6 cursor-pointer text-[#A7A7A7] hover:text-white transition-colors',
  arrowDark: 'h-20 w-20 mb-3 text-[#2CC295]',
  arrowLight: 'h-20 w-20 mb-3 text-[#2CC295]',
  darkHeadings: 'text-[#00DF81] text-sm hover:text-[#2CC295] transition-colors',
  lightHeadings: 'text-[#2CC295] text-sm hover:text-[#03624C] transition-colors',
  darkHeadingsMain: 'text-white text-lg font-medium mb-1',
  lightHeadingsMain: 'text-[#333333] text-lg font-medium mb-1',
  darkButton: 'w-[90%] h-[80%] bg-[#2CC295] text-center rounded-xl text-white font-medium hover:bg-[#03624C] transition-colors',
  lightButton: 'w-[90%] h-[80%] bg-[#2CC295] text-center rounded-xl text-white font-medium hover:bg-[#03624C] transition-colors',
};
