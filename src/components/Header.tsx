import Link from 'next/link';

import { Button } from '@/components/Button';

export function Header() {
  return (
    <header className='fixed inset-x-0 top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md'>
      <nav className='mx-auto max-w-7xl px-6 py-4'>
        <div className='flex items-center justify-between'>
          <Link href='/' className='text-2xl font-bold'>
            Kabeiri
          </Link>
          <div className='absolute left-1/2 -translate-x-1/2'>
            <div className='hidden items-center gap-8 text-lg font-semibold text-gray-600 transition-colors md:flex'>
              <Link href='/#features' className='hover:text-gray-900'>
                Features
              </Link>
              <Link href='/pricing' className='hover:text-gray-900'>
                Pricing
              </Link>
              <Link href='/about' className='hover:text-gray-900'>
                About
              </Link>
            </div>
          </div>
          <Link aria-disabled href='/login'>
            <Button aria-disabled disabled variant='primary' size='sm'>
              Login
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
