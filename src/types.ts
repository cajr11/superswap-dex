export type LanguageType = "English" | "Spanish";

export type TokenDetails = {
  logoURI: string;
  name: string;
  symbol: string;
  tags: string[];
  address: string;
  decimals: number;
};

export type TokenList = TokenDetails[];

export type Chain = "bsc" | "eth" | "polygon" | "goerli" | "bsc testnet" | "mumbai";

export type SelectedToken = {
  name?: string;
  logo?: string;
  symbol?: string;
  address?: string;
  decimals: number;
};
