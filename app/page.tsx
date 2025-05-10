'use client';
import Image from 'next/image';
import Link from 'next/link';

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

export default function ProductList() {
  return (
    <div className="mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-center mb-12">Our Products</h2>
      <div className="flex justify-center gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={100}
              height={100}
              className="w-full h-48 object-cover rounded-t-2xl"
              quality={75}
              loading="lazy"
              placeholder="empty"
            />
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-500 text-sm mb-4">{product.description}</p>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                <Link href={`/buy/${product.id}`} passHref>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition">
                    Buy Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

