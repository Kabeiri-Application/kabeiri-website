import Link from 'next/link';

export function Footer() {
  return (
    <footer className='border-t border-gray-200 bg-white'>
      <div className='mx-auto max-w-7xl px-6 py-12 md:py-16'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-4'>
          <div className='space-y-4'>
            <h3 className='text-lg font-medium text-gray-900'>Kabeiri</h3>
            <p className='text-base text-gray-600'>
              The Operating System for Modern Auto Service
            </p>
          </div>

          <div className='space-y-4'>
            <h3 className='text-lg font-medium text-gray-900'>Product</h3>
            <ul className='space-y-3'>
              <li>
                <Link
                  href='/#features'
                  className='text-base text-gray-600 transition-colors hover:text-gray-900'>
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href='/pricing'
                  className='text-base text-gray-600 transition-colors hover:text-gray-900'>
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div className='space-y-4'>
            <h3 className='text-lg font-medium text-gray-900'>Company</h3>
            <ul className='space-y-3'>
              <li>
                <Link
                  href='/about'
                  className='text-base text-gray-600 transition-colors hover:text-gray-900'>
                  About
                </Link>
              </li>
              <li>
                <Link
                  href='mailto:hello@kabeiri.app'
                  className='text-base text-gray-600 transition-colors hover:text-gray-900'>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className='space-y-4'>
            <h3 className='text-lg font-medium text-gray-900'>Legal</h3>
            <ul className='space-y-3'>
              <li>
                <Link
                  href='/privacy'
                  className='text-base text-gray-600 transition-colors hover:text-gray-900'>
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href='/terms'
                  className='text-base text-gray-600 transition-colors hover:text-gray-900'>
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className='mt-12 border-t border-gray-200 pt-8'>
          <p className='text-center text-base text-gray-600'>
            &copy; {new Date().getFullYear()} Kabeiri Corp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
