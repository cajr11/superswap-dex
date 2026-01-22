'use client';

import { useCallback, useState } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { erc20Abi, maxUint256 } from 'viem';
import { ONEINCH_CHAIN_IDS } from '@/lib/chains';
import { NATIVE_TOKEN_ADDRESS } from '@/types';
import type { Chain } from '@/types';

type UseTokenApprovalParams = {
  chain: Chain;
  tokenAddress?: string;
  amount?: string;
}

export function useTokenApproval({ chain, tokenAddress, amount }: UseTokenApprovalParams) {
  const { address } = useAccount();
  const chainId = ONEINCH_CHAIN_IDS[chain];
  const [spenderAddress, setSpenderAddress] = useState<`0x${string}` | null>(null);
  const [isLoadingSpender, setIsLoadingSpender] = useState(false);

  const isNativeToken = tokenAddress?.toLowerCase() === NATIVE_TOKEN_ADDRESS.toLowerCase();

  // Fetch spender address from 1inch API
  const fetchSpenderAddress = useCallback(async () => {
    if (spenderAddress) return spenderAddress;

    setIsLoadingSpender(true);
    try {
      const response = await fetch(`/api/1inch/approve?chainId=${chainId}`);
      const data = await response.json();
      if (data.address) {
        setSpenderAddress(data.address as `0x${string}`);
        return data.address as `0x${string}`;
      }
      throw new Error('Failed to get spender address');
    } catch (error) {
      console.error('Failed to fetch spender address:', error);
      return null;
    } finally {
      setIsLoadingSpender(false);
    }
  }, [chainId, spenderAddress]);

  // Check current allowance
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: erc20Abi,
    functionName: 'allowance',
    args: address && spenderAddress ? [address, spenderAddress] : undefined,
    chainId,
    query: {
      enabled: !!tokenAddress && !!address && !!spenderAddress && !isNativeToken,
    },
  });

  // Write contract for approval
  const { writeContractAsync, isPending: isApproving, data: approvalTxHash } = useWriteContract();

  // Wait for approval transaction
  const { isLoading: isWaitingForApproval, isSuccess: isApprovalConfirmed } = useWaitForTransactionReceipt({
    hash: approvalTxHash,
  });

  // Check if approval is needed
  const needsApproval = useCallback(() => {
    if (isNativeToken) return false;
    if (!allowance || !amount) return true;
    return BigInt(allowance) < BigInt(amount);
  }, [allowance, amount, isNativeToken]);

  // Request approval
  const approve = useCallback(async () => {
    if (!tokenAddress || !address || isNativeToken) {
      return;
    }

    let spender = spenderAddress;
    if (!spender) {
      spender = await fetchSpenderAddress();
      if (!spender) {
        throw new Error('Failed to get spender address');
      }
    }

    await writeContractAsync({
      address: tokenAddress as `0x${string}`,
      abi: erc20Abi,
      functionName: 'approve',
      args: [spender, maxUint256],
      chainId,
    });

    // Refetch allowance after approval
    await refetchAllowance();
  }, [tokenAddress, address, spenderAddress, fetchSpenderAddress, writeContractAsync, chainId, refetchAllowance, isNativeToken]);

  return {
    needsApproval: needsApproval(),
    approve,
    isApproving: isApproving || isWaitingForApproval,
    isApprovalConfirmed,
    allowance,
    refetchAllowance,
    fetchSpenderAddress,
    isLoadingSpender,
  };
}
