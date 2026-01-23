import { NextRequest, NextResponse } from 'next/server';
import { getTransactionHistory } from '@/lib/alchemy';
import type { Chain } from '@/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');
  const chain = searchParams.get('chain') as Chain;

  if (!address || !chain) {
    return NextResponse.json(
      { error: 'Missing required parameters: address, chain' },
      { status: 400 }
    );
  }

  // Validate chain
  if (!['eth', 'polygon', 'arbitrum', 'base'].includes(chain)) {
    return NextResponse.json(
      { error: 'Invalid chain. Must be eth, polygon, arbitrum, or base' },
      { status: 400 }
    );
  }

  try {
    const transactions = await getTransactionHistory(address, chain);
    return NextResponse.json({ transactions });
  } catch (error) {
    console.error('Failed to fetch transactions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}
