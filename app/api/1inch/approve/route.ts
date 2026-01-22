import { NextRequest, NextResponse } from 'next/server';

const ONEINCH_API_BASE = 'https://api.1inch.dev/swap/v6.0';

// Get the 1inch router address for token approval
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const chainId = searchParams.get('chainId');
  const tokenAddress = searchParams.get('tokenAddress');
  const amount = searchParams.get('amount');

  if (!chainId) {
    return NextResponse.json(
      { error: 'Missing required parameter: chainId' },
      { status: 400 }
    );
  }

  const apiKey = process.env.ONEINCH_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: '1inch API key not configured' },
      { status: 500 }
    );
  }

  try {
    // If tokenAddress is provided, get the approve transaction data
    if (tokenAddress && amount) {
      const url = new URL(`${ONEINCH_API_BASE}/${chainId}/approve/transaction`);
      url.searchParams.set('tokenAddress', tokenAddress);
      url.searchParams.set('amount', amount);

      const response = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.description || `1inch API error: ${response.status}`);
      }

      const data = await response.json();
      return NextResponse.json(data);
    }

    // Otherwise just get the spender address
    const response = await fetch(`${ONEINCH_API_BASE}/${chainId}/approve/spender`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.description || `1inch API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to get approve data:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to get approve data' },
      { status: 500 }
    );
  }
}
