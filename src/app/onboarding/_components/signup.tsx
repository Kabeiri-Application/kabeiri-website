import { startTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { createAccount } from '@/app/onboarding/actions';
import { signupSchema, type SignupSchema } from '@/app/onboarding/schema';

export function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupSchema) => {
    startTransition(async () => {
      const response = await createAccount(data);

      if (response?.error) {
        setError('root.serverError', {
          message: response.error,
        });
        return;
      }

      // On success, create new URLSearchParams
      const params = new URLSearchParams(searchParams);
      params.set('step', 'personal'); // Set next step
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-semibold tracking-tight'>
        Create your account
      </h2>
      <p className='text-gray-600'>
        Enter your email and create a password to get started
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div>
          <label htmlFor='email' className='mb-2 block text-sm font-medium'>
            Email
          </label>
          <input
            {...register('email')}
            type='email'
            id='email'
            className='w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-black'
            placeholder='you@example.com'
          />
          {errors.email && (
            <p className='mt-1 text-sm text-red-500'>{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor='password' className='mb-2 block text-sm font-medium'>
            Password
          </label>
          <input
            {...register('password')}
            type='password'
            id='password'
            className='w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-black'
            placeholder='••••••••'
          />
          {errors.password && (
            <p className='mt-1 text-sm text-red-500'>
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor='confirmPassword'
            className='mb-2 block text-sm font-medium'>
            Confirm Password
          </label>
          <input
            {...register('confirmPassword')}
            type='password'
            id='confirmPassword'
            className='w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-black'
            placeholder='••••••••'
          />
          {errors.confirmPassword && (
            <p className='mt-1 text-sm text-red-500'>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {errors.root?.serverError && (
          <p className='mt-1 text-sm text-red-500'>
            {errors.root.serverError.message}
          </p>
        )}

        <button
          type='submit'
          disabled={isSubmitting}
          className='w-full rounded-lg bg-black px-4 py-2 text-white transition hover:bg-black/90 disabled:opacity-50'>
          {isSubmitting ? 'Creating account...' : 'Create account'}
        </button>
      </form>
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
