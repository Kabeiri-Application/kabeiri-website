'use client';

import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { createColumnHelper } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { createJob, getVehicles } from '@/app/dashboard/jobs/actions';
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
  assignedTo: string;
  dueDate?: Date;
};

const data: Job[] = [
  {
    id: 1,
    customer: 'John Doe',
    vehicle: 'Toyota Camry',
    service: 'Oil Change',
    status: 'In Progress',
    assignedTo: 'Bob Hammer',
    dueDate: new Date(),
  },
  {
    id: 2,
    customer: 'Jane Smith',
    vehicle: 'Ford F-150',
    service: 'Brake Replacement',
    status: 'Pending',
    assignedTo: 'Ben Nail',
    dueDate: new Date('05/04/25'),
  },
  {
    id: 3,
    customer: 'Bob Johnson',
    vehicle: 'Honda Civic',
    service: 'Tire Rotation',
    status: 'Completed',
    assignedTo: 'John Wrench',
    dueDate: new Date('04/30/25'),
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
  columnHelper.accessor('assignedTo', {
    header: 'Assigned To',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('dueDate', {
    header: 'Due Date',
    cell: (info) => info.getValue()?.toLocaleDateString(),
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
  dueDate: z.date(),
  assignedTo: z.string().min(1, 'Assigned to is required'),
});

type FormInputs = z.infer<typeof formSchema>;

export default function JobsPage() {
  const [selectedCustomer, setSelectedCustomer] = useState('');
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
  useEffect(() => {
    getVehicles(selectedCustomer);
  }, [selectedCustomer]);

  const customers = ['', 'John Doe', 'Jane Smith', 'Bob Johnson'];
  const [vehicles, setVehicles] = useState([
    '',
    'Toyota Camry',
    'Ford F-150',
    'Honda Civic',
  ]);
  const mechanics = ['', 'Bob Hammer', 'Ben Nail', 'John Wrench'];

  return (
    <main className='p-8'>
      <Dialog>
        <div className='mx-auto max-w-7xl'>
          <div className='mb-8 flex items-center justify-between'>
            <h1 className='text-3xl font-bold'>Job List</h1>
            <DialogTrigger>
              <Plus className='mr-2 size-5' />
              New Job
            </DialogTrigger>
          </div>
          <Table columns={columns} data={data} />
        </div>
        <DialogContent className='max-h-full overflow-y-scroll'>
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
                rows={4}
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
                {...register('customer', {
                  onChange: (e) => setSelectedCustomer(e.target.value),
                })}
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
                disabled={vehicles.length === 0}
                {...register('vehicle')}
                className='mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-700 disabled:opacity-50'>
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
                <option value=''>Select a service</option>
                <option value='Oil Change'>Oil Change</option>
                <option value='Brake Replacement'>Brake Replacement</option>
                <option value='Tire Rotation'>Tire Rotation</option>
              </select>
              {errors.service && (
                <span className='text-sm text-red-500'>
                  {errors.service.message}
                </span>
              )}
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Due Date
              </label>
              <input
                min={new Date().toISOString().split('T')[0]}
                {...register('dueDate')}
                type='date'
                className='mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-700'
              />
              {errors.dueDate && (
                <span className='text-sm text-red-500'>
                  {errors.dueDate.message}
                </span>
              )}
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Assigned To
              </label>
              <select
                {...register('assignedTo')}
                className='mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-700'>
                {mechanics.map((mechanic) => (
                  <option key={mechanic} value={mechanic}>
                    {mechanic}
                  </option>
                ))}
              </select>
              {errors.assignedTo && (
                <span className='text-sm text-red-500'>
                  {errors.assignedTo.message}
                </span>
              )}
            </div>
            <Button type='submit' className='my-3 w-full'>
              Create
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}
