import { BarChart3, Clock, DollarSign, Wrench } from 'lucide-react';

export default function DashboardPage() {
  return (
    <main className='p-8'>
      <div className='mx-auto max-w-7xl'>
        <h1 className='mb-8 text-3xl font-bold'>Dashboard</h1>

        {/* Stats Grid */}
        <div className='mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {/* Total Jobs */}
          <div className='rounded-2xl bg-white p-6 shadow-sm'>
            <div className='flex items-center gap-4'>
              <div className='flex size-12 items-center justify-center rounded-xl bg-purple-100'>
                <Wrench className='size-6 text-purple-600' />
              </div>
              <div>
                <p className='text-sm font-medium text-gray-600'>Total Jobs</p>
                <p className='text-2xl font-bold'>24</p>
              </div>
            </div>
          </div>

          {/* In Progress */}
          <div className='rounded-2xl bg-white p-6 shadow-sm'>
            <div className='flex items-center gap-4'>
              <div className='flex size-12 items-center justify-center rounded-xl bg-blue-100'>
                <BarChart3 className='size-6 text-blue-600' />
              </div>
              <div>
                <p className='text-sm font-medium text-gray-600'>In Progress</p>
                <p className='text-2xl font-bold'>8</p>
              </div>
            </div>
          </div>

          {/* Revenue */}
          <div className='rounded-2xl bg-white p-6 shadow-sm'>
            <div className='flex items-center gap-4'>
              <div className='flex size-12 items-center justify-center rounded-xl bg-green-100'>
                <DollarSign className='size-6 text-green-600' />
              </div>
              <div>
                <p className='text-sm font-medium text-gray-600'>Revenue</p>
                <p className='text-2xl font-bold'>$5,230</p>
              </div>
            </div>
          </div>

          {/* Avg. Completion Time */}
          <div className='rounded-2xl bg-white p-6 shadow-sm'>
            <div className='flex items-center gap-4'>
              <div className='flex size-12 items-center justify-center rounded-xl bg-pink-100'>
                <Clock className='size-6 text-pink-600' />
              </div>
              <div>
                <p className='text-sm font-medium text-gray-600'>
                  Avg. Completion Time
                </p>
                <p className='text-2xl font-bold'>3.2 hrs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Jobs and Inventory Grid */}
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
          {/* Recent Jobs */}
          <div className='rounded-2xl bg-white p-6 shadow-sm'>
            <h2 className='mb-4 text-lg font-bold'>Recent Jobs</h2>
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='font-medium'>Oil Change - Toyota Camry</p>
                  <p className='text-sm text-gray-600'>2 hours ago</p>
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='font-medium'>Brake Replacement - Ford F-150</p>
                  <p className='text-sm text-gray-600'>2 hours ago</p>
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='font-medium'>Tire Rotation - Honda Civic</p>
                  <p className='text-sm text-gray-600'>2 hours ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Low Inventory Alert */}
          <div className='rounded-2xl bg-white p-6 shadow-sm'>
            <h2 className='mb-4 text-lg font-bold'>Low Inventory Alert</h2>
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <p className='font-medium'>Oil Filters</p>
                <span className='text-sm font-medium text-red-500'>
                  Low Stock
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <p className='font-medium'>Brake Pads</p>
                <span className='text-sm font-medium text-red-500'>
                  Low Stock
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <p className='font-medium'>Windshield Wipers</p>
                <span className='text-sm font-medium text-red-500'>
                  Low Stock
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
