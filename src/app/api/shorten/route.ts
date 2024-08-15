// app/api/shorten/route.ts
import { NextResponse } from 'next/server';

const apiKey = process.env.API_KEY;

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    const response = await fetch('https://shrtlnk.dev/api/v2/link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'api-key': apiKey!,
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error('Failed to shorten the URL');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
