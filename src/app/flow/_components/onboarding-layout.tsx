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
              {currentStep === 2 && 'Setup your profile'}
              {currentStep === 3 && 'Create or join a shop'}
            </h2>

            <div className='mb-8 max-w-md text-lg text-gray-600'>
              {currentStep === 1 && (
                <div className='flex flex-col gap-4'>
                  <p>Get ready to supercharge your workflows with Kabeiri.</p>
                  <p>
                    {`If you're a shop owner, you can register your shop and setup your teams.`}
                  </p>
                  <p>
                    {`If you're a team member, and you're shop is already registered, you can join your shop using your shops invite code and start working on your tasks.`}
                  </p>
                </div>
              )}
              {currentStep === 2 && (
                <div className='flex flex-col gap-4'>
                  <p>Setup your profile to help your team get to know you.</p>
                </div>
              )}
              {currentStep === 3 && (
                <div className='flex flex-col gap-4'>
                  <p>{`If you're a shop owner, register your shop here.`}</p>
                  <p>
                    {`If you're a team member, use your shop's invite code to join your shop.`}
                  </p>
                </div>
              )}
            </div>
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
      {/* Progress Track */}
      <div className='relative mb-12'>
        {/* Base Track */}
        <div className='absolute left-0 top-1.5 h-1 w-full bg-gray-200' />

        {/* Progress Bar */}
        <div
          className='absolute left-0 top-1.5 h-1 bg-black transition-all duration-500 ease-in-out'
          style={{ width: `${progress}%` }}
        />

        {/* Car */}
        <div
          className='absolute -top-10 left-0 z-20 transition-all duration-500 ease-in-out'
          style={{
            left: `${progress}%`,
            transform:
              progress === 0
                ? 'translateX(-30%)'
                : progress === 100
                  ? 'translateX(-70%)'
                  : 'translateX(-50%)',
          }}>
          <Car className='size-10' />
        </div>

        {/* Steps */}
        <div className='relative flex justify-between'>
          {steps.map((step) => {
            const isActive = step <= currentStep;

            return (
              <div key={step} className='relative flex flex-col items-center'>
                {/* Step Marker */}
                <div
                  className={cn(
                    'relative z-10 size-4 rounded-full border-4 border-gray-200 bg-white transition-colors duration-700',
                    isActive && 'border-black bg-black'
                  )}
                />

                {/* Label */}
                <span
                  className={cn(
                    'absolute top-8 whitespace-nowrap text-sm font-medium transition-colors duration-700',
                    isActive ? 'text-black' : 'text-gray-400'
                  )}>
                  {step === 1 && 'Account'}
                  {step === 2 && 'Personal'}
                  {step === 3 && 'Shop'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
