import React from "react";

type TokenListItemProps = {
  logo: string;
  name: string;
  symbol: string;
};

const TokenListItem = ({ logo, name, symbol }: TokenListItemProps): JSX.Element => {
  return (
    <li className="w-full h-14 list-none flex items-center px-3">
      <img src={logo} alt="" className="h-8 w-8 flex-[1/4] mr-3" />
      <div className="flex-1 flex flex-col">
        <span className="font-semibold">{symbol}</span>
        <span className="text-xs text-gray-600">{name.split(" ")[0]}</span>
      </div>
    </li>
  );
};

export default TokenListItem;
