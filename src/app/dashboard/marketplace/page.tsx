'use client';

import { Search, ShoppingCart } from 'lucide-react';

import { Button } from '@/components/Button';

import { ProductCard } from './_components/ProductCard';

const products = [
  {
    id: 1,
    name: 'Brake Pads - Premium',
    category: 'Brakes',
    supplier: 'AutoParts Pro',
    price: 89.99,
    rating: 4.5,
    status: 'In Stock' as const,
  },
  {
    id: 2,
    name: 'Oil Filter - Standard',
    category: 'Filters',
    supplier: 'Parts Plus',
    price: 12.99,
    rating: 4.0,
    status: 'Low Stock' as const,
  },
  {
    id: 3,
    name: 'Spark Plugs Set',
    category: 'Ignition',
    supplier: 'ElectroParts',
    price: 45.99,
    rating: 4.8,
    status: 'In Stock' as const,
  },
];

export default function MarketplacePage() {
  return (
    <main className='p-8'>
      <div className='mx-auto max-w-7xl'>
        <div className='mb-8 flex items-center justify-between'>
          <h1 className='text-3xl font-bold'>Marketplace</h1>
          <Button variant='secondary'>
            <ShoppingCart className='mr-2 size-5' />
            Cart (0)
          </Button>
        </div>

        <div className='mb-8 space-y-4'>
          {/* Search Bar */}
          <div className='relative'>
            <Search className='absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-400' />
            <input
              type='text'
              placeholder='Search parts or rental spaces...'
              className='w-full rounded-lg border border-gray-200 bg-white py-3 pl-12 pr-4 text-base placeholder:text-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500'
            />
          </div>

          {/* Filters */}
          <div className='flex gap-4'>
            <Button>Car Parts</Button>
            <Button variant='secondary'>Rental Spaces</Button>
            <select className='rounded-lg border border-gray-200 bg-white px-4 py-2 text-base focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500'>
              <option>All Categories</option>
              <option>Brakes</option>
              <option>Filters</option>
              <option>Ignition</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </main>
  );
}
