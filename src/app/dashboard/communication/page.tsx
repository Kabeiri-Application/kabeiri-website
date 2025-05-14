'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { Send } from 'lucide-react';

import { Button } from '@/components/Button';
import { Table } from '@/components/Table';

type Message = {
  customer: string;
  subject: string;
  date: string;
  status: 'Unread' | 'Read' | 'Replied';
  actions: string;
};

const data: Message[] = [
  {
    customer: 'John Doe',
    subject: 'Oil Change Inquiry',
    date: '2023-06-10',
    status: 'Unread',
    actions: 'View',
  },
  {
    customer: 'Jane Smith',
    subject: 'Appointment Reschedule',
    date: '2023-06-09',
    status: 'Read',
    actions: 'View',
  },
  {
    customer: 'Bob Johnson',
    subject: 'Quote Request',
    date: '2023-06-08',
    status: 'Replied',
    actions: 'View',
  },
];

const columnHelper = createColumnHelper<Message>();

const columns = [
  columnHelper.accessor('customer', {
    header: 'Customer',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('subject', {
    header: 'Subject',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('date', {
    header: 'Date',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => (
      <span
        className={
          info.getValue() === 'Unread'
            ? 'text-blue-600'
            : info.getValue() === 'Read'
              ? 'text-gray-600'
              : 'text-green-600'
        }>
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor('actions', {
    header: 'Actions',
    cell: (info) => (
      <Button variant='secondary' size='sm'>
        {info.getValue()}
      </Button>
    ),
  }),
];

export default function CommunicationPage() {
  return (
    <main className='p-8'>
      <div className='mx-auto max-w-7xl'>
        <h1 className='mb-8 text-3xl font-bold'>Communication Center</h1>

        <div className='mb-8 grid gap-6 lg:grid-cols-2'>
          {/* New Message */}
          <div className='rounded-2xl bg-white p-6 shadow-xs'>
            <h2 className='mb-6 text-2xl font-bold'>New Message</h2>
            <form className='space-y-4'>
              <div>
                <input
                  className='w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-base placeholder:text-gray-500 focus:border-purple-500 focus:outline-hidden focus:ring-2 focus:ring-purple-500'
                  type='email'
                  placeholder='Customer Email'
                />
              </div>
              <div>
                <input
                  className='w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-base placeholder:text-gray-500 focus:border-purple-500 focus:outline-hidden focus:ring-2 focus:ring-purple-500'
                  type='text'
                  placeholder='Subject'
                />
              </div>
              <div>
                <textarea
                  rows={6}
                  className='w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-base placeholder:text-gray-500 focus:border-purple-500 focus:outline-hidden focus:ring-2 focus:ring-purple-500'
                  placeholder='Message'
                />
              </div>
              <Button className='w-full'>
                <Send className='mr-2 size-5' />
                Send Message
              </Button>
            </form>
          </div>

          {/* Message Templates */}
          <div className='rounded-2xl bg-white p-6 shadow-xs'>
            <h2 className='mb-6 text-2xl font-bold'>Message Templates</h2>
            <div className='space-y-4'>
              <button className='w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-left text-base hover:bg-gray-50'>
                Appointment Confirmation
              </button>
              <button className='w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-left text-base hover:bg-gray-50'>
                Service Completion
              </button>
              <button className='w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-left text-base hover:bg-gray-50'>
                Follow-up
              </button>
            </div>
          </div>
        </div>

        {/* Recent Messages */}
        <div className='rounded-2xl bg-white p-6 shadow-xs'>
          <h2 className='mb-6 text-2xl font-bold'>Recent Messages</h2>
          <Table columns={columns} data={data} />
        </div>
      </div>
    </main>
  );
}
