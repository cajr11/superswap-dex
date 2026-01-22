import { mainnet, polygon, arbitrum, base } from 'wagmi/chains';
import type { Chain } from '@/types';

// map app chain type to wagmi chain IDs
export const CHAIN_MAP = {
  eth: mainnet.id,
  polygon: polygon.id,
  arbitrum: arbitrum.id,
  base: base.id,
} as const;

// 1inch API config
export const ONEINCH_CHAIN_IDS = {
  eth: 1,
  polygon: 137,
  arbitrum: 42161,
  base: 8453,
} as const;

// chain metadata
export const CHAIN_METADATA = {
  eth: {
    name: 'Ethereum',
    symbol: 'ETH',
    logo: '/images/eth.png',
    explorer: 'https://etherscan.io',
  },
  polygon: {
    name: 'Polygon',
    symbol: 'MATIC',
    logo: '/images/matic.svg',
    explorer: 'https://polygonscan.com',
  },
  arbitrum: {
    name: 'Arbitrum',
    symbol: 'ETH',
    logo: '/images/arbitrum.svg',
    explorer: 'https://arbiscan.io',
  },
  base: {
    name: 'Base',
    symbol: 'ETH',
    logo: '/images/base.svg',
    explorer: 'https://basescan.org',
  },
} as const;

/**
 *  Helper function that wagmi chain config from app chain type
 **/ 
export function getWagmiChain(chain: Chain) {
  switch (chain) {
    case 'eth':
      return mainnet;
    case 'polygon':
      return polygon;
    case 'arbitrum':
      return arbitrum;
    case 'base':
      return base;
    default:
      return mainnet;
  }
}

/**
 *  Helper function that gets chain type from wagmi chain ID
 **/ 
export function getChainFromId(chainId: number): Chain {
  switch (chainId) {
    case mainnet.id:
      return 'eth';
    case polygon.id:
      return 'polygon';
    case arbitrum.id:
      return 'arbitrum';
    case base.id:
      return 'base';
    default:
      return 'eth';
  }
}
