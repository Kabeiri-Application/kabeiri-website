export default function Terms() {
  return (
    <section className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 py-32 sm:px-6 sm:py-24">
      <div className="mb-14 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Terms of Service
        </h1>
        <p className="text-muted-foreground text-lg">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="bg-card w-full rounded-2xl p-8 sm:p-12">
        <h2 className="text-xl font-semibold">1. Agreement to Terms</h2>
        <p className="text-muted-foreground mb-8">
          {`By accessing or using Kabeiri's services, website, or
            applications, you agree to be bound by these Terms of Service. If
            you disagree with any part of these terms, you may not access our
            services. Kabeiri reserves the right to update these terms at any
            time, and your continued use constitutes acceptance of those
            changes.`}
        </p>

        <h2 className="text-xl font-semibold">2. Use License</h2>
        <p className="text-muted-foreground mb-8">
          Kabeiri grants you a limited, non-exclusive, non-transferable license
          to use our platform for personal or business purposes related to
          automotive management, inventory, and communication services. This
          license does not include any resale or commercial use of our service
          or contents, or any derivative use of this service or its contents.
        </p>

        <h2 className="text-xl font-semibold">3. Disclaimer</h2>
        <p className="text-muted-foreground mb-8">
          {`Kabeiri's services are provided "as is" without warranties of any
            kind, either express or implied. Kabeiri does not warrant that the
            service will be uninterrupted or error-free. Advice or information
            obtained from Kabeiri's platform shall not create any warranty not
            expressly stated in these terms.`}
        </p>

        <h2 className="text-xl font-semibold">4. Limitations</h2>
        <p className="text-muted-foreground mb-8">
          In no event shall Kabeiri be liable for any indirect, incidental,
          special, consequential, or punitive damages resulting from your access
          to or use of, or inability to access or use, the service or any
          content provided on or through the service, regardless of the theory
          of liability.
        </p>

        <h2 className="text-xl font-semibold">5. Revisions and Errata</h2>
        <p className="text-muted-foreground mb-8">
          Kabeiri may make changes to the content and features of its platform
          at any time without notice. Kabeiri is not responsible for errors,
          inaccuracies, or omissions in service descriptions or pricing
          information. Kabeiri reserves the right to revise, update, or
          discontinue any aspect of its services at its sole discretion.
        </p>
      </div>
    </section>
  );
}
