'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { createColumnHelper } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { createJob } from '@/app/dashboard/jobs/actions';
import { Button } from '@/components/Button';
import { Table } from '@/components/Table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type Job = {
  id: number;
  customer: string;
  vehicle: string;
  service: string;
  status: 'In Progress' | 'Pending' | 'Completed';
};

const data: Job[] = [
  {
    id: 1,
    customer: 'John Doe',
    vehicle: 'Toyota Camry',
    service: 'Oil Change',
    status: 'In Progress',
  },
  {
    id: 2,
    customer: 'Jane Smith',
    vehicle: 'Ford F-150',
    service: 'Brake Replacement',
    status: 'Pending',
  },
  {
    id: 3,
    customer: 'Bob Johnson',
    vehicle: 'Honda Civic',
    service: 'Tire Rotation',
    status: 'Completed',
  },
];

// const data = getJobs('1').then((data) => {
//   console.log(data);
// });

const columnHelper = createColumnHelper<Job>();

const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('customer', {
    header: 'Customer',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('vehicle', {
    header: 'Vehicle',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('service', {
    header: 'Service',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => (
      <span
        className={
          info.getValue() === 'Completed'
            ? 'text-green-600'
            : info.getValue() === 'In Progress'
              ? 'text-blue-600'
              : 'text-yellow-600'
        }>
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.display({
    id: 'actions',
    header: 'Actions',
    cell: () => (
      <Button variant='secondary' size='sm'>
        Update
      </Button>
    ),
  }),
];

const formSchema = z.object({
  title: z.string().min(1, 'Title must be at least 1 characters'),
  description: z.string().min(1, 'Last name must be at least 1 characters'),
  customer: z.string().min(1, 'Customer is required'),
  vehicle: z.string().min(1, 'Vehicle is required'),
  service: z.string().min(1, 'Service is required'),
});

type FormInputs = z.infer<typeof formSchema>;

export default function JobsPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    createJob(data);
  };

  const customers = ['', 'John Doe', 'Jane Smith', 'Bob Johnson'];
  const vehicles = ['', 'Toyota Camry', 'Ford F-150', 'Honda Civic'];
  return (
    <main className='p-8'>
      <Dialog>
        <div className='mx-auto max-w-7xl'>
          <div className='mb-8 flex items-center justify-between'>
            <h1 className='text-3xl font-bold'>Job List</h1>
            <DialogTrigger>
              <Button>
                <Plus className='mr-2 size-5' />
                New Job
              </Button>
            </DialogTrigger>
          </div>
          <Table columns={columns} data={data} />
        </div>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle className='text-3xl font-bold text-gray-900'>
              Create a Job
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Title
              </label>
              <input
                {...register('title')}
                placeholder='Title'
                className='mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-700'
              />
              {errors.title && (
                <span className='text-sm text-red-500'>
                  {errors.title.message}
                </span>
              )}
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Description
              </label>
              <textarea
                {...register('description')}
                placeholder='Description'
                className='mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-700'
              />
              {errors.description && (
                <span className='text-sm text-red-500'>
                  {errors.description.message}
                </span>
              )}
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Customer
              </label>
              <select
                {...register('customer')}
                className='mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-700'>
                {customers.map((customer) => (
                  <option key={customer} value={customer}>
                    {customer}
                  </option>
                ))}
              </select>
              {errors.customer && (
                <span className='text-sm text-red-500'>
                  {errors.customer.message}
                </span>
              )}
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Vehicle
              </label>
              <select
                {...register('vehicle')}
                className='mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-700'>
                {vehicles.map((vehicle) => (
                  <option key={vehicle} value={vehicle}>
                    {vehicle}
                  </option>
                ))}
              </select>
              {errors.vehicle && (
                <span className='text-sm text-red-500'>
                  {errors.vehicle.message}
                </span>
              )}
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Service
              </label>
              <select
                {...register('service')}
                className='mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-700'>
                <option></option>
                <option value='1'>Oil Change</option>
                <option value='2'>Brake Replacement</option>
                <option value='3'>Tire Rotation</option>
              </select>
              {errors.service && (
                <span className='text-sm text-red-500'>
                  {errors.service.message}
                </span>
              )}
            </div>
            <button type='submit' className='my-3 w-full'>
              Create
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}
