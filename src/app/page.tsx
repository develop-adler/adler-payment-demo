'use client';
import Image from 'next/image';
import Link from 'next/link';

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
            <div
              className="bg-gray-200 rounded-t-2xl flex items-center justify-center h-32"
            >
            <Image
              src={product.image}
              alt={product.name}
              width={100}
              height={100}
              className="w-32 h-32 object-cover rounded-t-2xl center"
              quality={75}
              loading="lazy"
              placeholder="empty"
            />
            </div>
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

