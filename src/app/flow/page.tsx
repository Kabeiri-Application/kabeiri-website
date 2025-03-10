'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Car, ChevronLeft, ChevronRight } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { PersonalForm, PersonalInfo } from '@/app/flow/_components/personal';
import { FormData, formSchema } from '@/app/flow/_components/schema';
import { ShopForm, ShopInfo } from '@/app/flow/_components/shop';
import { SignupForm, SignupInfo } from '@/app/flow/_components/signup';
import { cn } from '@/utils/cn';

type StepFields = keyof FormData;

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      shopName: '',
      shopInviteCode: '',
    },
  });

  const handleNext = async () => {
    // Only validate fields in the current step
    const fieldsToValidate: Record<number, StepFields[]> = {
      1: ['email', 'password'],
      2: ['firstName', 'lastName', 'dateOfBirth'],
      3: ['shopName', 'shopInviteCode'],
    };

    const isValid = await form.trigger(fieldsToValidate[currentStep]);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: FormData) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <>
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
              {currentStep === 1 && <SignupInfo />}
              {currentStep === 2 && <PersonalInfo />}
              {currentStep === 3 && <ShopInfo />}
            </div>

            {/* Footer Section */}
            <div className='mt-auto'>
              <div className='mb-8'>
                <CarStepper
                  currentStep={currentStep}
                  totalSteps={3}
                  stepNames={['Account', 'Personal', 'Shop']}
                />
              </div>

              <p className='text-sm text-gray-600'>
                &copy; {new Date().getFullYear()} Kabeiri. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Forms */}
        <div className='flex w-3/5 items-center justify-center bg-white p-10'>
          <div className='w-full max-w-md'>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              {currentStep === 1 && <SignupForm form={form} />}
              {currentStep === 2 && <PersonalForm form={form} />}
              {currentStep === 3 && <ShopForm form={form} />}

              <div className='flex justify-between pt-6'>
                <button
                  type='button'
                  onClick={handleBack}
                  className={cn(
                    'flex items-center space-x-2 rounded-lg px-4 py-2 transition',
                    currentStep === 1 ? 'invisible' : 'hover:bg-gray-100'
                  )}>
                  <ChevronLeft className='size-4' />
                  <span>Back</span>
                </button>

                <button
                  type={currentStep === 3 ? 'submit' : 'button'}
                  onClick={currentStep === 3 ? undefined : handleNext}
                  className='flex items-center space-x-2 rounded-lg bg-black px-6 py-2 text-white transition hover:bg-black/90'>
                  <span>{currentStep === 3 ? 'Complete' : 'Continue'}</span>
                  {currentStep !== 3 && <ChevronRight className='size-4' />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
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
                  {stepNames[step - 1]}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
