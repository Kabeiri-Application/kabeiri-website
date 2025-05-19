import Image from "next/image";

const TEAM_MEMBERS = [
  {
    name: "Jesus Martinez",
    role: "CEO & Co-founder",
    image: "https://placehold.co/400x400/purple/white?text=JM",
  },
  {
    name: "Dinuka Ranasinghe",
    role: "COO & Co-Founder",
    image: "https://placehold.co/400x400/red/white?text=DR",
  },
  {
    name: "Jerome Homes",
    role: "Co-Founder",
    image: "https://placehold.co/400x400/orange/white?text=JH",
  },
  {
    name: "Joshua Grossman",
    role: "Co-CTO & Head of Product",
    image: "https://placehold.co/400x400/pink/white?text=JG",
  },
  {
    name: "Zaker Choudhury",
    role: "Co-CTO & Head of Engineering",
    image: "https://placehold.co/400x400/blue/white?text=ZC",
  },
  {
    name: "Khurshid Salma",
    role: "Advisor",
    image: "https://placehold.co/400x400/green/white?text=KS",
  },
] as const;

export default function About() {
  return (
    <>
      <section className="flex min-h-[60vh] items-center justify-center px-4 sm:px-6">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Revolutionizing
            <br />
            <span className="from-primary to-primary/80 bg-linear-to-r bg-clip-text text-transparent">
              Automotive Care
            </span>
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg sm:text-xl">
            {`We're building the future of automotive service with AI-powered
            diagnostics, digital workflows, and an open ecosystem for
            innovation.`}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="bg-card grid gap-12 rounded-2xl p-8 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
              Our Mission
            </h2>
            <p className="text-muted-foreground text-lg">
              {`At Kabeiri, we're on a mission to transform the automotive
              service industry by creating a transparent, efficient, and
              innovative ecosystem that benefits everyone - from car owners to
              mechanics and developers.`}
            </p>
          </div>
          <div>
            <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
              Our Vision
            </h2>
            <p className="text-muted-foreground text-lg">
              We envision a future where automotive care is seamless,
              transparent, and powered by cutting-edge technology. Our platform
              serves as the foundation for this transformation, connecting all
              stakeholders in the automotive service industry.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Meet Our Team
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.name}
              className="group bg-card relative overflow-hidden rounded-2xl shadow-xs transition-all duration-200 hover:shadow-md"
            >
              <div className="relative aspect-square">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={400}
                  height={400}
                  className="object-cover transition-transform duration-200 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent">
                <div className="absolute bottom-0 p-6 invert dark:invert-0">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
