'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import { getJob } from '../actions';

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

export default function Page() {
  const [job, setJob] = useState<Job | null>(null);
  const params = useParams();

  const jobID = params.id;

  const fetchData = async () => {
    try {
      const data = await getJob(jobID as string);
      setJob(data as Job);
    } catch (error) {
      console.error('Error fetching job data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log('Job:', job);

  return (
    <main className='p-8'>
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
                  {job.assigned_to.firstName} {job.assigned_to.lastName}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
