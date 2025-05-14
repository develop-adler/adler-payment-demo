'use client';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import Crypto from 'src/src/components/Crypto';
import Paypal from 'src/src/components/Paypal';
import Stripe from 'src/src/components/Stripe';

const products = [
  {
    id: 1,
    name: 'Star',
    description: 'Surprise someone with a shimmering 3D star that spins with cosmic charm.',
    price: 0.99,
    image: '/static/imgs/star.png',
  },
  {
    id: 2,
    name: 'Flower',
    description: 'Send a blooming 3D rose that twirls gracefully — a timeless symbol of love and beauty.',
    price: 1.99,
    image: '/static/imgs/flower.png',
  },
  {
    id: 3,
    name: 'Rocket Ship',
    description: 'Launch joy with a flashy 3D rocket ship spinning through space — perfect for dreamers.',
    price: 2.99,
    image: '/static/imgs/rocket.png',
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
        <Image 
          src={product.image} 
          alt={product.name} 
          className="w-24 h-24 mx-auto rounded-lg mb-2"
          width={100}
          height={100}
        />
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

        {paymentMethod === 'card' && (
            <Stripe product={product} />
        )}

        {paymentMethod === 'paypal' && (
            <Paypal product={product} />
        )}

        {paymentMethod === 'crypto' && (
            <Crypto product={product} />
        )}
    </div>
  );
}
