'use client';

import { useQuery } from '@tanstack/react-query';
import { ONEINCH_CHAIN_IDS } from '@/lib/chains';
import type { Chain, TokenDetails } from '@/types';

export function useTokens(chain: Chain) {
  const chainId = ONEINCH_CHAIN_IDS[chain];

  return useQuery({
    queryKey: ['tokens', chainId],
    queryFn: async (): Promise<TokenDetails[]> => {
      const response = await fetch(`/api/1inch/tokens?chainId=${chainId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch tokens');
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const tokens = data.tokens || {};
      return Object.values(tokens) as TokenDetails[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}
