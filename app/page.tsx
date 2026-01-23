'use client';

import { useState } from 'react';
import NavBar from '@/components/NavBar/NavBar';
import NavTabSwitcher from '@/components/NavBar/NavTabSwitcher';
import SwapForm from '@/components/SwapForm/SwapForm';
import SwapResultModal from '@/components/SwapForm/SwapResultModal';
import { useTheme } from '@/context/theme-context';
import { useChainContext } from '@/context/chain-context';
import { useTokens } from '@/hooks/useTokens';
import useWindowWidth from '@/hooks/useWindowWidth';
import type { TokenList } from '@/types';

export default function SwapPage() {
  const { isLight } = useTheme();
  const { chain } = useChainContext();
  const windowWidth = useWindowWidth();
  const isDesktop = windowWidth >= 920;

  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [_madeTx, setMadeTx] = useState(false);

  const { data: tokenList = [], isLoading } = useTokens(chain);

  const closeModal = () => {
    setShowTransactionModal(false);
    setTxHash('');
    setErrorMessage('');
  };

  const getTxHash = (hash: string) => {
    setTxHash(hash);
  };

  const getErrorMessage = (message: string) => {
    setErrorMessage(message);
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isLight
          ? 'bg-gradient-to-b from-[#2CC295] to-[#03624C]'
          : 'bg-[#000000]'
      }`}
    >
      <NavBar loginModalOpen={loginModalOpen} setLoginModalOpen={setLoginModalOpen} />

      {showTransactionModal && (
        <SwapResultModal
          closeModal={closeModal}
          txHash={txHash}
          errorMessage={errorMessage}
        />
      )}

      <main className="flex items-center justify-center flex-grow">
        {isLoading ? (
          <div className="text-white text-xl">Loading tokens...</div>
        ) : (
          <SwapForm
            tokenList={tokenList as TokenList}
            setLoginModalOpen={setLoginModalOpen}
            openTransactionModal={setShowTransactionModal}
            getTxHash={getTxHash}
            getErrorMessage={getErrorMessage}
            setMadeTx={setMadeTx}
          />
        )}
      </main>

      {!isDesktop && <NavTabSwitcher />}
    </div>
  );
}
