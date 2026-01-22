import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { mainnet, polygon, arbitrum, base } from 'wagmi/chains';

const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || '';
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '';

export const config = getDefaultConfig({
  appName: 'Superswap DEX',
  projectId: walletConnectProjectId,
  chains: [mainnet, polygon, arbitrum, base],
  transports: {
    [mainnet.id]: http(
      `https://eth-mainnet.g.alchemy.com/v2/${alchemyApiKey}`
    ),
    [polygon.id]: http(
      `https://polygon-mainnet.g.alchemy.com/v2/${alchemyApiKey}`
    ),
    [arbitrum.id]: http(
      `https://arb-mainnet.g.alchemy.com/v2/${alchemyApiKey}`
    ),
    [base.id]: http(
      `https://base-mainnet.g.alchemy.com/v2/${alchemyApiKey}`
    ),
  },
  ssr: true,
});
