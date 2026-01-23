'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/context/theme-context';
import useWindowWidth from '@/hooks/useWindowWidth';

export default function NavTabSwitcher() {
  const { t } = useTranslation();
  const windowWidth = useWindowWidth();
  const isDesktop = windowWidth >= 920;
  const { isLight } = useTheme();
  const pathname = usePathname();

  return (
    <div
      className={`${isDesktop ? 'basis-2/4' : ''} h-5/6 flex items-center justify-center`}
    >
      <div className={isLight ? styles.light : styles.dark}>
        <Link
          href="/"
          className={`flex items-center justify-center rounded-3xl w-1/2 ${
            pathname === '/'
              ? 'bg-[#2CC295] text-white'
              : isLight ? 'text-white' : 'text-[#A7A7A7]'
          }`}
        >
          {t('nav.swap')}
        </Link>
        <Link
          href="/transactions"
          className={`flex items-center justify-center rounded-3xl w-full ${
            pathname !== '/'
              ? 'bg-[#2CC295] text-white'
              : isLight ? 'text-white' : 'text-[#A7A7A7]'
          }`}
        >
          {t('nav.transactions')}
        </Link>
      </div>
    </div>
  );
}

const styles = {
  light: 'w-52 h-full flex justify-evenly rounded-3xl bg-[#00DF81] select-none',
  dark: 'w-52 h-full flex justify-evenly rounded-3xl bg-[#1a1a1a] select-none',
};
