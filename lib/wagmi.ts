import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { mainnet, polygon, arbitrum, base } from 'wagmi/chains';
import { ONEINCH_CHAIN_IDS } from '@/lib/chains';

const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || '';
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '';

export const config = getDefaultConfig({
  appName: 'Superswap DEX',
  projectId: walletConnectProjectId,
  chains: [mainnet, polygon, arbitrum, base],
  transports: {
    [ONEINCH_CHAIN_IDS.eth]: http(
      `https://eth-mainnet.g.alchemy.com/v2/${alchemyApiKey}`
    ),
    [ONEINCH_CHAIN_IDS.polygon]: http(
      `https://polygon-mainnet.g.alchemy.com/v2/${alchemyApiKey}`
    ),
    [ONEINCH_CHAIN_IDS.arbitrum]: http(
      `https://arb-mainnet.g.alchemy.com/v2/${alchemyApiKey}`
    ),
    [ONEINCH_CHAIN_IDS.base]: http(
      `https://base-mainnet.g.alchemy.com/v2/${alchemyApiKey}`
    ),
  },
  ssr: true,
});
