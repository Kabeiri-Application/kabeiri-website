import { Button } from '@/components/Button';
import { cn } from '@/utils/cn';

export default function Pricing() {
  const plans: PricingCardProps[] = [
    {
      title: 'Basic',
      description: 'Perfect for individual car owners',
      price: 'TBD',
      features: [
        'Vehicle diagnostics',
        'Service history tracking',
        'Marketplace access',
      ],
    },
    {
      title: 'Pro',
      description: 'For professional mechanics',
      price: 'TBD',
      features: [
        'All Basic features',
        'Digital workflow tools',
        'Advanced AI diagnostics',
        'Customer management',
      ],
      highlighted: true,
    },
    {
      title: 'Business',
      description: 'For auto repair workshops',
      price: 'TBD',
      features: [
        'All Pro features',
        'Multi-user access',
        'Advanced analytics',
        'Priority support',
      ],
    },
    {
      title: 'Enterprise',
      description: 'For manufacturers & fleets',
      price: 'Contact Us',
      features: [
        'All Business features',
        'Custom integrations',
        'API access',
        'Dedicated support',
      ],
      showPerMonth: false,
    },
  ] as const;

  return (
    <main className='bg-white'>
      <section className='flex min-h-screen items-center justify-center py-24'>
        <div className='mx-auto max-w-7xl px-6'>
          <div className='mx-auto max-w-4xl text-center'>
            <h1 className='mb-4 text-4xl font-bold tracking-tight md:text-5xl'>
              Simple, transparent pricing for{' '}
              <span className='bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
                everyone
              </span>
            </h1>
            <p className='text-xl text-gray-600'>
              Choose the perfect plan for your automotive needs. All plans
              include core platform features.
            </p>
          </div>

          <div className='mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
            {plans.map((plan) => (
              <PricingCard key={plan.title} {...plan} />
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
  price: string;
  features: string[];
  highlighted?: boolean;
  showPerMonth?: boolean;
};

const PricingCard = ({
  title,
  description,
  price,
  features,
  highlighted = false,
  showPerMonth = true,
}: {
  title: string;
  description: string;
  price: string;
  features: string[];
  highlighted?: boolean;
  showPerMonth?: boolean;
}) => {
  return (
    <div
      className={cn(
        'relative flex flex-col justify-between rounded-2xl border p-8',
        highlighted
          ? 'scale-110 border-purple-200 bg-purple-50'
          : 'border-gray-200'
      )}>
      {highlighted && (
        <div className='absolute -top-3 right-8 rounded-full bg-purple-600 px-3 py-1 text-sm font-medium text-white'>
          Most Popular
        </div>
      )}
      <div>
        <h3 className='text-xl font-semibold text-gray-900'>{title}</h3>
        <p className='mt-2 text-sm text-gray-600'>{description}</p>
        <p className='mt-4'>
          <span className='text-4xl font-bold'>{price}</span>
          {showPerMonth && <span className='text-gray-600'>/month</span>}
        </p>
        <ul className='mt-8 space-y-4 text-sm text-gray-600'>
          {features.map((feature, index) => (
            <li key={index} className='flex items-center'>
              <svg
                className='mr-3 size-5 text-green-500'
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
      <Button className='mt-8' size='md' disabled>
        Get Started
      </Button>
    </div>
  );
};
