import { Header } from '@/components/Header';
import { Button } from '@/components/Button';
import Link from 'next/link';
import { FeatureCard } from '@/components/FeatureCard';

export default function Home() {
  return (
    <main className='bg-white'>
      <Header />

      <section className='min-h-screen flex items-center justify-center px-6'>
        <div className='mx-auto max-w-7xl pt-20'>
          <div className='max-w-4xl mx-auto text-center'>
            <div className='flex items-center justify-center mb-4'>
              <span className='text-purple-600 font-semibold border px-4 py-1 rounded-full border-purple-600'>
                The Future of Automotive Care
              </span>
            </div>
            <h2 className='text-6xl md:text-7xl font-bold tracking-tight mb-8'>
              The Operating System for
              <br />
              <span className='bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
                Modern Auto Service
              </span>
            </h2>
            <p className='text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed'>
              Revolutionizing automotive care with AI diagnostics, digital
              workflows, and an open ecosystem for innovation
            </p>
            <div className='flex items-center justify-center gap-4'>
              <Link href='/login'>
                <Button variant='primary'>Join the Revolution</Button>
              </Link>
              <Link href='/#features'>
                <Button variant='secondary'>Explore Platform →</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        id='features'
        className='py-24 bg-gradient-to-b from-gray-50 to-white'
      >
        <div className='mx-auto max-w-7xl px-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20'>
            <FeatureCard
              icon={
                <div className='w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center'>
                  <svg
                    className='w-6 h-6 text-purple-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                    />
                  </svg>
                </div>
              }
              title='AI-Powered Diagnostics'
              description='Advanced real-time diagnostics and predictive maintenance powered by our proprietary AI technology and OBD integration.'
            />

            <FeatureCard
              icon={
                <div className='w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center'>
                  <svg
                    className='w-6 h-6 text-blue-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
                    />
                  </svg>
                </div>
              }
              title='Digital Workflows'
              description='Streamlined operations for mechanics and workshops with smart scheduling, digital documentation, and automated reporting.'
            />

            <FeatureCard
              icon={
                <div className='w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center'>
                  <svg
                    className='w-6 h-6 text-pink-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4'
                    />
                  </svg>
                </div>
              }
              title='Open APIs'
              description='Build innovative solutions with our comprehensive API suite, enabling seamless integration with your existing systems.'
            />

            <FeatureCard
              icon={
                <div className='w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center'>
                  <svg
                    className='w-6 h-6 text-green-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                    />
                  </svg>
                </div>
              }
              title='Marketplace'
              description='Access a thriving ecosystem of third-party apps, services, and automotive solutions all in one place.'
            />

            <FeatureCard
              icon={
                <div className='w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center'>
                  <svg
                    className='w-6 h-6 text-orange-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                    />
                  </svg>
                </div>
              }
              title='Multi-User Access'
              description='Collaborate seamlessly between car owners, mechanics, and service providers with role-based access control.'
            />

            <FeatureCard
              icon={
                <div className='w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center'>
                  <svg
                    className='w-6 h-6 text-indigo-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
                    />
                  </svg>
                </div>
              }
              title='Enterprise Security'
              description='Bank-grade security protocols and compliance measures to protect your sensitive automotive data.'
            />
          </div>
        </div>
      </section>

      <section className='py-24'>
        <div className='mx-auto max-w-7xl px-6'>
          <div className='rounded-3xl bg-gradient-to-r from-purple-900 to-pink-900 p-20 text-center'>
            <h2 className='text-4xl font-bold text-white mb-6'>
              Join the Automotive Revolution
            </h2>
            <p className='text-gray-200 mb-8 max-w-2xl mx-auto'>
              Whether you&apos;re a car owner, mechanic, or developer, be part
              of the platform that&apos;s reshaping the future of automotive
              care.
            </p>
            <div className='flex gap-4 justify-center'>
              <Link href='/login'>
                <Button variant='white'>Get started now →</Button>
              </Link>
              <Link href='mailto:partners@kabeiri.app'>
                <Button variant='outline-white'>Become a Partner</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
