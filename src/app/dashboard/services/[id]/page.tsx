'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { ArrowLeft, Pencil } from 'lucide-react';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Service } from '@/db/app.schema';

import { getService } from '../actions';

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [service, setService] = useState<Service>();
  const [modalStatus, setModalStatus] = useState(false);
  const [loading, setLoading] = useState(true);

  const serviceId = params.id;

  const fetchData = async () => {
    setLoading(true);
    try {
      if (!serviceId) {
        throw new Error('Service ID not found');
      }
      const service = await getService(serviceId as string);
      if (!service) {
        throw new Error('Failed to fetch data');
      }
      setService(service);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [serviceId]);

  if (loading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <div className='size-8 animate-spin rounded-full border-4 border-primary border-t-transparent' />
      </div>
    );
  }
  return (
    <main className='p-8'>
      <div className='mx-auto mb-8 flex max-w-5xl items-center justify-between'>
        <button
          onClick={() => router.back()}
          className='flex items-center text-gray-600 hover:text-gray-900'>
          <ArrowLeft className='size-4' />
          Back to Services
        </button>
        <button
          onClick={() => setModalStatus(true)}
          className='flex items-center text-gray-600 hover:text-gray-900'>
          <Pencil className='size-4' />
          Edit
        </button>
      </div>

      <div className='mx-auto max-w-5xl space-y-8'>
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold'>{service.title}</h1>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          {/* Service Information */}
          <div className='rounded-lg border border-gray-200 p-6'>
            <h2 className='mb-4 text-xl font-semibold'>Service Details</h2>
            <div className='space-y-2'>
              <p>
                <span className='font-medium'>Title: </span>
                {service.title}
              </p>
              <p>
                <span className='font-medium'>Description: </span>
                {service.description}
              </p>
              <p>
                <span className='font-medium'>Price: </span>${service.price}
              </p>
            </div>
          </div>

          {/* Timing Information */}
          <div className='rounded-lg border border-gray-200 p-6'>
            <h2 className='mb-4 text-xl font-semibold'>Timing Details</h2>
            <div className='space-y-2'>
              <p>
                <span className='font-medium'>Created: </span>
                {new Date(service.createdAt).toLocaleDateString()}
              </p>
              <p>
                <span className='font-medium'>Last Updated: </span>
                {new Date(service.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={modalStatus} onOpenChange={setModalStatus}>
        <DialogContent>
          {/* Add your edit form here similar to the jobs page */}
        </DialogContent>
      </Dialog>
    </main>
  );
}
