'use client';

import { useTheme } from '@/context/theme-context';
import type { SelectedToken } from '@/types';

type TokenListItemProps = {
  logo: string;
  name: string;
  symbol: string;
  choose: (val: SelectedToken) => void;
  isSelecting: (val: boolean) => void;
  address: string;
  decimals: number;
}

export default function TokenListItem({
  logo,
  name,
  symbol,
  choose,
  isSelecting,
  address,
  decimals,
}: TokenListItemProps) {
  const { isLight } = useTheme();
  const choice: SelectedToken = {
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
      className={`w-full h-14 list-none flex items-center px-3 cursor-pointer rounded-lg ${
        isLight ? 'hover:bg-gray-100' : 'hover:bg-[#1a1a1a]'
      }`}
      onClick={handleClick}
    >
      <img src={logo} alt="" className="h-8 w-8 flex-[1/4] mr-3" />
      <div className="flex-1 flex flex-col">
        <span className={`font-semibold ${isLight ? 'text-black' : 'text-white'}`}>{symbol}</span>
        <span className={`text-xs ${isLight ? 'text-gray-600' : 'text-[#A7A7A7]'}`}>{name.split(' ')[0]}</span>
      </div>
    </li>
  );
}
