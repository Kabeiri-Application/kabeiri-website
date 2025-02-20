import Image from 'next/image';

const TEAM_MEMBERS = [
  {
    name: 'Jane Doe',
    role: 'CEO & Co-founder',
    image: 'https://placehold.co/400x400/purple/white?text=JD',
  },
  {
    name: 'John Doe',
    role: 'CTO & Co-founder',
    image: 'https://placehold.co/400x400/pink/white?text=JD',
  },
  {
    name: 'Jane Doe',
    role: 'Head of Product',
    image: 'https://placehold.co/400x400/blue/white?text=JD',
  },
  {
    name: 'John Doe',
    role: 'Lead Engineer',
    image: 'https://placehold.co/400x400/red/white?text=JD',
  },
  {
    name: 'Jane Doe',
    role: 'Head of Design',
    image: 'https://placehold.co/400x400/green/white?text=JD',
  },
  {
    name: 'John Doe',
    role: 'Head of Business Development',
    image: 'https://placehold.co/400x400/orange/white?text=JD',
  },
] as const;

export default function About() {
  return (
    <main className='bg-white'>
      <section className='flex min-h-[60vh] items-center justify-center px-4 pt-28 sm:px-6'>
        <div className='mx-auto max-w-7xl text-center'>
          <h1 className='mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl'>
            Revolutionizing
            <br />
            <span className='bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
              Automotive Care
            </span>
          </h1>
          <p className='mx-auto max-w-2xl text-lg text-gray-600 sm:text-xl'>
            We&apos;re building the future of automotive service with AI-powered
            diagnostics, digital workflows, and an open ecosystem for
            innovation.
          </p>
        </div>
      </section>

      <section className='mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24'>
        <div className='grid gap-12 md:grid-cols-2 md:gap-16'>
          <div>
            <h2 className='mb-6 text-3xl font-bold tracking-tight sm:text-4xl'>
              Our Mission
            </h2>
            <p className='text-lg text-gray-600'>
              At Kabeiri, we&apos;re on a mission to transform the automotive
              service industry by creating a transparent, efficient, and
              innovative ecosystem that benefits everyone - from car owners to
              mechanics and developers.
            </p>
          </div>
          <div>
            <h2 className='mb-6 text-3xl font-bold tracking-tight sm:text-4xl'>
              Our Vision
            </h2>
            <p className='text-lg text-gray-600'>
              We envision a future where automotive care is seamless,
              transparent, and powered by cutting-edge technology. Our platform
              serves as the foundation for this transformation, connecting all
              stakeholders in the automotive service industry.
            </p>
          </div>
        </div>
      </section>

      <section className='mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24'>
        <h2 className='mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl'>
          Meet Our Team
        </h2>
        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {TEAM_MEMBERS.map((member, index) => (
            <div
              key={index}
              className='group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-200 hover:shadow-md'>
              <div className='relative aspect-square'>
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  priority={index < 3}
                  className='object-cover transition-transform duration-200 group-hover:scale-105'
                  sizes='(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'
                />
              </div>
              <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent'>
                <div className='absolute bottom-0 p-6'>
                  <h3 className='text-xl font-semibold text-white'>
                    {member.name}
                  </h3>
                  <p className='text-gray-300'>{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
