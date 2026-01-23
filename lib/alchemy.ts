import { Alchemy, Network, AssetTransfersCategory, SortingOrder } from 'alchemy-sdk';
import type { Chain } from '@/types';

const NETWORK_MAP: Record<Chain, Network> = {
  eth: Network.ETH_MAINNET,
  polygon: Network.MATIC_MAINNET,
  arbitrum: Network.ARB_MAINNET,
  base: Network.BASE_MAINNET,
};

export function getAlchemyClient(chain: Chain): Alchemy {
  const network = NETWORK_MAP[chain];

  return new Alchemy({
    apiKey: process.env.ALCHEMY_API_KEY || process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    network,
  });
}

export async function getTransactionHistory(address: string, chain: Chain) {
  const alchemy = getAlchemyClient(chain);

  try {
    const transfers = await alchemy.core.getAssetTransfers({
      fromAddress: address,
      category: [AssetTransfersCategory.EXTERNAL, AssetTransfersCategory.ERC20],
      maxCount: 50,
      order: SortingOrder.DESCENDING,
    });

    return transfers.transfers.map((tx) => ({
      hash: tx.hash,
      from: tx.from,
      to: tx.to,
      value: tx.value?.toString() || '0',
      blockNum: tx.blockNum,
      asset: tx.asset || 'ETH',
      category: tx.category,
    }));
  } catch (error) {
    console.error('Failed to fetch transaction history:', error);
    return [];
  }
}
