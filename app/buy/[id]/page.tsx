'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';

const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    description: 'Noise cancelling over-ear headphones with high fidelity sound.',
    price: 129.99,
    image: '/static/imgs/sample-headphone.jpg',
  },
  {
    id: 2,
    name: 'Smart Watch',
    description: 'Track your fitness and receive smart notifications on the go.',
    price: 89.99,
    image: '/static/imgs/sample-smartwatch.jpg',
  },
  {
    id: 3,
    name: 'Bluetooth Speaker',
    description: 'Portable speaker with deep bass and 12-hour battery life.',
    price: 59.99,
    image: '/static/imgs/sample-speaker.jpg',
  },
];

export default function PaymentPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'crypto'>('card');

  if (!product) return <div className="text-center mt-10 text-red-500">Product not found.</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>

      <div className="mb-6 text-center">
        <img src={product.image} alt={product.name} className="w-24 h-24 mx-auto rounded-lg mb-2" />
        <h3 className="text-xl font-semibold">{product.name}</h3>
        <p className="text-gray-500">{product.description}</p>
        <p className="text-lg font-bold mt-2">${product.price.toFixed(2)}</p>
      </div>

      <div className="mb-4 flex justify-center gap-2">
        {['card', 'paypal', 'crypto'].map((method) => (
          <button
            key={method}
            onClick={() => setPaymentMethod(method as 'card' | 'paypal' | 'crypto')}
            className={`px-4 py-2 rounded-lg text-sm border ${
              paymentMethod === method
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            {method === 'card' ? 'Card' : method === 'paypal' ? 'PayPal' : 'Crypto'}
          </button>
        ))}
      </div>

      <form className="space-y-4">
        {paymentMethod === 'card' && (
          <>
            <input type="text" placeholder="Cardholder Name" className="w-full border rounded px-3 py-2" />
            <input type="text" placeholder="Card Number" className="w-full border rounded px-3 py-2" />
            <div className="flex gap-4">
              <input type="text" placeholder="MM/YY" className="w-1/2 border rounded px-3 py-2" />
              <input type="text" placeholder="CVC" className="w-1/2 border rounded px-3 py-2" />
            </div>
          </>
        )}

        {paymentMethod === 'paypal' && (
          <p className="text-center text-sm text-gray-600">
            You’ll be redirected to PayPal to complete your purchase.
          </p>
        )}

        {paymentMethod === 'crypto' && (
          <>
            <p className="text-sm text-gray-600">Send crypto to the address below:</p>
            <div className="bg-gray-100 p-2 rounded text-sm font-mono break-all">
              0xAB12...FA34DE56
            </div>
            <input type="text" placeholder="Enter your wallet address (optional)" className="w-full border rounded px-3 py-2 mt-2" />
          </>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {paymentMethod === 'paypal'
            ? 'Pay with PayPal'
            : paymentMethod === 'crypto'
            ? 'I’ve Sent the Crypto'
            : `Pay $${product.price.toFixed(2)}`}
        </button>
      </form>
    </div>
  );
}
