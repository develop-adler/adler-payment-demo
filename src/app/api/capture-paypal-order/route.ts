import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderID } = body;

    if (!orderID) {
      return NextResponse.json({ message: 'Missing orderID in request body' }, { status: 400 });
    }

    // Step 1: Get PayPal Access Token
    const basicAuth = Buffer.from(
      `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
    ).toString('base64');

    const tokenRes = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    // Step 2: Capture the order
    const captureRes = await fetch(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const captureData = await captureRes.json();

    if (!captureRes.ok) {
      return NextResponse.json(
        {
          message: 'Failed to capture order',
          details: captureData,
        },
        { status: captureRes.status }
      );
    }

    return NextResponse.json(captureData);
  } catch (error) {
    console.error('Error capturing order:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
