'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { submitInitialData } from './actions';

const formSchema = z.object({
  firstName: z.string().min(1, 'First name must be at least 1 characters'),
  lastName: z.string().min(1, 'Last name must be at least 1 characters'),
  email: z.string().email('Invalid email address'),
  streetAddress: z.string().min(5, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'Please enter a 2-letter state code'),
  zipCode: z.string().regex(/^\d{5}$/, 'Invalid ZIP code'),
  certificates: z.instanceof(FileList).optional(),
  services: z.array(z.string()).optional(),
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

  const onSubmit: SubmitHandler<FormInputs> = (data) => submitInitialData(data);

  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    event.preventDefault();
    setItems([...items, inputValue]);
    setInputValue('');
  };

  const handleRemove = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <div className='mx-auto max-w-md px-4 pb-24 pt-40'>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div className='space-y-2'>
          <input
            {...register('firstName')}
            placeholder='First Name'
            className='w-full rounded-lg border p-3'
            autoComplete='given-name'
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
            className='w-full rounded-lg border p-3'
            autoComplete='family-name'
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
            className='w-full rounded-lg border p-3'
            autoComplete='email'
          />
          {errors.email && (
            <span className='text-sm text-red-500'>{errors.email.message}</span>
          )}
        </div>

        <div className='space-y-2'>
          <input
            {...register('streetAddress')}
            placeholder='Street Address'
            className='w-full rounded-lg border p-3'
            autoComplete='address-line1'
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
              className='w-full rounded-lg border p-3'
              autoComplete='address-level2'
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
              className='w-full rounded-lg border p-3'
              autoComplete='address-level1'
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
              className='w-full rounded-lg border p-3'
              autoComplete='postal-code'
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
              className='w-full cursor-pointer rounded-lg border p-3'
              accept='.pdf,.jpg,.jpeg,.png'
            />
          </label>
          {errors.certificates && (
            <span className='text-sm text-red-500'>
              {errors.certificates.message}
            </span>
          )}
        </div>
        <h1>Services</h1>
        <div className='flex flex-row items-center'>
          <input
            className='w-full rounded-lg border p-3'
            type='text'
            value={inputValue}
            onChange={handleInputChange}
            placeholder='Add a new service'
          />
          <button
            className='m-2 w-auto rounded-lg bg-black px-2 py-1 text-white transition-colors duration-300 hover:bg-green-700'
            onClick={handleKeyPress}>
            Add
          </button>
        </div>

        <ul {...register('services')}>
          {items.map((item, index) => (
            <div key={index} className='flex flex-row items-center'>
              <li>{item}</li>
              <button
                onClick={handleRemove}
                className='m-2 w-auto rounded-lg bg-black px-2 py-1 text-white transition-colors duration-300 hover:bg-green-700'>
                x
              </button>
            </div>
          ))}
        </ul>

        <button
          type='submit'
          className='w-full rounded-lg bg-black p-2 text-white transition-colors duration-300 hover:bg-green-700'>
          Submit
        </button>
      </form>
    </div>
  );
}
