export type LanguageType = "en" | "es";

export type TokenDetails = {
  logoURI: string;
  name: string;
  symbol: string;
  tags: string[];
  address: string;
  decimals: number;
};

export type TokenList = TokenDetails[];

export type Chain = "bsc" | "eth" | "polygon";

export type SelectedToken = {
  name?: string;
  logo?: string;
  symbol?: string;
  address?: string;
  decimals: number;
};

export type TransactionList = {
  hash: string;
  nonce: string;
  transaction_index: string;
  from_address: string;
  to_address: string;
  value: string;
  gas: string;
  gas_price: string;
  input: string;
  receipt_cumulative_gas_used: string;
  receipt_gas_used: string;
  receipt_contract_address: string;
  receipt_root: string;
  receipt_status: string;
  block_timestamp: string;
  block_number: string;
  block_hash: string;
}[];

export type ChainHex = "0x89" | "0x38" | "0x1";
