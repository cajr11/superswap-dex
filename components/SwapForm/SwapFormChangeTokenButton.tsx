'use client';

import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { useTheme } from '@/context/theme-context';
import { useChainContext } from '@/context/chain-context';
import { CHAIN_METADATA } from '@/lib/chains';
import type { SelectedToken } from '@/types';

type SwapFormChangeTokenButtonProps = {
  initial?: boolean;
  select: (val: boolean) => void;
  selected: SelectedToken;
}

export default function SwapFormChangeTokenButton({
  initial,
  select,
  selected,
}: SwapFormChangeTokenButtonProps) {
  const { t } = useTranslation();
  const { isLight } = useTheme();
  const { chain } = useChainContext();

  const chainMeta = CHAIN_METADATA[chain];

  return (
    <div
      className={`flex whitespace-nowrap ml-1 rounded-3xl p-2 cursor-pointer ${
        isLight ? styles.changeLight : styles.changeDark
      }`}
      onClick={() => select(true)}
    >
      {initial && !selected.name && (
        <Image
          src={chainMeta.logo}
          alt={chain}
          width={24}
          height={24}
        />
      )}
      {selected.name && selected.logo && (
        <img src={selected.logo} alt="" className="h-6 w-6" />
      )}
      <span
        className={`flex items-center ${selected.name && 'pr-2 ml-1'} ${
          initial && 'pr-2'
        } text-sm md:text-base`}
      >
        {selected.name && selected.symbol}
        {initial && !selected.name && chainMeta.symbol}
        {!initial && !selected.name && t('swap_form.select')}
        <ChevronDownIcon className={`h-4 w-4 ${initial && 'mr-2'}`} />
      </span>
    </div>
  );
}

const styles = {
  changeLight: 'bg-orange-400 text-gray-200',
  changeDark: 'bg-blue-400 text-gray-200',
};
