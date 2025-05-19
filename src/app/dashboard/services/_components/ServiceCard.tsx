import { useRouter } from 'next/navigation';

import { Service } from '@/db/app.schema';

export default function ServiceCard(service: Service) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/dashboard/services/${service.id}`)}
      key={service.id}
      className='group relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md'>
      <div className='mb-4 flex items-center justify-between'>
        <div className='flex items-center'>
          <h2 className='text-xl font-semibold text-gray-900'>
            {service.title}
          </h2>
        </div>
      </div>
      <p className='text-gray-600'>Description: {service.description}</p>
      <p className='text-gray-600'>{`Price: $${service.price}`}</p>
    </div>
  );
}
