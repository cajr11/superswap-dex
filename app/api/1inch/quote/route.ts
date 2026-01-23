import { NextRequest, NextResponse } from 'next/server';

const ONEINCH_API_BASE = 'https://api.1inch.dev/swap/v6.0';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const chainId = searchParams.get('chainId');
  const src = searchParams.get('src'); // fromTokenAddress
  const dst = searchParams.get('dst'); // toTokenAddress
  const amount = searchParams.get('amount');

  if (!chainId || !src || !dst || !amount) {
    return NextResponse.json(
      { error: 'Missing required parameters: chainId, src, dst, amount' },
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
    const url = new URL(`${ONEINCH_API_BASE}/${chainId}/quote`);
    url.searchParams.set('src', src);
    url.searchParams.set('dst', dst);
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
  } catch (error) {
    console.error('Failed to fetch quote:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch quote' },
      { status: 500 }
    );
  }
}
