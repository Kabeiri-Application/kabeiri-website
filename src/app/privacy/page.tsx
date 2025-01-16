export default function Privacy() {
  return (
    <main className='bg-white pt-28'>
      <section className='mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 py-32 sm:px-6 sm:py-24'>
        <div className='mb-14 text-center'>
          <h1 className='mb-4 text-4xl font-bold tracking-tight sm:text-5xl'>
            Privacy Policy
          </h1>
          <p className='text-lg text-gray-600'>
            Last updated:{' '}
            {new Date().toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </div>

        <div className='w-full rounded-2xl bg-gray-50 p-8 sm:p-12'>
          <h2 className='text-xl font-semibold text-gray-900'>
            1. Information Collection
          </h2>
          <p className='mb-8 text-gray-600'>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores.
          </p>

          <h2 className='text-xl font-semibold text-gray-900'>2. Data Usage</h2>
          <p className='mb-8 text-gray-600'>
            Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
            impedit quo minus id quod maxime placeat facere possimus.
          </p>

          <h2 className='text-xl font-semibold text-gray-900'>
            3. Your Rights
          </h2>
          <p className='mb-8 text-gray-600'>
            Et harum quidem rerum facilis est et expedita distinctio. Nam libero
            tempore, cum soluta nobis est eligendi optio.
          </p>

          <h2 className='text-xl font-semibold text-gray-900'>
            4. Data Security
          </h2>
          <p className='mb-8 text-gray-600'>
            Temporibus autem quibusdam et aut officiis debitis aut rerum
            necessitatibus saepe eveniet ut et voluptates.
          </p>

          <h2 className='text-xl font-semibold text-gray-900'>
            5. Contact Information
          </h2>
          <p className='mb-8 text-gray-600'>
            Itaque earum rerum hic tenetur a sapiente delectus, ut aut
            reiciendis voluptatibus maiores alias consequatur.
          </p>
        </div>
      </section>
    </main>
  );
}
