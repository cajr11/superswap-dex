'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { useAccount, useSwitchChain } from 'wagmi';
import { CHAIN_MAP } from '@/lib/chains';
import type { Chain } from '@/types';

type ChainContextValue = {
  chain: Chain;
  changeChain: (val: Chain) => void;
}

const ChainContext = createContext<ChainContextValue>({
  chain: 'eth',
  changeChain: () => {},
});

type ChainContextProviderProps = {
  children: ReactNode;
}

export function ChainContextProvider({ children }: ChainContextProviderProps) {
  const [chain, setChain] = useState<Chain>('eth');
  const { isConnected } = useAccount();
  const { switchChain } = useSwitchChain();

  const changeChain = useCallback(
    async (newChain: Chain) => {
      setChain(newChain);

      // if wallet is connected, switch the network in the wallet
      if (isConnected && switchChain) {
        try {
          switchChain({ chainId: CHAIN_MAP[newChain] });
        } catch (error) {
          console.error('Failed to switch network:', error);
        }
      }
    },
    [isConnected, switchChain]
  );

  return (
    <ChainContext.Provider value={{ chain, changeChain }}>
      {children}
    </ChainContext.Provider>
  );
}

export function useChainContext() {
  const context = useContext(ChainContext);
  if (!context) {
    throw new Error('useChainContext must be used within a ChainContextProvider');
  }
  return context;
}

export default ChainContext;
