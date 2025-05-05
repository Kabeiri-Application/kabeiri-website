import { startTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { setPersonalInfo } from '@/app/onboarding/actions';
import {
  addressSchema,
  type AddressSchema,
  type PersonalSchema,
} from '@/app/onboarding/schema';
import { useOnboardingStore } from '@/app/onboarding/store';

export function AddressForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addressInfo, personalInfo, setAddressInfo } = useOnboardingStore();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<AddressSchema>({
    resolver: zodResolver(addressSchema),
    defaultValues: addressInfo,
  });

  const onSubmit = async (data: AddressSchema) => {
    startTransition(async () => {
      setAddressInfo(data);

      const response = await setPersonalInfo({
        ...(personalInfo as Required<PersonalSchema>),
        ...data,
      });

      if (response?.error) {
        setError('root.serverError', {
          message: response.error,
        });
        return;
      }

      // On success, navigate to next step
      const params = new URLSearchParams(searchParams);
      params.set('step', 'shop');
      router.push(`?${params.toString()}`);
    });
  };

  const handleBack = () => {
    const params = new URLSearchParams(searchParams);
    params.set('step', 'personal');
    router.push(`?${params.toString()}`);
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-4'>
        <button
          onClick={handleBack}
          className='rounded-lg p-2 text-gray-600 transition hover:bg-gray-100'>
          <ArrowLeft className='size-5' />
        </button>
        <h2 className='text-2xl font-semibold tracking-tight'>
          {`What's your address?`}
        </h2>
      </div>
      <p className='text-gray-600'>
        This information will be used to verify your identity.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div>
          <label htmlFor='address' className='mb-2 block text-sm font-medium'>
            Address
          </label>
          <input
            {...register('address')}
            type='text'
            id='address'
            className='w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-black'
          />
          {errors.address && (
            <p className='mt-1 text-sm text-red-500'>
              {errors.address.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor='city' className='mb-2 block text-sm font-medium'>
            City
          </label>
          <input
            {...register('city')}
            type='text'
            id='city'
            className='w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-black'
          />
          {errors.city && (
            <p className='mt-1 text-sm text-red-500'>{errors.city.message}</p>
          )}
        </div>

        <div>
          <label htmlFor='state' className='mb-2 block text-sm font-medium'>
            State
          </label>
          <input
            {...register('state')}
            type='text'
            id='state'
            className='w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-black'
          />
          {errors.state && (
            <p className='mt-1 text-sm text-red-500'>{errors.state.message}</p>
          )}
        </div>

        <div>
          <label htmlFor='zipCode' className='mb-2 block text-sm font-medium'>
            Zip Code
          </label>
          <input
            {...register('zipCode')}
            type='text'
            id='zipCode'
            className='w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-black'
          />
          {errors.zipCode && (
            <p className='mt-1 text-sm text-red-500'>
              {errors.zipCode.message}
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
          {isSubmitting ? 'Saving...' : 'Continue'}
        </button>
      </form>
    </div>
  );
}

export function AddressInfo() {
  return (
    <>
      <h2 className='mb-6 text-3xl font-semibold tracking-tight'>
        Where are you located?
      </h2>

      <div className='mb-8 max-w-md text-lg text-gray-600'>
        <div className='flex flex-col gap-4'>
          <p>
            We need your address to verify your identity and ensure a secure
            experience.
          </p>
        </div>
      </div>
    </>
  );
}
