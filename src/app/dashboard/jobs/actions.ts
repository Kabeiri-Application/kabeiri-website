'use server';

import { headers } from 'next/headers';

import { and, eq } from 'drizzle-orm';

import { db } from '@/db';
import {
  carsTable,
  jobsTable,
  profilesTable,
  servicesTable,
} from '@/db/app.schema';
import { auth } from '@/lib/auth';

interface FormData {
  customer: string;
  service: string;
  description: string;
  due_date: string | Date;
  assigned_to: string;
  title: string;
  vehicle: string;
  organization: string | null;
}

export async function createJob(formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    return { success: false, error: 'Not authenticated' };
  }

  try {
    await db.insert(jobsTable).values({
      ...formData,
      due_date:
        formData.due_date instanceof Date
          ? formData.due_date
          : new Date(formData.due_date),
      createdBy: session.user.id,
    });
    return { success: true };
  } catch (error) {
    console.error('Error in createJob:', error);
    return { success: false, error };
  }
}

export async function getOrganizationId() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    return { success: false, error: 'Not authenticated' };
  }

  try {
    const profile = await db.query.profilesTable.findFirst({
      where: eq(profilesTable.id, session.user.id),
    });
    return profile?.organization;
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}

export async function getJobs(organizationId: string) {
  try {
    return await db.query.jobsTable.findMany({
      where: eq(jobsTable.organization, organizationId),
      with: {
        customer: true,
        vehicle: true,
        service: true,
        assigned_to: true,
        createdBy: true,
      },
    });
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}

export async function getServices(organizationId: string) {
  try {
    return await db.query.servicesTable.findMany({
      where: eq(servicesTable.organization, organizationId),
    });
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}

export async function getCustomers(organizationId: string) {
  try {
    return await db.query.profilesTable.findMany({
      where: and(
        eq(profilesTable.organization, organizationId),
        eq(profilesTable.role, 'customer')
      ),
    });
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}

export async function getCustomer(customerId: string) {
  try {
    return await db.query.profilesTable.findFirst({
      where: eq(profilesTable.id, customerId),
    });
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}

export async function getVehicles(customerId: string) {
  try {
    return await db.query.carsTable.findMany({
      where: eq(carsTable.owner, customerId),
    });
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}

export async function getEmployees(organizationId: string) {
  try {
    return await db.query.profilesTable.findMany({
      where: and(
        eq(profilesTable.organization, organizationId),
        eq(profilesTable.role, 'user')
      ),
    });
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}
