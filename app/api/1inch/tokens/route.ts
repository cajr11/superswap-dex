import { NextRequest, NextResponse } from 'next/server';

const ONEINCH_API_BASE = 'https://api.1inch.dev/swap/v6.0';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const chainId = searchParams.get('chainId') || '1';

  const apiKey = process.env.ONEINCH_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: '1inch API key not configured' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(`${ONEINCH_API_BASE}/${chainId}/tokens`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`1inch API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch tokens:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tokens' },
      { status: 500 }
    );
  }
}
