'use client';

import { useState } from 'react';

import { Button } from '@/components/Button';
import { cn } from '@/utils/cn';

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>(
    'monthly'
  );

  const plans: Omit<PricingCardProps, 'billingPeriod'>[] = [
    {
      title: 'Basic',
      description: 'Perfect for individual car owners and enthusiasts',
      price: {
        monthly: 'TBD',
        yearly: 'TBD',
      },
      features: [
        'Real-time vehicle diagnostics',
        'Maintenance history tracking',
        'Access to marketplace',
        'Basic repair estimates',
        'Email support',
      ],
    },
    {
      title: 'Pro',
      description: 'Ideal for professional mechanics and small workshops',
      price: {
        monthly: 'TBD',
        yearly: 'TBD',
      },
      features: [
        'Everything in Basic, plus:',
        'Advanced AI diagnostics',
        'Digital workflow tools',
        'Customer management',
        'Priority email support',
        'API access (100 calls/day)',
      ],
      highlighted: true,
    },
    {
      title: 'Business',
      description: 'For growing auto repair workshops and dealerships',
      price: {
        monthly: 'TBD',
        yearly: 'TBD',
      },
      features: [
        'Everything in Pro, plus:',
        'Unlimited diagnostics',
        'Multi-user access (up to 10)',
        'Advanced analytics',
        'Priority phone support',
        'API access (1000 calls/day)',
      ],
    },
    {
      title: 'Enterprise',
      description: 'Custom solutions for large fleets and manufacturers',
      features: [
        'Everything in Business, plus:',
        'Unlimited users',
        'Custom integrations',
        'Dedicated API access',
        'Custom features',
        '24/7 dedicated support',
      ],
    },
  ] as const;

  return (
    <main className='bg-white'>
      <section className='flex min-h-screen items-center justify-center py-32'>
        <div className='mx-auto max-w-7xl px-6'>
          <div className='mx-auto max-w-3xl text-center'>
            <h1 className='mb-4 text-4xl font-bold tracking-tight md:text-5xl'>
              Simple pricing for
              <br />
              <span className='bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
                every automotive business
              </span>
            </h1>

            <div className='mt-8 flex justify-center'>
              <div className='relative'>
                <div className='absolute -right-10 -top-4 z-10 rounded-full rounded-bl-none bg-gradient-to-b from-purple-600 to-pink-600 px-3 py-1 text-xs font-semibold text-white shadow-lg'>
                  Save TBD%
                </div>
                <div className='relative inline-flex rounded-full border border-gray-200 bg-white p-1 shadow-sm'>
                  <div
                    className={cn(
                      'absolute inset-y-1 w-[120px] rounded-full bg-gradient-to-r from-purple-600 to-pink-600 shadow-sm transition-transform duration-200 ease-in-out',
                      billingPeriod === 'yearly' && 'translate-x-[120px]'
                    )}
                    aria-hidden='true'
                  />
                  <button
                    onClick={() => setBillingPeriod('monthly')}
                    className={cn(
                      'relative w-[120px] rounded-full py-2 text-sm font-medium transition-colors duration-200',
                      billingPeriod === 'monthly'
                        ? 'text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    )}>
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingPeriod('yearly')}
                    className={cn(
                      'relative w-[120px] rounded-full py-2 text-sm font-medium transition-colors duration-200',
                      billingPeriod === 'yearly'
                        ? 'text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    )}>
                    Yearly
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className='mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
            {plans.map((plan) => (
              <PricingCard
                key={plan.title}
                {...plan}
                billingPeriod={billingPeriod}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

type PricingCardProps = {
  title: string;
  description: string;
  price?: {
    monthly: string;
    yearly: string;
  };
  features: string[];
  highlighted?: boolean;
  billingPeriod: 'monthly' | 'yearly';
};

const PricingCard = ({
  title,
  description,
  price,
  features,
  highlighted = false,
  billingPeriod,
}: PricingCardProps) => {
  const displayPrice = price
    ? billingPeriod === 'monthly'
      ? price.monthly
      : price.yearly
    : 'Contact Us';

  return (
    <div
      className={cn(
        'relative flex flex-col justify-between rounded-2xl border bg-gradient-to-b from-white to-gray-50/50 p-8 shadow-sm transition-all duration-200',
        highlighted
          ? 'scale-105 border-purple-200 bg-purple-50 ring-1 ring-purple-200 hover:scale-[1.06] hover:shadow-md'
          : 'border-gray-200 hover:scale-[1.01] hover:shadow-md'
      )}>
      {highlighted && (
        <div className='absolute -top-3 right-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1 text-sm font-medium text-white shadow-sm'>
          Most Popular
        </div>
      )}
      <div>
        <h3 className='text-2xl font-bold text-gray-900'>{title}</h3>
        <p className='mt-2 min-h-[48px] text-sm text-gray-600'>{description}</p>
        <p className='mt-4'>
          <span className='text-4xl font-bold'>{displayPrice}</span>
          {price && (
            <span className='font-semibold text-gray-600'>
              /{billingPeriod === 'monthly' ? 'mo' : 'yr'}
            </span>
          )}
        </p>
        <ul className='mt-8 space-y-4 text-sm text-gray-600'>
          {features.map((feature, index) => (
            <li key={index} className='flex items-center'>
              <svg
                className='mr-3 size-5 text-purple-500'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M5 13l4 4L19 7'
                />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <Button
        className='mt-8 w-full'
        variant={highlighted ? 'primary-gradient' : 'secondary'}
        size='lg'
        disabled>
        {!price ? 'Contact Sales' : 'Get Started'}
      </Button>
    </div>
  );
};
