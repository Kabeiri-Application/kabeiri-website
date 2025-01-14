export function Footer() {
  return (
    <footer className='bg-white py-8'>
      <div className='mx-auto max-w-7xl px-6'>
        <p className='text-center text-gray-600'>
          &copy; {new Date().getFullYear()} Kabeiri Corp. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
