"use server";

import { headers } from "next/headers";

import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import {
  carsTable,
  customersTable,
  jobsTable,
  profilesTable,
  servicesTable,
  type NewJob,
} from "@/db/app.schema";
import { auth } from "@/lib/auth";

export async function createJob(formData: NewJob) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    await db.insert(jobsTable).values({
      ...formData,
      createdBy: session.user.id,
    });
    return { success: true };
  } catch (error) {
    console.error("Error in createJob:", error);
  }
}

export async function editJob(formData: NewJob, jobId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    return { success: false, error: "Not authenticated" };
  }
  try {
    console.log("Editing job with ID:", jobId);
    await db
      .update(jobsTable)
      .set({
        ...formData,
      })
      .where(eq(jobsTable.id, jobId));
    return { success: true };
  } catch (error) {
    console.error("Error in createJob:", error);
  }
}

export async function getOrganizationId() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  try {
    const profile = await db.query.profilesTable.findFirst({
      where: eq(profilesTable.id, session.user.id),
    });
    if (profile?.organization) {
      return profile.organization;
    }
  } catch (error) {
    console.error("Error in getOrganizationId:", error);
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
    console.error("Error in getJobs:", error);
  }
}

export async function getJob(jobId: string) {
  try {
    return await db.query.jobsTable.findFirst({
      where: eq(jobsTable.id, jobId),
      with: {
        customer: true,
        vehicle: true,
        service: true,
        assigned_to: true,
        createdBy: true,
      },
    });
  } catch (error) {
    console.error("Error in getJob:", error);
  }
}

export async function getServices(organizationId: string) {
  try {
    return await db.query.servicesTable.findMany({
      where: eq(servicesTable.organization, organizationId),
    });
  } catch (error) {
    console.error("Error in getServices:", error);
  }
}

export async function getCustomers(organizationId: string) {
  try {
    return await db.query.customersTable.findMany({
      where: and(eq(customersTable.organization, organizationId)),
    });
  } catch (error) {
    console.error("Error in getCustomers:", error);
  }
}

export async function getCustomer(customerId: string) {
  try {
    return await db.query.customersTable.findFirst({
      where: eq(customersTable.id, customerId),
    });
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function getVehicles(customerId: string) {
  console.log("Fetching vehicles for customer ID:", customerId);

  try {
    return await db.query.carsTable.findMany({
      where: eq(carsTable.owner, customerId),
    });
  } catch (error) {
    console.error("Error in getVehicles:", error);
  }
}

export async function getEmployees(organizationId: string) {
  try {
    return await db.query.profilesTable.findMany({
      where: and(
        eq(profilesTable.organization, organizationId),
        eq(profilesTable.role, "user"),
      ),
    });
  } catch (error) {
    console.error("Error in getEmployees:", error);
  }
}
