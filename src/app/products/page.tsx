import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';

async function getProducts() {
  const res = await fetch('http://localhost:3000/api/products', { cache: 'no-store' });
  if (!res.ok) throw new Error('商品の取得に失敗しました');
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">商品一覧</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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
              <div className="p-2">
                <h2 className="text-sm font-semibold truncate">{product.name}</h2>
                <p className="text-xs text-gray-600">
                  {product.default_price
                    ? `€${(product.default_price / 100).toFixed(2)}`
                    : 'Sold out'}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
