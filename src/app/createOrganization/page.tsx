import { Button } from '@/components/Button';

import { createOrganization } from './actions';

export default function SignupPage() {
  return (
    <main className='flex min-h-screen items-center justify-center bg-white'>
      <div className='m-4 w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-lg'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-gray-900'>
            Create an Organization
          </h1>
          <p className='mt-2 text-gray-600'>Sign up to get started</p>
        </div>

        <form className='mt-8 space-y-6' action={createOrganization}>
          <div className='space-y-4'>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'>
                Email address
              </label>
              <input
                id='email'
                name='email'
                type='email'
                autoComplete='username email'
                required
                className='mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500'
              />
            </div>

            <div>
              <label
                htmlFor='new-password'
                className='block text-sm font-medium text-gray-700'>
                Password
              </label>
              <input
                id='new-password'
                name='password'
                type='password'
                autoComplete='new-password'
                required
                className='mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500'
              />
            </div>

            <div>
              <label
                htmlFor='confirm-password'
                className='block text-sm font-medium text-gray-700'>
                Confirm password
              </label>
              <input
                id='confirm-password'
                name='confirm-password'
                type='password'
                autoComplete='new-password'
                required
                className='mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500'
              />
            </div>
          </div>

          <div className='space-y-4'>
            <Button type='submit' variant='primary-gradient' className='w-full'>
              Get Started
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
