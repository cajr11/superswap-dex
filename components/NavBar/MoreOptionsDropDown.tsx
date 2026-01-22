'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  GlobeAltIcon,
  MoonIcon,
  SunIcon,
  ChevronLeftIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';
import { useTheme } from '@/context/theme-context';
import i18n from '@/lib/i18n';
import type { LanguageType } from '@/types';

type MoreOptionsDropDownProps = {
  showOptions: (val: boolean) => void;
}

export default function MoreOptionsDropDown({ showOptions }: MoreOptionsDropDownProps) {
  const { t } = useTranslation();
  const [changeLanguage, setChangeLanguage] = useState(false);
  const [isSelected, setIsSelected] = useState<LanguageType>('en');
  const { isLight, changeTheme } = useTheme();

  const selectLanguage = (lng: string) => {
    setIsSelected(lng as LanguageType);
    i18n.changeLanguage(lng);
  };

  return (
    <span
      className="bg-white min-w-[180px] h-20 rounded-lg absolute right-3 top-20 shadow-md p-3 flex flex-col justify-between z-50"
      onMouseLeave={() => showOptions(false)}
    >
      {!changeLanguage && (
        <>
          <button
            className="w-full text-gray-400 flex justify-between text-sm cursor-pointer"
            onClick={() => setChangeLanguage(true)}
          >
            <span className="select-none">{t('nav.dropdown.language')}</span>
            <GlobeAltIcon className="h-4 w-4" />
          </button>
          {isLight && (
            <button
              className="w-full text-gray-400 flex justify-between text-sm cursor-pointer"
              onClick={changeTheme}
            >
              <span className="select-none">{t('nav.dropdown.dark')}</span>
              <MoonIcon className="h-4 w-4" />
            </button>
          )}
          {!isLight && (
            <button
              className="w-full text-gray-400 flex justify-between text-sm cursor-pointer"
              onClick={changeTheme}
            >
              <span className="select-none">{t('nav.dropdown.light')}</span>
              <SunIcon className="h-5 w-5" />
            </button>
          )}
        </>
      )}
      {changeLanguage && (
        <span className="h-full flex flex-col justify-between">
          <button
            className="w-full text-gray-400 flex justify-between text-sm mb-1 outline-none cursor-pointer"
            onClick={() => setChangeLanguage(false)}
          >
            <ChevronLeftIcon className="h-3 w-3" />
          </button>
          <button
            className="w-full text-gray-400 flex justify-between text-sm outline-none cursor-pointer"
            onClick={() => selectLanguage('en')}
          >
            <span className="select-none">{t('nav.language.english')}</span>
            {isSelected === 'en' && <CheckIcon className="h-3 w-3" />}
          </button>
          <button
            className="w-full text-gray-400 flex justify-between text-sm outline-none cursor-pointer"
            onClick={() => selectLanguage('es')}
          >
            <span className="select-none">{t('nav.language.spanish')}</span>
            {isSelected === 'es' && <CheckIcon className="h-3 w-3" />}
          </button>
        </span>
      )}
    </span>
  );
}
