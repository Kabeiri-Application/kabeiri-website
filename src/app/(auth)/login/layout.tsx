import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Header } from "@/components/header";
import { auth } from "@/lib/auth";

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
}
