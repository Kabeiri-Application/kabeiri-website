import Link from 'next/link';

import { Button } from '@/components/Button';
import { cn } from '@/utils/cn';

export function CTA({ className }: { className?: string }) {
  return (
    <section className={cn('mx-auto max-w-7xl px-6', className)}>
      <div className='rounded-3xl bg-gradient-to-r from-purple-900 to-pink-900 p-20 text-center'>
        <h2 className='mb-6 text-4xl font-bold text-white'>
          Join the Automotive Revolution
        </h2>
        <p className='mx-auto mb-8 max-w-2xl text-gray-200'>
          Whether you&apos;re a car owner, mechanic, or developer, be part of
          the platform that&apos;s reshaping the future of automotive care.
        </p>
        <div className='flex flex-col justify-center gap-4 md:flex-row'>
          <Link href='/login'>
            <Button variant='primary-white'>Get started now →</Button>
          </Link>
          <Link href='mailto:partners@kabeiri.app'>
            <Button variant='secondary-white'>Become a Partner</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
