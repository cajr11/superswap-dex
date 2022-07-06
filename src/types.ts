export type LanguageType = "English" | "Spanish";

export type TokenDetailsType = {
  logoURI: string;
  decimals: number;
  name: string;
  symbol: string;
  tags: string[];
  address: string;
};

export type TokenList = TokenDetailsType[];
