export default function Terms() {
  return (
    <main className="bg-white pt-28">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 py-32 sm:px-6 sm:py-24">
        <div className="mb-14 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* cspell:disable */}
        <div className="w-full rounded-2xl bg-gray-50 p-8 sm:p-12">
          <h2 className="text-xl font-semibold text-gray-900">
            1. Agreement to Terms
          </h2>
          <p className="mb-8 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>

          <h2 className="text-xl font-semibold text-gray-900">
            2. Use License
          </h2>
          <p className="mb-8 text-gray-600">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident.
          </p>

          <h2 className="text-xl font-semibold text-gray-900">3. Disclaimer</h2>
          <p className="mb-8 text-gray-600">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam.
          </p>

          <h2 className="text-xl font-semibold text-gray-900">
            4. Limitations
          </h2>
          <p className="mb-8 text-gray-600">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione.
          </p>

          <h2 className="text-xl font-semibold text-gray-900">
            5. Revisions and Errata
          </h2>
          <p className="mb-8 text-gray-600">
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit, sed quia non numquam.
          </p>
        </div>
        {/* cspell:enable */}
      </section>
    </main>
  );
}
