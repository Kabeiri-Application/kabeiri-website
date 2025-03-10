'use client';

import { Upload, User } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

import { FormData } from '@/app/flow/_components/schema';

export function AccountStep({ form }: { form: UseFormReturn<FormData> }) {
  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-semibold tracking-tight'>
        Create your account
      </h2>
      <p className='text-gray-600'>
        Enter your email and create a password to get started
      </p>

      <div className='space-y-4'>
        <div>
          <label htmlFor='email' className='mb-2 block text-sm font-medium'>
            Email
          </label>
          <input
            {...form.register('email')}
            type='email'
            id='email'
            className='w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-black'
            placeholder='you@example.com'
          />
          {form.formState.errors.email && (
            <p className='mt-1 text-sm text-red-500'>
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor='password' className='mb-2 block text-sm font-medium'>
            Password
          </label>
          <input
            {...form.register('password')}
            type='password'
            id='password'
            className='w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-black'
            placeholder='••••••••'
          />
          {form.formState.errors.password && (
            <p className='mt-1 text-sm text-red-500'>
              {form.formState.errors.password.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function PersonalStep({ form }: { form: UseFormReturn<FormData> }) {
  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-semibold tracking-tight'>
        Tell us about yourself
      </h2>
      <p className='text-gray-600'>
        Your profile will be used to identify you.
      </p>

      <div className='space-y-4'>
        <div>
          <label htmlFor='avatar' className='mb-2 block text-sm font-medium'>
            Avatar
          </label>
          <div className='flex size-12 items-center justify-center rounded-full bg-gray-600'>
            <User className='size-10' />
            {/* <Upload className='size-4' /> */}
          </div>
          <input className='hidden' type='file' id='avatar' accept='image/*' />
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label
              htmlFor='firstName'
              className='mb-2 block text-sm font-medium'>
              First Name
            </label>
            <input
              {...form.register('firstName')}
              type='text'
              id='firstName'
              className='w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-black'
            />
          </div>
          <div>
            <label
              htmlFor='lastName'
              className='mb-2 block text-sm font-medium'>
              Last Name
            </label>
            <input
              {...form.register('lastName')}
              type='text'
              id='lastName'
              className='w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-black'
            />
          </div>
        </div>

        <div>
          <label
            htmlFor='dateOfBirth'
            className='mb-2 block text-sm font-medium'>
            Date of Birth
          </label>
          <input
            {...form.register('dateOfBirth')}
            type='date'
            id='dateOfBirth'
            className='w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-black'
          />
        </div>
      </div>
    </div>
  );
}

export function PreferencesStep({ form }: { form: UseFormReturn<FormData> }) {
  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-semibold tracking-tight'>
        Stay in the loop
      </h2>
      <p className='text-gray-600'>
        Choose how you&apos;d like to hear from us
      </p>

      <div className='space-y-4'>
        <label className='flex items-center space-x-3'>
          <input
            {...form.register('marketingEmails')}
            type='checkbox'
            className='size-5 rounded border-gray-300 focus:ring-2 focus:ring-black'
          />
          <span className='text-sm'>Receive marketing emails</span>
        </label>

        <label className='flex items-center space-x-3'>
          <input
            {...form.register('productUpdates')}
            type='checkbox'
            className='size-5 rounded border-gray-300 focus:ring-2 focus:ring-black'
          />
          <span className='text-sm'>Get product updates</span>
        </label>

        <label className='flex items-center space-x-3'>
          <input
            {...form.register('newsletterSubscription')}
            type='checkbox'
            className='size-5 rounded border-gray-300 focus:ring-2 focus:ring-black'
          />
          <span className='text-sm'>Subscribe to newsletter</span>
        </label>
      </div>
    </div>
  );
}
