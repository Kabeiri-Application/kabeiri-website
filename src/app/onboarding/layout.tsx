import { Suspense } from 'react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect('/dashboard');
  }

  return <Suspense>{children}</Suspense>;
}
