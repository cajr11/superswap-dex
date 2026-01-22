'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SwapFormChangeTokenButton from './SwapFormChangeTokenButton';
import TokenSelectModal from '../UI/TokenSelectModal';
import type { TokenList, SelectedToken } from '@/types';

type SwapFormInputProps = {
  initial?: boolean;
  tokenList: TokenList;
  choose: (val: SelectedToken) => void;
  selected: SelectedToken;
  getQuote: (val: string) => void;
  value: number | undefined | string;
  changeValue: (val: number | undefined | string) => void;
  changeCounterValue: (val: number | undefined | string) => void;
}

export default function SwapFormInput({
  initial,
  tokenList,
  choose,
  selected,
  value,
  getQuote,
  changeCounterValue,
}: SwapFormInputProps) {
  const [isSelecting, setIsSelecting] = useState(false);
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState<number | undefined | string>();
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (value === 0 || value === '') {
      setInputValue('');
      changeCounterValue('');
    } else {
      setInputValue(value);
    }
  }, [value, changeCounterValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // Debounce the quote fetch
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const timer = setTimeout(() => {
      getQuote(newValue);
    }, 500);

    setDebounceTimer(timer);
  };

  return (
    <div className="w-full h-20 rounded-2xl mb-2 bg-gray-100 flex items-center p-5">
      <div className="flex items-center w-full">
        <input
          className="min-w-0 h-full rounded-2xl bg-gray-100 text-3xl font-medium font-inc focus:outline-none px-1"
          placeholder={t('swap_form.placeholder')}
          type="number"
          onChange={handleInputChange}
          value={inputValue || ''}
        />
        <SwapFormChangeTokenButton
          initial={initial}
          select={setIsSelecting}
          selected={selected}
        />
        {isSelecting && (
          <TokenSelectModal
            tokenList={tokenList}
            select={setIsSelecting}
            choose={choose}
            isSelecting={setIsSelecting}
          />
        )}
      </div>
    </div>
  );
}
