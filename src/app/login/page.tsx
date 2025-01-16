import Link from 'next/link';

import { Button } from '@/components/Button';

export default function LoginPage() {
  return (
    <main className='flex min-h-screen items-center justify-center bg-white'>
      <div className='m-4 w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-lg'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-gray-900'>Welcome back</h1>
          <p className='mt-2 text-gray-600'>Sign in to your account</p>
        </div>

        <form className='mt-8 space-y-6' action='#' method='POST'>
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
                htmlFor='password'
                className='block text-sm font-medium text-gray-700'>
                Password
              </label>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                required
                className='mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500'
              />
            </div>
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <input
                id='remember-me'
                name='remember-me'
                type='checkbox'
                className='size-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500'
              />
              <label
                htmlFor='remember-me'
                className='ml-2 block text-sm text-gray-700'>
                Remember me
              </label>
            </div>

            <div className='text-sm'>
              <Link
                href='#forgot-password'
                className='font-medium text-purple-600 hover:text-purple-500'>
                Forgot your password?
              </Link>
            </div>
          </div>

          <div className='space-y-4'>
            <Button
              type='submit'
              variant='primary-gradient'
              className='w-full'
              disabled>
              Sign in
            </Button>

            <div className='text-center'>
              <span className='text-sm text-gray-600'>
                Don&apos;t have an account?{' '}
                <Link
                  href='/signup'
                  className='font-medium text-purple-600 hover:text-purple-500'>
                  Sign up
                </Link>
              </span>
            </div>
          </div>
        </form>

        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-300'></div>
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='bg-white px-2 text-gray-500'>
              Or continue with
            </span>
          </div>
        </div>

        <div className='flex flex-col gap-4 md:flex-row'>
          <Button variant='secondary' className='w-full' disabled>
            <span className='flex items-center justify-center'>
              <svg className='mr-2 size-5' viewBox='0 0 24 24'>
                <path d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z' />
              </svg>
              Google
            </span>
          </Button>
          <Button variant='secondary' className='w-full' disabled>
            <span className='flex items-center justify-center'>
              <svg className='mr-2 size-5' viewBox='0 0 24 24'>
                <path d='M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701' />
              </svg>
              Apple
            </span>
          </Button>
        </div>
      </div>
    </main>
  );
}
