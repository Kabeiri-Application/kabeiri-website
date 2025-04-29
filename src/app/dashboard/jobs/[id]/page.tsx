'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Pencil } from 'lucide-react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { editJob, getJob, getOrganizationId } from '../actions';

type Job = {
  id: number;
  title: string;
  description: string;
  customer: { id: string; firstName: string; lastName: string };
  vehicle: {
    id: string;
    year: string;
    make: string;
    model: string;
  };
  service: { id: string; title: string };
  status: 'In Progress' | 'Pending' | 'Completed';
  assigned_to: { id: string; firstName: string; lastName: string };
  due_date?: string | Date;
};

export default function Page() {
  const [job, setJob] = useState<Job | null>(null);
  const params = useParams();
  const router = useRouter();
  const [modalStatus, setModalStatus] = useState(false);
  const [organization, setOrganization] = useState('');

  const jobID = params.id;

  const fetchData = async () => {
    const organizationId = await getOrganizationId();
    if (typeof organizationId === 'string') {
      setOrganization(organizationId);
    } else {
      console.error('Invalid organizationId:', organizationId);
    }
    try {
      const data = await getJob(jobID as string);
      setJob(data as unknown as Job);
    } catch (error) {
      console.error('Error fetching job data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formSchema = z.object({
    title: z.string().min(1, 'Title must be at least 1 characters'),
    description: z.string().min(1, 'Last name must be at least 1 characters'),
    due_date: z.string(),
  });

  type FormInputs = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ resolver: zodResolver(formSchema) });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    editJob(
      {
        ...data,
        organization,
        customer: job?.customer.id || '',
        service: job?.service.id || '',
        assigned_to: job?.assigned_to.id || '',
        vehicle: job?.vehicle.id || '',
      },
      jobID as string
    );
    setModalStatus(false);
    fetchData();
  };

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
              className={`rounded-full px-4 py-2 font-medium ${
                job.status === 'Completed'
                  ? 'bg-green-100 text-green-700'
                  : job.status === 'In Progress'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
              }`}>
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
                {...register('title')}
                defaultValue={job?.title}
                type='text'
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
                defaultValue={job?.description}
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
                Due Date
              </label>
              <input
                min={new Date().toISOString().split('T')[0]}
                {...register('due_date')}
                defaultValue={
                  job?.due_date
                    ? new Date(job.due_date).toISOString().split('T')[0]
                    : ''
                }
                type='date'
                className='mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-700'
              />
              {errors.due_date && (
                <span className='text-sm text-red-500'>
                  {errors.due_date.message}
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
