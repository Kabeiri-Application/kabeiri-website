'use server';

import { headers } from 'next/headers';

import { db } from '@/db';
import { NewService, servicesTable } from '@/db/app.schema';
import { auth } from '@/lib/auth';

export async function createService(
  formData: NewService,
  organizationId: string
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    return { success: false, error: 'Not authenticated' };
  }

  try {
    await db.insert(servicesTable).values({
      ...formData,
      organization: organizationId,
    });
    return { success: true };
  } catch (error) {
    console.error('Error in createJob:', error);
  }
}
