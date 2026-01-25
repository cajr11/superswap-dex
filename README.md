# Superswap

A multi-chain decentralized exchange (DEX) that enables users to swap tokens across Ethereum, Polygon, and Arbitrum networks. Superswap provides a seamless trading experience with real-time price quotes, gas estimation, and transaction history tracking.

## Overview

Superswap aggregates liquidity from multiple decentralized exchanges to find optimal swap rates for users. The application connects to users' wallets through WalletConnect or browser extensions, allowing them to execute token swaps directly from their self-custodial wallets. All transactions are processed on-chain with full transparency.

## Architecture

The application is built as a Next.js application with server-side API routes for secure external service communication:

```
superswap-dex/
├── app/                    # Next.js App Router pages and API routes
│   ├── api/               # Server-side API routes for 1inch and Alchemy
│   ├── transactions/      # Transaction history page
│   └── page.tsx           # Main swap interface
├── components/            # React components
│   ├── NavBar/           # Navigation and network selection
│   ├── SwapForm/         # Token swap interface
│   └── UI/               # Modals and shared components
├── hooks/                 # Custom React hooks for Web3 interactions
├── lib/                   # Configuration and utilities
├── context/              # React context providers
├── providers/            # Web3 and theme providers
└── types/                # TypeScript type definitions
```

## Key Features

- Multi-chain support for Ethereum, Polygon, and Arbitrum networks
- DEX aggregation for optimal swap rates and minimal slippage
- Real-time price quotes with gas fee estimation
- Transaction history tracking via Alchemy
- Wallet connection through RainbowKit (MetaMask, WalletConnect, Coinbase Wallet)
- Network switching with automatic wallet prompts
- Internationalization (English and Spanish)
- Light and dark theme support
- Responsive design for mobile and desktop

## Technology Stack

**Framework:**
- Next.js 16 (App Router)
- React 19
- TypeScript

**Web3:**
- wagmi v2
- viem
- RainbowKit

**Services:**
- Alchemy SDK (RPC and transaction history)
- 1inch API (DEX aggregation)

**Styling:**
- Tailwind CSS
- Heroicons

**State Management:**
- TanStack Query
- React Context

## Getting Started

### Prerequisites

- Node.js 20.9 or higher
- pnpm, npm, or yarn

### Environment Variables

Create a `.env.local` file in the project root:

```
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
ONEINCH_API_KEY=your_1inch_api_key
```

**Obtaining API Keys:**

- **Alchemy:** Create an account at [alchemy.com](https://www.alchemy.com/) and create a new app
- **WalletConnect:** Register at [cloud.walletconnect.com](https://cloud.walletconnect.com/) and create a new project
- **1inch:** Register at [portal.1inch.dev](https://portal.1inch.dev/) to obtain API access

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

### Production Build

```bash
pnpm build
pnpm start
```

## Usage

### Connecting a Wallet

Click "Connect Wallet" in the navigation bar to open the wallet selection modal. Select your preferred wallet provider and approve the connection request in your wallet.

### Swapping Tokens

1. Select the source token and enter the amount to swap
2. Select the destination token
3. Review the quoted output amount and estimated gas fees
4. Click "Swap" and confirm the transaction in your wallet
5. Wait for the transaction to be confirmed on-chain

### Switching Networks

Hover over the network selector in the navigation bar to switch between Ethereum, Polygon, and Arbitrum. Your wallet will prompt you to approve the network change.

### Viewing Transaction History

Navigate to the Transactions page to view your recent transactions on the selected network.

## Demo

| Live Site | Source Code |
|-----------|-------------|
| [superswap-dex.vercel.app](https://superswap-dex.vercel.app) | [github.com/cajr11/superswap-dex](https://github.com/cajr11/superswap-dex) |

## License

MIT
