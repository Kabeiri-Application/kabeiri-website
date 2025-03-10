import type { UseFormReturn } from 'react-hook-form';

import { FormData } from '@/app/flow/_components/schema';

export function ShopForm({ form }: { form: UseFormReturn<FormData> }) {
  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-semibold tracking-tight'>
        Create or join a shop
      </h2>
      <p className='text-gray-600'>Create or join a shop to get started</p>

      <div className='space-y-4'>
        <div>
          <label htmlFor='firstName' className='mb-2 block text-sm font-medium'>
            Shop name
          </label>
          <input
            {...form.register('shopName')}
            type='text'
            id='shopName'
            className='w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-black'
            placeholder='Shop name'
          />
        </div>

        <div>
          <label
            htmlFor='shopInviteCode'
            className='mb-2 block text-sm font-medium'>
            Shop invite code
          </label>
          <input
            {...form.register('shopInviteCode')}
            type='text'
            className='w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-black'
            placeholder='Shop invite code'
          />
        </div>
      </div>
    </div>
  );
}

export function ShopInfo() {
  return (
    <>
      <h2 className='mb-6 text-3xl font-semibold tracking-tight'>
        Create or join a shop
      </h2>

      <div className='mb-8 max-w-md text-lg text-gray-600'>
        <div className='flex flex-col gap-4'>
          <p>{`If you're a shop owner, register your shop here.`}</p>
          <p>
            {`If you're a team member, use your shop's invite code to join your shop.`}
          </p>
        </div>
      </div>
    </>
  );
}
