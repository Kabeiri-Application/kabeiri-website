'use client';

import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { createColumnHelper } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import { useForm, type SubmitHandler } from 'react-hook-form';
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
  title: string;
  description: string;
  customer: { id: string; firstName: string; lastName: string };
  vehicle: {
    year: string;
    make: string;
    model: string;
  };
  service: { id: string; title: string };
  status: 'In Progress' | 'Pending' | 'Completed';
  assigned_to: { id: string; firstName: string; lastName: string };
  due_date?: string | Date;
};

type Customer = { id: string; firstName: string; lastName: string };

type Employee = { id: string; firstName: string; lastName: string };

type Service = { id: string; title: string };

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
  // columnHelper.accessor('id', {
  //   header: 'ID',
  //   cell: (info) => info.getValue(),
  // }),
  columnHelper.accessor('title', {
    header: 'Job',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('due_date', {
    header: 'Due Date',
    cell: (info) =>
      info.getValue()
        ? new Date(info.getValue() as string).toLocaleDateString()
        : '',
  }),
  columnHelper.accessor('customer', {
    header: 'Customer',
    cell: (info) => `${info.getValue().firstName} ${info.getValue().lastName}`,
  }),
  columnHelper.accessor('vehicle', {
    header: 'Vehicle',
    cell: (info) =>
      info.getValue().year +
      ' ' +
      info.getValue().make +
      ' ' +
      info.getValue().model,
  }),
  columnHelper.accessor('service', {
    header: 'Service',
    cell: (info) => info.getValue().title,
  }),
  columnHelper.accessor('assigned_to', {
    header: 'Assigned To',
    cell: (info) =>
      `${info?.getValue()?.firstName} ${info?.getValue()?.lastName}`,
  }),

  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => (
      <span
        className={
          info.getValue() === 'Completed'
            ? 'text-green-700'
            : info.getValue() === 'In Progress'
              ? 'text-yellow-600'
              : 'text-red-600'
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
  due_date: z.string(),
  assigned_to: z.string().min(1, 'Assigned to is required'),
});

type FormInputs = z.infer<typeof formSchema>;

export default function JobsPage() {
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [organization, setOrganization] = useState('');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [modalStatus, setModalStatus] = useState(false);
  console.log(jobs);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ resolver: zodResolver(formSchema) });

  const fetchData = async () => {
    const organizationId = await getOrganizationId();
    setOrganization(organizationId);
    await getJobs(organizationId).then((data) => setJobs(data as Job[]));
    await getEmployees(organizationId).then((data) =>
      setEmployees(data as Employee[])
    );
    await getServices(organizationId).then((data) =>
      setServices(data as Service[])
    );
    await getCustomers(organizationId).then((data) =>
      setCustomers(data as Customer[])
    );
  };

  // GETTING DATA
  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    createJob({ ...data, organization });
    setModalStatus(false);
    fetchData();
  };

  // GETTING CUSTOMER VEHICLES
  useEffect(() => {
    const fetchCars = async () => {
      await getVehicles(selectedCustomer).then((data) =>
        setVehicles(data as Vehicle[])
      );
    };
    fetchCars();
  }, [selectedCustomer]);

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
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer?.firstName} {customer?.lastName}
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
                disabled={!selectedCustomer}
                {...register('vehicle')}
                className='mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-700 disabled:opacity-50'>
                <option value=''>Select a vehicle</option>
                {vehicles.length > 0 ? (
                  vehicles.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </option>
                  ))
                ) : (
                  <option value=''>No vehicles found</option>
                )}
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
                {...register('due_date')}
                type='date'
                className='mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-700'
              />
              {errors.due_date && (
                <span className='text-sm text-red-500'>
                  {errors.due_date.message}
                </span>
              )}
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Assigned To
              </label>
              <select
                {...register('assigned_to')}
                className='mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-700'>
                <option value=''>Select a mechanic</option>
                {employees.map((mechanic) => (
                  <option key={mechanic.id} value={mechanic.id}>
                    {mechanic.firstName} {mechanic.lastName}
                  </option>
                ))}
              </select>
              {errors.assigned_to && (
                <span className='text-sm text-red-500'>
                  {errors.assigned_to.message}
                </span>
              )}
            </div>
            <Button
              type='submit'
              className='my-3 flex w-full flex-row items-center justify-center rounded-full bg-black py-3 text-white transition hover:bg-gray-800'>
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}
