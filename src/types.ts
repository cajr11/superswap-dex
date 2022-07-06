export type LanguageType = "English" | "Spanish";

export type TokenDetails = {
  logoURI: string;
  decimals: number;
  name: string;
  symbol: string;
  tags: string[];
  address: string;
};

export type TokenList = TokenDetails[];

export type Chain = "bsc" | "eth" | "matic";
