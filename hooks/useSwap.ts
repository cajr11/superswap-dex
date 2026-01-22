'use client';

import { useMutation } from '@tanstack/react-query';
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { ONEINCH_CHAIN_IDS } from '@/lib/chains';
import type { Chain } from '@/types';

type SwapParams = {
  fromTokenAddress: string;
  toTokenAddress: string;
  amount: string;
  slippage?: number;
}

type SwapResponse = {
  tx: {
    to: string;
    data: string;
    value: string;
    gas: number;
  };
  dstAmount: string;
}

export function useSwap(chain: Chain) {
  const { address } = useAccount();
  const chainId = ONEINCH_CHAIN_IDS[chain];
  const { sendTransactionAsync } = useSendTransaction();

  const mutation = useMutation({
    mutationFn: async ({
      fromTokenAddress,
      toTokenAddress,
      amount,
      slippage = 1,
    }: SwapParams): Promise<`0x${string}`> => {
      if (!address) {
        throw new Error('Wallet not connected');
      }

      // get swap transaction data from API
      const params = new URLSearchParams({
        chainId: chainId.toString(),
        src: fromTokenAddress,
        dst: toTokenAddress,
        amount: amount,
        from: address,
        slippage: slippage.toString(),
      });

      const response = await fetch(`/api/1inch/swap?${params}`);
      const swapData: SwapResponse = await response.json();

      if ('error' in swapData) {
        throw new Error((swapData as { error: string }).error);
      }

      // gxecute the transaction using wagmi
      const txHash = await sendTransactionAsync({
        to: swapData.tx.to as `0x${string}`,
        data: swapData.tx.data as `0x${string}`,
        value: BigInt(swapData.tx.value || 0),
        gas: BigInt(swapData.tx.gas),
      });

      return txHash;
    },
  });

  return mutation;
}

/**
 * / Hook to wait for transaction confirmation
 * @param hash 
 * @returns an object with information about the completed transaction
 */
export function useSwapReceipt(hash: `0x${string}` | undefined) {
  return useWaitForTransactionReceipt({
    hash,
  });
}
