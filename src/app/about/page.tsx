export default function About() {
  return (
    <main className='bg-white'>
      <section className='flex min-h-screen flex-col items-center justify-center px-6'>
        <h1>About Us</h1>
        <p>
          Welcome to our website. We are dedicated to providing the best service
          possible.
        </p>
      </section>
      <section className='flex min-h-screen flex-col items-center justify-center px-6'>
        <h1>Our Team</h1>
        <div className='flex flex-row justify-center gap-4'>
          <div className='h-52 w-52 border'></div>
          <div className='h-52 w-52 border'></div>
          <div className='h-52 w-52 border'></div>
        </div>
      </section>
    </main>
  );
}
