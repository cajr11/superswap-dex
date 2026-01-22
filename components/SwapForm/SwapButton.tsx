'use client';

import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';
import { useTheme } from '@/context/theme-context';

type SwapButtonProps = {
  setLoginModalOpen: (val: boolean) => void;
  trySwap: () => void;
  tryApprove?: () => void;
  isLoading?: boolean;
  needsApproval?: boolean;
  isApproving?: boolean;
}

export default function SwapButton({
  setLoginModalOpen,
  trySwap,
  tryApprove,
  isLoading = false,
  needsApproval = false,
  isApproving = false,
}: SwapButtonProps) {
  const { t } = useTranslation();
  const { isLight } = useTheme();
  const { isConnected } = useAccount();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isConnected) {
      setLoginModalOpen(true);
    } else if (needsApproval && tryApprove) {
      tryApprove();
    } else {
      trySwap();
    }
  };

  const getButtonText = () => {
    if (!isConnected) return t('swap_form.connect');
    if (isApproving) return 'Approving...';
    if (needsApproval) return 'Approve';
    if (isLoading) return 'Loading...';
    return t('swap_form.swap');
  };

  return (
    <button
      className={isLight ? styles.lightContainer : styles.darkContainer}
      onClick={handleClick}
      disabled={isLoading || isApproving}
    >
      <div className={isLight ? styles.lightButton : styles.darkButton}>
        {getButtonText()}
      </div>
    </button>
  );
}

const styles = {
  lightContainer: 'border-[#2CC295] h-16 w-full rounded-3xl',
  darkContainer: 'border-[#2CC295] h-16 w-full rounded-3xl',
  lightButton:
    'h-full w-full rounded-3xl flex justify-center items-center bg-[#2CC295] text-white font-semibold cursor-pointer hover:bg-[#03624C] transition-colors',
  darkButton:
    'h-full w-full rounded-3xl flex justify-center items-center bg-[#2CC295] text-white font-semibold cursor-pointer hover:bg-[#03624C] transition-colors',
};
