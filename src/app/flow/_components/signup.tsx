import type { UseFormReturn } from 'react-hook-form';

import { FormData } from '@/app/flow/_components/schema';

export function SignupForm({ form }: { form: UseFormReturn<FormData> }) {
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

export function SignupInfo() {
  return (
    <>
      <h2 className='mb-6 text-3xl font-semibold tracking-tight'>
        Create your account
      </h2>

      <div className='mb-8 max-w-md text-lg text-gray-600'>
        <div className='flex flex-col gap-4'>
          <p>Get ready to supercharge your workflows with Kabeiri.</p>
          <p>
            {`If you're a shop owner, you can register your shop and setup your teams.`}
          </p>
          <p>
            {`If you're a team member, and you're shop is already registered, you can join your shop using your shops invite code and start working on your tasks.`}
          </p>
        </div>
      </div>
    </>
  );
}
