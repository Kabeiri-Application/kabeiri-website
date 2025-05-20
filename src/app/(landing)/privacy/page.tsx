export default function Privacy() {
  return (
    <section className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 py-32 sm:px-6 sm:py-24">
      <div className="mb-14 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground text-lg">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="bg-card w-full rounded-2xl p-8 sm:p-12">
        <h2 className="text-xl font-semibold">1. Information Collection</h2>
        <p className="text-muted-foreground mb-8">
          Kabeiri collects information you provide when you register for an
          account, use our services, or contact customer support. This
          information may include your name, email address, phone number,
          business details, vehicle information, and payment information. We
          also automatically collect certain information about your device and
          how you interact with our platform.
        </p>
        <h2 className="text-xl font-semibold">2. Data Usage</h2>
        <p className="text-muted-foreground mb-8">
          We use your information to provide, maintain, and improve our
          automotive management services, process transactions, send
          notifications related to your account or services, and communicate
          with you about products, services, offers, and events. We may also use
          your data to develop new products and features, analyze usage
          patterns, and enhance security.
        </p>

        <h2 className="text-xl font-semibold">3. Your Rights</h2>
        <p className="text-muted-foreground mb-8">
          You have the right to access, correct, or delete your personal
          information. You may also request a copy of the personal data we hold
          about you or object to our processing of your data. To exercise these
          rights, please contact us through the methods provided in the Contact
          Information section. Please note that some data may be retained as
          required by law or legitimate business purposes.
        </p>

        <h2 className="text-xl font-semibold">4. Data Security</h2>
        <p className="text-muted-foreground mb-8">
          Kabeiri implements appropriate technical and organizational measures
          to protect your personal information against unauthorized access,
          accidental loss, alteration, or disclosure. While we strive to use
          commercially acceptable means to protect your personal information, we
          cannot guarantee absolute security. We regularly review and update our
          security practices to enhance protection.
        </p>

        <h2 className="text-xl font-semibold">5. Contact Information</h2>
        <p className="text-muted-foreground mb-8">
          If you have questions or concerns about this Privacy Policy or our
          data practices, please contact us at privacy@kabeiri.com. We will
          respond to your inquiry within a reasonable timeframe. For urgent
          matters related to your personal data, you can also reach our data
          protection team at (555) 123-4567.
        </p>
      </div>
    </section>
  );
}
