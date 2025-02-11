import Link from 'next/link';

import {
  Building,
  Download,
  MonitorCog,
  ShieldCheck,
  ShoppingCart,
  Users,
} from 'lucide-react';

import { Button } from '@/components/Button';
import { CTA } from '@/components/CTA';
import { FeatureCard } from '@/components/FeatureCard';

export default function Home() {
  return (
    <main className='bg-white'>
      <section className='flex min-h-screen items-center justify-center px-4 sm:px-6'>
        <div className='mx-auto max-w-7xl pt-16 sm:pt-20'>
          <div className='mx-auto max-w-4xl text-center'>
            <div className='mb-4 flex items-center justify-center'>
              <span className='rounded-full border border-purple-600 px-3 py-1 text-sm font-semibold text-purple-600 sm:px-4 sm:text-base'>
                The Future of Automotive Care
              </span>
            </div>
            <h2 className='mb-6 text-5xl font-bold tracking-tight sm:mb-8 sm:text-6xl lg:text-7xl'>
              The Operating System for
              <br />
              <span className='bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
                Modern Auto Service
              </span>
            </h2>
            <p className='mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-gray-600 sm:mb-12 sm:text-xl md:text-2xl'>
              Revolutionizing automotive care with AI diagnostics, digital
              workflows, and an open ecosystem for innovation
            </p>
            <div className='flex flex-col items-center justify-center gap-4 md:flex-row'>
              <Link href='/signup'>
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
        className='scroll-mt-16 bg-gradient-to-b from-gray-50 to-white py-16 sm:py-24'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6'>
          <div className='grid grid-cols-1 gap-x-6 gap-y-12 sm:gap-x-8 sm:gap-y-20 md:grid-cols-2 lg:grid-cols-3'>
            <FeatureCard
              icon={
                <div className='flex size-10 items-center justify-center rounded-xl bg-purple-100 sm:size-12'>
                  <MonitorCog className='size-5 text-purple-600 sm:size-6' />
                </div>
              }
              title='AI-Powered Diagnostics'
              description='Advanced real-time diagnostics and predictive maintenance powered by our proprietary AI technology and OBD integration.'
            />

            <FeatureCard
              icon={
                <div className='flex size-10 items-center justify-center rounded-xl bg-blue-100 sm:size-12'>
                  <Building className='size-5 text-blue-600 sm:size-6' />
                </div>
              }
              title='Digital Workflows'
              description='Streamlined operations for mechanics and workshops with smart scheduling, digital documentation, and automated reporting.'
            />

            <FeatureCard
              icon={
                <div className='flex size-10 items-center justify-center rounded-xl bg-pink-100 sm:size-12'>
                  <Download className='size-5 text-pink-600 sm:size-6' />
                </div>
              }
              title='Open APIs'
              description='Build innovative solutions with our comprehensive API suite, enabling seamless integration with your existing systems.'
            />

            <FeatureCard
              icon={
                <div className='flex size-10 items-center justify-center rounded-xl bg-green-100 sm:size-12'>
                  <ShoppingCart className='size-5 text-green-600 sm:size-6' />
                </div>
              }
              title='Marketplace'
              description='Access a thriving ecosystem of third-party apps, services, and automotive solutions all in one place.'
            />

            <FeatureCard
              icon={
                <div className='flex size-10 items-center justify-center rounded-xl bg-orange-100 sm:size-12'>
                  <Users className='size-5 text-orange-600 sm:size-6' />
                </div>
              }
              title='Multi-User Access'
              description='Collaborate seamlessly between car owners, mechanics, and service providers with role-based access control.'
            />

            <FeatureCard
              icon={
                <div className='flex size-10 items-center justify-center rounded-xl bg-indigo-100 sm:size-12'>
                  <ShieldCheck className='size-5 text-indigo-600 sm:size-6' />
                </div>
              }
              title='Enterprise Security'
              description='Bank-grade security protocols and compliance measures to protect your sensitive automotive data.'
            />
          </div>
        </div>
      </section>

      <CTA className='mb-24' />
    </main>
  );
}
