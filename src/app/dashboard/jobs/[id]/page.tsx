'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Pencil } from 'lucide-react';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { Button } from '@/components/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Car, Service } from '@/db/app.schema';
import { cn } from '@/lib/utils';

import {
  editJob,
  getCustomers,
  getEmployees,
  getJob,
  getOrganizationId,
  getServices,
  getVehicles,
} from '../actions';
import { Customer, Employee, Job, jobFormSchema, JobStatus } from '../schema';

export default function Page() {
  const [job, setJob] = useState<Job | null>(null);
  const params = useParams();
  const router = useRouter();
  const [modalStatus, setModalStatus] = useState(false);
  const [organization, setOrganization] = useState('');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [vehicles, setVehicles] = useState<Car[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');

  const jobID = params.id;

  const fetchData = async () => {
    const organizationId = await getOrganizationId();
    if (typeof organizationId === 'string') {
      setOrganization(organizationId);
    } else {
      console.error('Invalid organizationId:', organizationId);
    }
    if (typeof organizationId === 'string') {
      await getEmployees(organizationId).then((data) =>
        setEmployees(data as Employee[])
      );
    } else {
      console.error('Invalid organizationId:', organizationId);
    }
    if (typeof organizationId === 'string') {
      await getServices(organizationId).then((data) =>
        setServices(data as Service[])
      );
    } else {
      console.error('Invalid organizationId:', organizationId);
    }
    if (typeof organizationId === 'string') {
      await getCustomers(organizationId).then((data) =>
        setCustomers(data as Customer[])
      );
    } else {
      console.error('Invalid organizationId:', organizationId);
    }
    try {
      const data = await getJob(jobID as string);
      setJob(data as unknown as Job);
      if (data && 'customer' in data && data.customer) {
        setSelectedCustomer(data.customer.id);
      } else {
        console.error('Invalid job data:', data);
      }
    } catch (error) {
      console.error('Error fetching job data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<jobFormSchema>({ resolver: zodResolver(jobFormSchema) });

  const onSubmit: SubmitHandler<jobFormSchema> = (data) => {
    editJob(
      {
        ...data,
        due_date: new Date(data.due_date),
        organization,
        status: data.status || JobStatus.PENDING, // Provide a default value if status is undefined
      },
      jobID as string
    );
    setModalStatus(false);
    fetchData();
  };

  useEffect(() => {
    const fetchCars = async () => {
      await getVehicles(selectedCustomer).then((data) =>
        setVehicles(data as Car[])
      );
    };
    fetchCars();
  }, [selectedCustomer]);
  console.log(job);
  return (
    <main className='p-8'>
      <div className='mx-auto mb-8 flex max-w-5xl items-center justify-between'>
        <button
          onClick={() => router.back()}
          className='flex items-center text-gray-600 hover:text-gray-900'>
          <ArrowLeft className='size-4' />
          Back to Jobs
        </button>
        <button
          onClick={() => setModalStatus(true)}
          className='flex items-center text-gray-600 hover:text-gray-900'>
          <Pencil className='size-4' />
          Edit
        </button>
      </div>

      {!job ? (
        <div>Loading...</div>
      ) : (
        <div className='mx-auto max-w-5xl space-y-8'>
          <div className='flex items-center justify-between'>
            <h1 className='text-3xl font-bold'>{job.title}</h1>
            <span
              className={cn(
                `rounded-full px-4 py-2 font-medium capitalize`,
                job.status === 'complete'
                  ? 'bg-green-100 text-green-700'
                  : job.status === 'in progress'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
              )}>
              {job.status}
            </span>
          </div>

          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            {/* Customer Information */}
            <div className='rounded-lg border border-gray-200 p-6'>
              <h2 className='mb-4 text-xl font-semibold'>Customer Details</h2>
              <div className='space-y-2'>
                <p>
                  <span className='font-medium'>Name: </span>
                  {job?.customer?.firstName} {job.customer.lastName}
                </p>
              </div>
            </div>

            {/* Vehicle Information */}
            <div className='rounded-lg border border-gray-200 p-6'>
              <h2 className='mb-4 text-xl font-semibold'>Vehicle Details</h2>
              <div className='space-y-2'>
                <p>
                  <span className='font-medium'>Vehicle: </span>
                  {job.vehicle.year} {job.vehicle.make} {job.vehicle.model}
                </p>
              </div>
            </div>

            {/* Service Information */}
            <div className='rounded-lg border border-gray-200 p-6'>
              <h2 className='mb-4 text-xl font-semibold'>Service Details</h2>
              <div className='space-y-2'>
                <p>
                  <span className='font-medium'>Service Type: </span>
                  {job.service.title}
                </p>
                <p>
                  <span className='font-medium'>Description: </span>
                  {job.description}
                </p>
                <p>
                  <span className='font-medium'>Due Date: </span>
                  {job.due_date
                    ? new Date(job.due_date).toLocaleDateString()
                    : 'Not specified'}
                </p>
              </div>
            </div>

            {/* Assignment Information */}
            <div className='rounded-lg border border-gray-200 p-6'>
              <h2 className='mb-4 text-xl font-semibold'>Assignment Details</h2>
              <div className='space-y-2'>
                <p>
                  <span className='font-medium'>Assigned To: </span>
                  {job?.assigned_to?.firstName} {job?.assigned_to?.lastName}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <Dialog open={modalStatus} onOpenChange={setModalStatus}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Job</DialogTitle>
            <DialogDescription>
              Here you can edit the job details.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Title
              </label>
              <input
                defaultValue={job?.title}
                {...register('title')}
                placeholder='Title'
                className='mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-xs focus:border-green-700 focus:outline-hidden focus:ring-2 focus:ring-green-700'
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
                defaultValue={job?.description}
                rows={4}
                {...register('description')}
                placeholder='Description'
                className='mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-xs focus:border-green-700 focus:outline-hidden focus:ring-2 focus:ring-green-700'
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
                defaultValue={job?.customer.id}
                {...register('customer', {
                  onChange: (e) => setSelectedCustomer(e.target.value),
                })}
                className='mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-xs focus:border-green-700 focus:outline-hidden focus:ring-2 focus:ring-green-700'>
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
                // disabled={!job?.customer.id}
                defaultValue={job?.vehicle.id}
                {...register('vehicle')}
                className='mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-xs focus:border-green-700 focus:outline-hidden focus:ring-2 focus:ring-green-700 disabled:opacity-50'>
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
                defaultValue={job?.service.id}
                {...register('service')}
                className='mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-xs focus:border-green-700 focus:outline-hidden focus:ring-2 focus:ring-green-700'>
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
                defaultValue={
                  job?.due_date instanceof Date
                    ? job.due_date.toISOString().split('T')[0]
                    : job?.due_date || ''
                }
                min={new Date().toISOString().split('T')[0]}
                {...register('due_date')}
                type='date'
                className='mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-xs focus:border-green-700 focus:outline-hidden focus:ring-2 focus:ring-green-700'
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
                defaultValue={job?.assigned_to?.id}
                {...register('assigned_to')}
                className='mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-xs focus:border-green-700 focus:outline-hidden focus:ring-2 focus:ring-green-700'>
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
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Status
              </label>
              <select
                defaultValue={job?.status}
                {...register('status')}
                className='mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-xs focus:border-green-700 focus:outline-hidden focus:ring-2 focus:ring-green-700'>
                <option value=''>Select Status</option>
                <option value='in progress'>In Progress</option>
                <option value='pending'>Pending</option>
                <option value='complete'>Complete</option>
              </select>
              {errors.status && (
                <span className='text-sm text-red-500'>
                  {errors.status.message}
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
