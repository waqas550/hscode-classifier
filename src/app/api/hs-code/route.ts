import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const API_URL = process.env.API_URL || 'https://trader-5n0t.onrender.com/api/v1/hs-code/classify';

export async function POST(request: NextRequest) {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept, Origin',
    };

    const body = await request.json();

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': 'https://waqas550.github.io'
      },
      body: JSON.stringify(body),
    });

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { message: 'Server returned non-JSON response' },
        { status: 500, headers }
      );
    }

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Classification failed' },
        { status: response.status, headers }
      );
    }

    return NextResponse.json(data, { headers });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { message: 'Classification failed', error: error instanceof Error ? error.message : 'Unknown error' },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept, Origin',
      'Access-Control-Max-Age': '86400',
    },
  });
} 
