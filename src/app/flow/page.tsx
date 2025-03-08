'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { cn } from '@/utils/cn';

import { OnboardingLayout } from './_components/onboarding-layout';
import { FormData, formSchema } from './_components/schema';
import {
  AccountStep,
  PersonalStep,
  PreferencesStep,
} from './_components/steps';

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
      address: '',
      marketingEmails: false,
      productUpdates: false,
      newsletterSubscription: false,
    },
  });

  const handleNext = async () => {
    // Only validate fields in the current step
    const fieldsToValidate: Record<number, StepFields[]> = {
      1: ['email', 'password'],
      2: ['firstName', 'lastName', 'dateOfBirth', 'address'],
      3: ['marketingEmails', 'productUpdates', 'newsletterSubscription'],
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
    <OnboardingLayout currentStep={currentStep} totalSteps={3}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        {currentStep === 1 && <AccountStep form={form} />}
        {currentStep === 2 && <PersonalStep form={form} />}
        {currentStep === 3 && <PreferencesStep form={form} />}

        <div className='flex justify-between pt-6'>
          <button
            type='button'
            onClick={handleBack}
            className={cn(
              'flex items-center space-x-2 rounded-lg px-4 py-2 transition',
              currentStep === 1 ? 'invisible' : 'hover:bg-gray-100'
            )}>
            <ChevronLeft className='h-4 w-4' />
            <span>Back</span>
          </button>

          <button
            type={currentStep === 3 ? 'submit' : 'button'}
            onClick={currentStep === 3 ? undefined : handleNext}
            className='flex items-center space-x-2 rounded-lg bg-black px-6 py-2 text-white transition hover:bg-black/90'>
            <span>{currentStep === 3 ? 'Complete' : 'Continue'}</span>
            {currentStep !== 3 && <ChevronRight className='h-4 w-4' />}
          </button>
        </div>
      </form>
    </OnboardingLayout>
  );
}
