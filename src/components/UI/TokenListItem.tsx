import React from "react";
import type { SelectedToken } from "../../types";

type TokenListItemProps = {
  logo: string;
  name: string;
  symbol: string;
  choose(val: SelectedToken): void;
  isSelecting(val: boolean): void;
  address: string;
  decimals: number;
};

const TokenListItem = ({
  logo,
  name,
  symbol,
  choose,
  isSelecting,
  address,
  decimals,
}: TokenListItemProps): JSX.Element => {
  const choice = {
    logo,
    symbol,
    name,
    address,
    decimals,
  };

  const handleClick = () => {
    choose(choice);
    isSelecting(false);
  };

  return (
    <li
      className="w-full h-14 list-none flex items-center px-3 cursor-pointer"
      onClick={handleClick}
    >
      <img src={logo} alt="" className="h-8 w-8 flex-[1/4] mr-3" />
      <div className="flex-1 flex flex-col">
        <span className="font-semibold">{symbol}</span>
        <span className="text-xs text-gray-600">{name.split(" ")[0]}</span>
      </div>
    </li>
  );
};

export default TokenListItem;
