import type { Metadata } from 'next';
import { ThemeContextProvider } from '@/context/theme-context';
import { ChainContextProvider } from '@/context/chain-context';
import { Web3Provider } from '@/providers/Web3Provider';
import './globals.css';

// Import i18n on the client side
import '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Superswap DEX',
  description: 'Decentralized Token Exchange - Swap tokens across Ethereum, Polygon, and Arbitrum',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeContextProvider>
          <Web3Provider>
            <ChainContextProvider>
              {children}
            </ChainContextProvider>
          </Web3Provider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
