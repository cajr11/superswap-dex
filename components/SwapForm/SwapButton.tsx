'use client';

import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';
import { useTheme } from '@/context/theme-context';

type SwapButtonProps = {
  setLoginModalOpen: (val: boolean) => void;
  trySwap: () => void;
  isLoading?: boolean;
}

export default function SwapButton({
  setLoginModalOpen,
  trySwap,
  isLoading = false,
}: SwapButtonProps) {
  const { t } = useTranslation();
  const { isLight } = useTheme();
  const { isConnected } = useAccount();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isConnected) {
      setLoginModalOpen(true);
    } else {
      trySwap();
    }
  };

  return (
    <button
      className={isLight ? styles.lightContainer : styles.darkContainer}
      onClick={handleClick}
      disabled={isLoading}
    >
      {!isConnected && (
        <div className={isLight ? styles.lightButton : styles.darkButton}>
          {t('swap_form.connect')}
        </div>
      )}
      {isConnected && (
        <div className={isLight ? styles.lightButton : styles.darkButton}>
          {isLoading ? 'Loading...' : t('swap_form.swap')}
        </div>
      )}
    </button>
  );
}

const styles = {
  lightContainer: 'border-orange-300 h-16 w-full rounded-3xl',
  darkContainer: 'border-blue-500 h-16 w-full rounded-3xl',
  lightButton:
    'h-full w-full rounded-3xl flex justify-center items-center bg-orange-500 text-white font-semibold cursor-pointer',
  darkButton:
    'h-full w-full rounded-3xl flex justify-center items-center bg-blue-500 text-white font-semibold cursor-pointer',
};
