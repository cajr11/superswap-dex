'use client';

import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import type { Chain, Transaction } from '@/types';

export function useTransactions(chain: Chain) {
  const { address } = useAccount();

  return useQuery({
    queryKey: ['transactions', address, chain],
    queryFn: async (): Promise<Transaction[]> => {
      if (!address) return [];

      const params = new URLSearchParams({
        address,
        chain,
      });

      const response = await fetch(`/api/transactions?${params}`);
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      return data.transactions || [];
    },
    enabled: !!address,
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // fefresh every minute
  });
}
