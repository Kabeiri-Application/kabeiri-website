import Link from 'next/link';

import { Button } from '@/components/Button';
import { cn } from '@/utils/cn';

export function CTA({ className }: { className?: string }) {
  return (
    <section className={cn('mx-auto max-w-7xl px-4 sm:px-6', className)}>
      <div className='rounded-2xl bg-gradient-to-r from-purple-900 to-pink-900 p-8 text-center sm:rounded-3xl sm:p-12 md:p-20'>
        <h2 className='mb-4 text-3xl font-bold text-white sm:mb-6 sm:text-4xl'>
          Join the Automotive Revolution
        </h2>
        <p className='mx-auto mb-6 max-w-2xl text-base text-gray-200 sm:mb-8 sm:text-lg'>
          Whether you&apos;re a car owner, mechanic, or developer, be part of
          the platform that&apos;s reshaping the future of automotive care.
        </p>
        <div className='flex flex-col justify-center gap-3 sm:gap-4 md:flex-row'>
          <Link href='/signup' className='w-full md:w-auto'>
            <Button variant='primary-white' className='w-full md:w-auto'>
              Get started now →
            </Button>
          </Link>
          <Link href='mailto:partners@kabeiri.app' className='w-full md:w-auto'>
            <Button variant='secondary-white' className='w-full md:w-auto'>
              Become a Partner
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
