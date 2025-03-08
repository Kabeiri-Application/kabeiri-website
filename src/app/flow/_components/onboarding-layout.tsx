'use client';

import { Car } from 'lucide-react';

import { cn } from '@/utils/cn';

interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
}

export function OnboardingLayout({
  children,
  currentStep,
  totalSteps,
}: OnboardingLayoutProps) {
  return (
    <div className='flex min-h-screen'>
      {/* Left Column - Brand and Info */}
      <div className='relative flex w-2/5 flex-col bg-gray-50 p-10'>
        {/* Brand and Content */}
        <div className='flex flex-1 flex-col'>
          <div className='mb-10'>
            <h1 className='text-4xl font-bold'>Kabeiri</h1>
            <p className='mt-2 text-xl text-gray-600'>
              Your journey starts here
            </p>
          </div>

          <div className='flex-1'>
            <h2 className='mb-6 text-3xl font-semibold tracking-tight'>
              {currentStep === 1 && 'Create your account'}
              {currentStep === 2 && 'Tell us about yourself'}
              {currentStep === 3 && 'Stay in the loop'}
            </h2>

            <p className='mb-8 max-w-md text-lg text-gray-600'>
              {currentStep === 1 &&
                'Join our community of drivers and enthusiasts. Set up your account to get started on your journey.'}
              {currentStep === 2 &&
                'Help us personalize your experience by sharing a bit about yourself.'}
              {currentStep === 3 &&
                'Choose how you&apos;d like to hear from us and stay updated with the latest news and features.'}
            </p>
          </div>

          {/* Footer Section */}
          <div className='mt-auto'>
            <div className='mb-8'>
              <CarStepper currentStep={currentStep} totalSteps={totalSteps} />
            </div>

            <p className='text-sm text-gray-600'>
              &copy; {new Date().getFullYear()} Kabeiri. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column - Forms */}
      <div className='flex w-3/5 items-center justify-center bg-white p-10'>
        <div className='w-full max-w-md'>{children}</div>
      </div>
    </div>
  );
}

function CarStepper({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className='relative'>
      {/* Road */}
      <div className='relative h-2 rounded-full bg-gray-200'>
        {/* Completed road */}
        <div
          className='absolute left-0 h-full rounded-full bg-black transition-all duration-500 ease-in-out'
          style={{ width: `${progress}%` }}
        />

        {/* Step markers */}
        {steps.map((step) => (
          <div
            key={step}
            className={cn(
              'absolute top-1/2 size-4 -translate-y-1/2 rounded-full transition-all duration-300',
              step <= currentStep ? 'bg-black' : 'bg-gray-300'
            )}
            style={{ left: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
          />
        ))}

        {/* Car */}
        <div
          className='absolute top-0 -translate-y-full transition-all duration-500 ease-in-out'
          style={{
            left: `${progress}%`,
            transform: `translateX(-50%) translateY(-100%)`,
          }}>
          <Car className='size-10' />
        </div>
      </div>

      {/* Step labels */}
      <div className='mt-6 flex justify-between'>
        {steps.map((step) => (
          <div
            key={step}
            className={cn(
              'text-sm font-medium transition-colors',
              step <= currentStep ? 'text-black' : 'text-gray-400'
            )}>
            {step === 1 && 'Account'}
            {step === 2 && 'Personal'}
            {step === 3 && 'Preferences'}
          </div>
        ))}
      </div>
    </div>
  );
}
