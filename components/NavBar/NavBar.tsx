'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDownIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import { useAccount, useBalance } from 'wagmi';
import Image from 'next/image';
import NavLogo from './NavLogo';
import NavTabSwitcher from './NavTabSwitcher';
import MoreOptionsDropDown from './MoreOptionsDropDown';
import ChooseNetwork from './ChooseNetwork';
import WalletModal from '../UI/WalletModal';
import { useTheme } from '@/context/theme-context';
import { useChainContext } from '@/context/chain-context';
import { CHAIN_MAP, CHAIN_METADATA } from '@/lib/chains';
import useWindowWidth from '@/hooks/useWindowWidth';
import type { Chain } from '@/types';

type NavBarProps = {
  loginModalOpen: boolean;
  setLoginModalOpen: (val: boolean) => void;
}

export default function NavBar({ loginModalOpen, setLoginModalOpen }: NavBarProps) {
  const { t } = useTranslation();
  const windowWidth = useWindowWidth();
  const isDesktop = windowWidth >= 920;
  const isBigDesktop = windowWidth >= 1250;
  const { address, isConnected } = useAccount();
  const { isLight } = useTheme();
  const { chain } = useChainContext();
  const { data: balance } = useBalance({
    address,
    chainId: CHAIN_MAP[chain],
  });
  const [chooseNetwork, setChooseNetwork] = useState(false);
  const [activeChain, setActiveChain] = useState<Chain>('eth');
  const [showOptions, setShowOptions] = useState(false);

  // Sync active chain with context
  useEffect(() => {
    setActiveChain(chain);
  }, [chain]);

  const formattedBalance = balance
    ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}`
    : '';

  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : '';

  return (
    <>
      {loginModalOpen && <WalletModal close={setLoginModalOpen} />}
      <nav className="w-screen h-20 bg-transparent p-3 mb-28">
        <div
          className={`w-full h-full flex items-center ${!isDesktop && 'justify-between'}`}
        >
          <NavLogo />
          {isDesktop && <NavTabSwitcher />}
          <div
            className={`flex justify-end ${
              isDesktop ? 'basis-1/4' : 'basis-3/4'
            } space-x-2 h-12`}
          >
            <div
              className={`flex items-center rounded-2xl ${
                isLight ? 'bg-white' : 'bg-blue-600'
              } p-2 select-none relative`}
              onMouseEnter={() => setChooseNetwork(true)}
            >
              <Image
                src={CHAIN_METADATA[activeChain].logo}
                alt="chain logo"
                width={24}
                height={24}
                className="mr-1"
              />
              {isBigDesktop && (
                <span
                  className={`flex items-center mr-1 text-sm select-none ${
                    isLight ? 'text-black' : 'text-white'
                  }`}
                >
                  {CHAIN_METADATA[activeChain].name}
                </span>
              )}
              <ChevronDownIcon
                className={`h-4 w-4 ${isLight ? 'text-black' : 'text-white'}`}
              />
              {chooseNetwork && (
                <ChooseNetwork
                  isChoosing={setChooseNetwork}
                  activeChain={activeChain}
                  chooseChain={setActiveChain}
                />
              )}
            </div>

            {!isConnected && (
              <div
                className={isLight ? styles.lightButton : styles.darkButton}
                onClick={() => setLoginModalOpen(true)}
              >
                {t('nav.connect')}
              </div>
            )}

            {isConnected && (
              <div
                className={isLight ? styles.connectLight : styles.connectDark}
                onClick={() => setLoginModalOpen(true)}
              >
                <span className="p-1 text-xs">{formattedBalance}</span>
                <span className={isLight ? styles.addressLight : styles.addressDark}>
                  {shortAddress}
                </span>
              </div>
            )}

            <div
              className={`flex items-center justify-center rounded-2xl py-2 px-3 ${
                isLight ? 'bg-white' : 'bg-blue-600'
              }`}
            >
              <span
                className="h-full w-full flex items-center cursor-pointer"
                onClick={() => setShowOptions(!showOptions)}
              >
                <EllipsisHorizontalIcon
                  className={`h-5 w-5 ${isLight ? 'fill-black' : 'fill-white'}`}
                />
              </span>
              {showOptions && <MoreOptionsDropDown showOptions={setShowOptions} />}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

const styles = {
  lightButton:
    'bg-orange-300 rounded-2xl p-2 border-2 border-white text-white text-light text-sm md:w-40 cursor-pointer select-none flex justify-center items-center',
  darkButton:
    'bg-blue-500 rounded-2xl p-2 border-2 border-blue-400 text-white text-light text-sm md:w-40 cursor-pointer select-none flex justify-center items-center',
  connectLight:
    'rounded-2xl bg-white flex justify-between items-center flex-1 max-w-[220px] p-1 font-bold md:max-w-[220px] cursor-pointer',
  connectDark:
    'rounded-2xl bg-blue-600 flex justify-between items-center flex-1 max-w-[220px] text-white p-1 font-bold md:max-w-[220px] cursor-pointer',
  addressLight:
    'text-sm flex-1 rounded-2xl h-full bg-gray-200 flex items-center justify-center',
  addressDark:
    'text-sm flex-1 rounded-2xl h-full bg-blue-500 flex items-center justify-center',
};
