'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { Plus } from 'lucide-react';

import { getJobs } from '@/app/dashboard/jobs/actions';
import { Button } from '@/components/Button';
import { Table } from '@/components/Table';

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

export default function JobsPage() {
  return (
    <main className='p-8'>
      <div className='mx-auto max-w-7xl'>
        <div className='mb-8 flex items-center justify-between'>
          <h1 className='text-3xl font-bold'>Job List</h1>
          <Button>
            <Plus className='mr-2 size-5' />
            New Job
          </Button>
        </div>

        <Table columns={columns} data={data} />
      </div>
    </main>
  );
}
