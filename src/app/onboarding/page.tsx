'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  firstName: z.string().min(1, 'First name must be at least 1 characters'),
  lastName: z.string().min(1, 'Last name must be at least 1 characters'),
  email: z.string().email('Invalid email address'),
  streetAddress: z.string().min(5, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2).length(2, 'Please enter 2-letter state code'),
  zipCode: z.string().regex(/^\d{5}$/, 'Invalid ZIP code'),
  certificates: z.instanceof(FileList).optional(),
});

type FormInputs = z.infer<typeof formSchema>;

export default function OnboardingPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => console.log(data);

  return (
    <div className='mx-auto max-w-md px-4 pb-24 pt-40'>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div className='space-y-2'>
          <input
            {...register('firstName')}
            placeholder='First Name'
            className='w-full rounded border p-2'
          />
          {errors.firstName && (
            <span className='text-sm text-red-500'>
              {errors.firstName.message}
            </span>
          )}
        </div>

        <div className='space-y-2'>
          <input
            {...register('lastName')}
            placeholder='Last Name'
            className='w-full rounded border p-2'
          />
          {errors.lastName && (
            <span className='text-sm text-red-500'>
              {errors.lastName.message}
            </span>
          )}
        </div>

        <div className='space-y-2'>
          <input
            {...register('email')}
            placeholder='Email'
            type='email'
            className='w-full rounded border p-2'
          />
          {errors.email && (
            <span className='text-sm text-red-500'>{errors.email.message}</span>
          )}
        </div>

        <div className='space-y-2'>
          <input
            {...register('streetAddress')}
            placeholder='Street Address'
            className='w-full rounded border p-2'
          />
          {errors.streetAddress && (
            <span className='text-sm text-red-500'>
              {errors.streetAddress.message}
            </span>
          )}
        </div>

        <div className='grid grid-cols-3 gap-2'>
          <div className='space-y-2'>
            <input
              {...register('city')}
              placeholder='City'
              className='w-full rounded border p-2'
            />
            {errors.city && (
              <span className='text-sm text-red-500'>
                {errors.city.message}
              </span>
            )}
          </div>

          <div className='space-y-2'>
            <input
              {...register('state')}
              placeholder='State'
              className='w-full rounded border p-2'
            />
            {errors.state && (
              <span className='text-sm text-red-500'>
                {errors.state.message}
              </span>
            )}
          </div>

          <div className='space-y-2'>
            <input
              {...register('zipCode')}
              placeholder='ZIP Code'
              className='w-full rounded border p-2'
            />
            {errors.zipCode && (
              <span className='text-sm text-red-500'>
                {errors.zipCode.message}
              </span>
            )}
          </div>
        </div>

        <div className='space-y-2'>
          <label className='block text-sm font-medium text-gray-700'>
            Upload Mechanic Certificates
            <input
              type='file'
              multiple
              {...register('certificates')}
              className='mt-1 w-full rounded border p-2'
              accept='.pdf,.jpg,.jpeg,.png'
            />
          </label>
          {errors.certificates && (
            <span className='text-sm text-red-500'>
              {errors.certificates.message}
            </span>
          )}
        </div>

        <button
          type='submit'
          className='w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-600'>
          Submit
        </button>
      </form>
    </div>
  );
}
