'use client';

import { useSearchParams } from 'next/navigation';

import { Car } from 'lucide-react';

import { AddressForm, AddressInfo } from '@/app/onboarding/_components/address';
import {
  PersonalForm,
  PersonalInfo,
} from '@/app/onboarding/_components/personal';
import { ReviewForm, ReviewInfo } from '@/app/onboarding/_components/review';
import { ShopForm, ShopInfo } from '@/app/onboarding/_components/shop';
import { cn } from '@/lib/utils';

const STEPS = {
  personal: {
    index: 0,
    name: 'Personal',
    infoComponent: <PersonalInfo />,
    formComponent: <PersonalForm />,
  },
  address: {
    index: 1,
    name: 'Address',
    infoComponent: <AddressInfo />,
    formComponent: <AddressForm />,
  },
  shop: {
    index: 2,
    name: 'Shop',
    infoComponent: <ShopInfo />,
    formComponent: <ShopForm />,
  },
  review: {
    index: 3,
    name: 'Review',
    infoComponent: <ReviewInfo />,
    formComponent: <ReviewForm />,
  },
} as const;

type StepKey = keyof typeof STEPS;

export default function OnboardingPage() {
  const searchParams = useSearchParams();
  const currentStep = (searchParams.get('step') as StepKey) || 'personal';

  const stepKeys = Object.keys(STEPS) as StepKey[];
  const currentStepIndex = STEPS[currentStep].index;

  return (
    <div className='flex min-h-screen'>
      {/* Left Column - Brand and Info */}
      <div className='fixed left-0 flex h-screen w-2/5 flex-col bg-gray-50 p-10'>
        {/* Brand and Content */}
        <div className='flex flex-1 flex-col'>
          <div className='mb-10'>
            <h1 className='text-4xl font-bold'>Kabeiri</h1>
            <p className='mt-2 text-xl text-gray-600'>
              Your journey starts here
            </p>
          </div>

          <div className='flex-1'>{STEPS[currentStep].infoComponent}</div>

          {/* Footer Section */}
          <div className='mt-auto'>
            <div className='mb-8'>
              <CarStepper
                currentStep={currentStepIndex}
                totalSteps={stepKeys.length}
                stepNames={stepKeys.map((key) => STEPS[key].name)}
              />
            </div>

            <p className='text-sm text-gray-600'>
              &copy; {new Date().getFullYear()} Kabeiri. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column - Forms */}
      <div className='ml-[40%] flex min-h-screen w-3/5 bg-white'>
        <div className='flex w-full items-start justify-center overflow-y-auto p-10'>
          <div className='w-full max-w-md'>
            {STEPS[currentStep].formComponent}
          </div>
        </div>
      </div>
    </div>
  );
}

function CarStepper({
  currentStep,
  totalSteps,
  stepNames,
}: {
  currentStep: number;
  totalSteps: number;
  stepNames: string[];
}) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i);
  const progress = (currentStep / (totalSteps - 1)) * 100;

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
                  {stepNames[step]}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
