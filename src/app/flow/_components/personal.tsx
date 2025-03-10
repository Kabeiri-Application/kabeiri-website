import { User } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';

import { FormData } from '@/app/flow/_components/schema';

export function PersonalForm({ form }: { form: UseFormReturn<FormData> }) {
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

export function PersonalInfo() {
  return (
    <>
      <h2 className='mb-6 text-3xl font-semibold tracking-tight'>
        Setup your profile
      </h2>

      <div className='mb-8 max-w-md text-lg text-gray-600'>
        <div className='flex flex-col gap-4'>
          <p>Setup your profile to help your team get to know you.</p>
        </div>
      </div>
    </>
  );
}
