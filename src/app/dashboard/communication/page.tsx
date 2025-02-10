import { Send } from 'lucide-react';

export default function CommunicationPage() {
  return (
    <main className='p-8'>
      <div className='mx-auto max-w-7xl'>
        <h1 className='mb-8 text-3xl font-bold'>Communication</h1>
        {/* New Message */}
        <div className='rounded-2xl bg-white p-6 shadow-sm'>
          <h2 className='mb-4 text-lg font-bold'>New Message</h2>
          <form className='space-y-4'>
            <input
              className='flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus:outline-none focus:ring-1 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
              type='text'
              placeholder='Customer Email'
            />
            <input
              className='flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus:outline-none focus:ring-1 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
              type='text'
              placeholder='Subject'
            />
            <textarea
              rows={5}
              className='flex w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus:outline-none focus:ring-1 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
              placeholder='Message'
            />
            <button className='flex h-9 w-full items-center justify-center rounded-md bg-black text-sm font-medium text-white shadow-sm transition-opacity duration-200 hover:opacity-80 focus:outline-none focus:ring-1 focus:ring-purple-500 disabled:cursor-not-allowed disabled:opacity-50'>
              <Send className='pr-2' /> Send Message
            </button>
          </form>
        </div>
      </div>
      <div className='mx-auto max-w-7xl'>
        <h1 className='mb-8 text-3xl font-bold'>Communication</h1>
        {/* New Message */}
        <div className='rounded-2xl bg-white p-6 shadow-sm'>
          <h2 className='mb-4 text-lg font-bold'>Message Templates</h2>
          <form className='space-y-4'>
            <p>NEEDS REDESIGN WITH FORM FOR EACH FIELD OPTION</p>
          </form>
        </div>
      </div>
    </main>
  );
}
