'use client';

import { useTranslation } from 'react-i18next';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { useChainContext } from '@/context/chain-context';
import { useTheme } from '@/context/theme-context';
import { CHAIN_METADATA } from '@/lib/chains';
import type { Chain } from '@/types';
import Image from 'next/image';

type ChooseNetworkProps = {
  isChoosing: (val: boolean) => void;
  activeChain: Chain;
  chooseChain: (val: Chain) => void;
}

export default function ChooseNetwork({
  isChoosing,
  activeChain,
  chooseChain,
}: ChooseNetworkProps) {
  const { t } = useTranslation();
  const { changeChain } = useChainContext();
  const { isLight } = useTheme();

  const handleChoice = (val: Chain) => {
    return (event: React.MouseEvent) => {
      event.preventDefault();
      chooseChain(val);
      changeChain(val);
      isChoosing(false);
    };
  };

  const networks: { id: Chain; nameKey: string; scanKey: string; scanUrl: string }[] = [
    {
      id: 'eth',
      nameKey: 'choose-network.networks.eth',
      scanKey: 'choose-network.scans.eth',
      scanUrl: 'https://etherscan.io',
    },
    {
      id: 'polygon',
      nameKey: 'choose-network.networks.matic',
      scanKey: 'choose-network.scans.matic',
      scanUrl: 'https://polygonscan.com',
    },
    {
      id: 'arbitrum',
      nameKey: 'choose-network.networks.arbitrum',
      scanKey: 'choose-network.scans.arbitrum',
      scanUrl: 'https://arbiscan.io',
    },
    {
      id: 'base',
      nameKey: 'choose-network.networks.base',
      scanKey: 'choose-network.scans.base',
      scanUrl: 'https://basescan.org',
    },
  ];

  return (
    <div
      className={`absolute top-16 rounded-2xl min-w-[250px] min-h-40 p-4 z-50 ${
        isLight ? 'bg-white' : 'bg-[#333333]'
      }`}
      onMouseLeave={() => isChoosing(false)}
    >
      <div className={`w-full h-8 text-base ${isLight ? 'text-gray-500' : 'text-[#A7A7A7]'}`}>
        {t('choose-network.select')}
      </div>

      {networks.map((network) => (
        <div
          key={network.id}
          className={`w-full cursor-pointer rounded-lg ${
            activeChain === network.id
              ? isLight ? 'mb-3 p-4 bg-gray-100' : 'mb-3 p-4 bg-[#646464]'
              : 'mb-4 p-2'
          } ${isLight ? 'text-black' : 'text-white'}`}
        >
          <div
            className={`w-full flex items-center justify-between ${
              activeChain === network.id ? 'mb-3' : ''
            }`}
            onClick={handleChoice(network.id)}
          >
            <div className="flex items-center">
              <Image
                src={CHAIN_METADATA[network.id].logo}
                alt={network.id}
                width={20}
                height={20}
                className="mr-3"
              />
              <span>{t(network.nameKey)}</span>
            </div>
            {activeChain === network.id && (
              <span className="w-2 h-2 bg-green-800 rounded-full"></span>
            )}
          </div>
          {activeChain === network.id && (
            <a
              href={network.scanUrl}
              target="_blank"
              rel="noreferrer"
              className="flex justify-between items-center w-full pl-1 hover:underline cursor-pointer"
            >
              <span className={`text-xs font-semibold underline-offset-1 mr-1 ${isLight ? 'text-gray-500' : 'text-[#A7A7A7]'}`}>
                {t(network.scanKey)}
              </span>
              <ArrowTopRightOnSquareIcon className={`w-4 h-4 ${isLight ? 'text-gray-500' : 'text-[#A7A7A7]'}`} />
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
