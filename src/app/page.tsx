import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';

async function getProducts() {
  const res = await fetch('http://localhost:3000/api/products', { cache: 'no-store' });
  if (!res.ok) throw new Error('商品の取得に失敗しました');
  return res.json();
}

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="relative w-full aspect-[3/2] mt-10 mb-8">
          <Image
            src="/images/top.jpg"
            alt="Jewelry crafting"
            fill
            className="object-cover"
            priority
          />
        </div>
        <h1 className="text-l sm:text-xl font-serif text-gray-500 mt-24 mb-16  text-center">-Products-</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product: Product) => (
            <Link href={`/products/${product.id}`} key={product.id} className="block">
              <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative aspect-square">
                  <Image
                    src={product.image || '/placeholder.jpg'}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-2 sm:p-4">
                  <h2 className="text-xs sm:text-sm font-semibold mb-1 truncate">{product.name}</h2>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    {product.default_price
                      ? `€${(product.default_price / 100).toFixed(2)}`
                      : 'Sold out'}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

// こ