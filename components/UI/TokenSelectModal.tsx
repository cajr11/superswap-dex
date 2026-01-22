'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { XMarkIcon } from '@heroicons/react/24/solid';
import TokenListItem from './TokenListItem';
import { useTheme } from '@/context/theme-context';
import type { TokenDetails, TokenList, SelectedToken } from '@/types';

type TokenSelectModalProps = {
  tokenList: TokenList;
  select: (val: boolean) => void;
  choose: (val: SelectedToken) => void;
  isSelecting: (val: boolean) => void;
}

export default function TokenSelectModal({
  tokenList,
  select,
  choose,
  isSelecting,
}: TokenSelectModalProps) {
  const { t } = useTranslation();
  const { isLight } = useTheme();
  const [searchedValue, setSearchedValue] = useState('');
  const [customTokenList, setCustomTokenList] = useState<TokenDetails[]>(tokenList);

  useEffect(() => {
    if (searchedValue.slice(0, 2).includes('0x')) {
      const filteredList = tokenList.filter((token) =>
        token.address.toLowerCase().includes(searchedValue.toLowerCase())
      );
      setCustomTokenList(filteredList);
    } else if (searchedValue.length > 0) {
      const filteredList = tokenList.filter((token) =>
        token.symbol.toUpperCase().includes(searchedValue.toUpperCase())
      );
      setCustomTokenList(filteredList);
    } else {
      setCustomTokenList(tokenList);
    }
  }, [searchedValue, tokenList]);

  return (
    <>
      <div className="absolute top-0 left-0 w-screen h-screen bg-gray-500 z-30 opacity-20" />
      <div className={isLight ? styles.light : styles.dark}>
        {/* Modal Header */}
        <div className="h-10 w-full flex flex-row justify-between items-center px-5">
          <span className="font-semibold text-lg">{t('choose-token.swap')}</span>
          <XMarkIcon className="h-6 w-6 cursor-pointer" onClick={() => select(false)} />
        </div>

        {/* Modal Search Bar */}
        <div className="h-24 p-3 pb-5 border-b border-b-gray-200">
          <input
            className="border border-gray-200 w-full h-full rounded-2xl px-3 focus:outline-none"
            placeholder={t('choose-token.search')}
            onChange={(e) => setSearchedValue(e.target.value)}
          />
        </div>

        {/* Modal List */}
        <div className="flex-1 p-4 overflow-hidden">
          {customTokenList && (
            <ul className="w-full h-full overflow-y-scroll">
              {customTokenList.map(({ logoURI, name, symbol, address, decimals }) => (
                <TokenListItem
                  key={address}
                  logo={logoURI}
                  name={name}
                  symbol={symbol}
                  choose={choose}
                  isSelecting={isSelecting}
                  address={address}
                  decimals={decimals}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

const styles = {
  dark: 'absolute w-screen h-[70%] bottom-0 left-0 bg-blue-800 rounded-t-2xl z-40 py-5 flex flex-col md:w-[450px] md:h-[450px] md:m-auto md:top-0 md:right-0 md:rounded-xl md:py-2 md:pb-0',
  light:
    'absolute w-screen h-[70%] bottom-0 left-0 bg-white rounded-t-2xl z-40 py-5 flex flex-col md:w-[450px] md:h-[450px] md:m-auto md:top-0 md:right-0 md:rounded-xl md:py-2 md:pb-0',
};
