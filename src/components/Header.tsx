import Link from 'next/link';
import { Button } from './Button';

export function Header() {
  return (
    <header className='fixed top-0 left-0 right-0 border-b border-gray-100 bg-white/80 backdrop-blur-md z-50'>
      <nav className='mx-auto max-w-7xl px-6 py-4'>
        <div className='flex items-center justify-between'>
          <Link href='/' className='text-2xl font-bold'>
            Kabeiri
          </Link>
          <div className='absolute left-1/2 -translate-x-1/2'>
            <div className='hidden md:flex items-center gap-8 text-lg text-gray-600 transition-colors font-semibold'>
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
          <Link href='/login'>
            <Button variant='primary' size='sm'>
              Login
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
