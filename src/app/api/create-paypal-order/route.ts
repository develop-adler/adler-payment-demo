import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { amount } = body;

  if (!amount) {
    return NextResponse.json({ message: 'Amount is required' }, { status: 400 });
  }

  try {
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

    console.log('Access Token:', accessToken);

    const orderRes = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: amount,
            },
          },
        ],
        payment_source: {
          paypal: {
            experience_context: {
              payment_method_preference: 'IMMEDIATE_PAYMENT_REQUIRED',
              payment_method_selected: 'PAYPAL',
              brand_name: 'EXAMPLE INC',
              locale: 'en-US',
              landing_page: 'LOGIN',
              shipping_preference: 'GET_FROM_FILE',
              user_action: 'PAY_NOW',
              return_url: 'https://example.com/return',
              cancel_url: 'https://example.com/cancel',
            },
          },
        },
      }),
    });

    const orderData = await orderRes.json();
    return NextResponse.json(orderData);
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
