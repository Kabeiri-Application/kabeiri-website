'use client';

import { Button } from '@/components/Button';

interface ProductCardProps {
  name: string;
  category: string;
  supplier: string;
  price: number;
  rating: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

export function ProductCard({
  name,
  category,
  supplier,
  price,
  rating,
  status,
}: ProductCardProps) {
  return (
    <div className='rounded-2xl bg-white p-6 shadow-sm'>
      <div className='mb-4 flex items-start justify-between'>
        <div>
          <h3 className='text-xl font-bold'>{name}</h3>
          <div className='mt-2 space-y-1 text-sm text-gray-600'>
            <p>Category: {category}</p>
            <p>Supplier: {supplier}</p>
          </div>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            status === 'In Stock'
              ? 'bg-green-100 text-green-700'
              : status === 'Low Stock'
                ? 'bg-red-100 text-red-700'
                : 'bg-yellow-100 text-yellow-700'
          }`}>
          {status}
        </span>
      </div>

      <div className='flex items-center justify-between'>
        <div>
          <p className='text-2xl font-bold'>${price.toFixed(2)}</p>
          <p className='text-sm text-gray-600'>Rating: {rating}/5</p>
        </div>
        <Button variant='primary'>Add to Cart</Button>
      </div>
    </div>
  );
}
