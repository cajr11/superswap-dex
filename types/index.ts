export type LanguageType = 'en' | 'es';

export type TokenDetails = {
  logoURI: string;
  name: string;
  symbol: string;
  tags: string[];
  address: string;
  decimals: number;
};

export type TokenList = TokenDetails[];

export type Chain = 'eth' | 'polygon' | 'arbitrum' | 'base';

export type SelectedToken = {
  name?: string;
  logo?: string;
  symbol?: string;
  address?: string;
  decimals: number;
};

export type Transaction = {
  hash: string;
  from: string;
  to: string | null;
  value: string;
  blockNum: string;
  asset: string;
  category: string;
};

export type TransactionList = Transaction[];

// chain IDs for wagmi
export const CHAIN_IDS = {
  eth: 1,
  polygon: 137,
  arbitrum: 42161,
  base: 8453,
} as const;

// native token addresses for 1inch
export const NATIVE_TOKEN_ADDRESS = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';

// block explorer URLs
export const BLOCK_EXPLORERS = {
  eth: 'https://etherscan.io',
  polygon: 'https://polygonscan.com',
  arbitrum: 'https://arbiscan.io',
  base: 'https://basescan.org',
} as const;
