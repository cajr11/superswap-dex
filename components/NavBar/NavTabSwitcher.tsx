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
            pathname === '/' && !isLight ? 'bg-blue-600 text-gray-50' : ''
          } ${pathname === '/' && isLight ? 'bg-white text-black' : ''} ${
            isLight ? 'text-black' : 'text-white'
          }`}
        >
          {t('nav.swap')}
        </Link>
        <Link
          href="/transactions"
          className={`flex items-center justify-center rounded-3xl w-full ${
            isLight && pathname !== '/' ? 'bg-white text-black' : ''
          } ${pathname !== '/' && !isLight ? 'bg-blue-600 text-gray-50' : ''} ${
            isLight ? 'text-black' : 'text-white'
          }`}
        >
          {t('nav.transactions')}
        </Link>
      </div>
    </div>
  );
}

const styles = {
  light: 'w-52 h-full flex justify-evenly rounded-3xl bg-gray-200 select-none',
  dark: 'w-52 h-full flex justify-evenly rounded-3xl bg-blue-400 select-none',
};
