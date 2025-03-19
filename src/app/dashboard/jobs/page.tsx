'use client';

import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { createColumnHelper } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import { set, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  createJob,
  getCustomers,
  getEmployees,
  getJobs,
  getOrganizationId,
  getServices,
  getVehicles,
} from '@/app/dashboard/jobs/actions';
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
  dueDate?: string | Date;
};

type Customer = {
  id: string;
  full_name: string;
};

type Employee = {
  id: string;
  full_name: string;
};

type Service = {
  id: string;
  title: string;
};

type Vehicle = {
  id: string;
  make: string;
  model: string;
  year: string;
  vin: string;
  licensePlate: string;
  color: string;
};

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
    cell: (info) =>
      info.getValue()
        ? new Date(info.getValue() as string).toLocaleDateString()
        : '',
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
  dueDate: z.string(),
  assignedTo: z.string().min(1, 'Assigned to is required'),
});

type FormInputs = z.infer<typeof formSchema>;

export default function JobsPage() {
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
  });

  //TODO REPLACE!!!
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const organizationId = await getOrganizationId();
  //     console.log(organizationId);
  //     getJobs(organizationId);
  //     getServices(organizationId);
  //     getCustomers(organizationId);
  //   };

  //   fetchData();
  // }, []);

  // GETTING JOBS
  useEffect(() => {
    const fetchData = async () => {
      const organizationId = await getOrganizationId();
      await getJobs(organizationId).then((data) => setJobs(data as Job[]));
      await getEmployees(organizationId).then((data) => setEmployees(data));
      await getServices(organizationId).then((data) => setServices(data));
      await getCustomers(organizationId).then((data) => setCustomers(data));
    };
    fetchData();
  }, []);

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    createJob(data);
    setModalStatus(false);
  };

  useEffect(() => {
    const fetchCars = async () => {
      await getVehicles(selectedCustomer).then((data) => setVehicles(data));
    };
    fetchCars();
  }, [selectedCustomer]);

  const [modalStatus, setModalStatus] = useState(false);
  return (
    <main className='p-8'>
      <Dialog open={modalStatus} onOpenChange={setModalStatus}>
        <div className='mx-auto max-w-7xl'>
          <div className='mb-8 flex items-center justify-between'>
            <h1 className='text-3xl font-bold'>Job List</h1>
            <DialogTrigger className='flex flex-row items-center rounded-full bg-black px-4 py-2 text-white transition hover:bg-gray-800'>
              <Plus className='mr-2 size-5' />
              New Job
            </DialogTrigger>
          </div>
          <Table columns={columns} data={jobs} />
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
                <option value=''>Select a Customer</option>
                {customers.map(
                  (customer) => (
                    console.log('Customer: ', customer),
                    (
                      <option key={customer.id} value={customer.id}>
                        {customer?.full_name}
                      </option>
                    )
                  )
                )}
              </select>
              {errors.customer && (
                <span className='text-sm text-red-500'>
                  {errors.customer.message}
                </span>
              )}
            </div>
            <div>
              {vehicles.length > 0 ? (
                <>
                  <label className='block text-sm font-medium text-gray-700'>
                    Vehicle
                  </label>
                  <select
                    {...register('vehicle')}
                    className='mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-700 disabled:opacity-50'>
                    <option value=''>Select a vehicle</option>
                    {vehicles.map((vehicle) => (
                      <option key={vehicle.id} value={vehicle.id}>
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </option>
                    ))}
                  </select>
                  {errors.vehicle && (
                    <span className='text-sm text-red-500'>
                      {errors.vehicle.message}
                    </span>
                  )}
                </>
              ) : null}
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Service
              </label>
              <select
                {...register('service')}
                className='mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-700'>
                <option value=''>Select a service</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.title}
                  </option>
                ))}
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
                <option value=''>Select a mechanic</option>
                {employees.map((mechanic) => (
                  <option key={mechanic.id} value={mechanic.id}>
                    {mechanic.full_name}
                  </option>
                ))}
              </select>
              {errors.assignedTo && (
                <span className='text-sm text-red-500'>
                  {errors.assignedTo.message}
                </span>
              )}
            </div>
            <Button
              type='submit'
              className='my-3 flex w-full flex-row items-center justify-center rounded-full bg-black py-3 text-white transition hover:bg-gray-800'>
              Create
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}
