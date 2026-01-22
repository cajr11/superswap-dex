'use client';

import { useQuery } from '@tanstack/react-query';
import { ONEINCH_CHAIN_IDS } from '@/lib/chains';
import type { Chain } from '@/types';

type UseQuoteParams = {
  chain: Chain;
  fromTokenAddress?: string;
  toTokenAddress?: string;
  amount?: string;
  enabled?: boolean;
}

type QuoteResponse = {
  dstAmount: string;
  gas: number;
  srcToken: {
    address: string;
    symbol: string;
    decimals: number;
  };
  dstToken: {
    address: string;
    symbol: string;
    decimals: number;
  };
}

export function useQuote({
  chain,
  fromTokenAddress,
  toTokenAddress,
  amount,
  enabled = true,
}: UseQuoteParams) {
  const chainId = ONEINCH_CHAIN_IDS[chain];

  return useQuery({
    queryKey: ['quote', chainId, fromTokenAddress, toTokenAddress, amount],
    queryFn: async (): Promise<QuoteResponse> => {
      const params = new URLSearchParams({
        chainId: chainId.toString(),
        src: fromTokenAddress!,
        dst: toTokenAddress!,
        amount: amount!,
      });

      const response = await fetch(`/api/1inch/quote?${params}`);
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      return data;
    },
    enabled:
      enabled &&
      !!fromTokenAddress &&
      !!toTokenAddress &&
      !!amount &&
      amount !== '0',
    staleTime: 10 * 1000, // 10 seconds
    retry: false,
  });
}
