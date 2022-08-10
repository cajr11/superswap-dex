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
