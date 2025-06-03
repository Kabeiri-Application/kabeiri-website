"use server";

import { headers } from "next/headers";

import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { NewProfile, profilesTable } from "@/db/app.schema";
import { auth } from "@/lib/auth";

export async function getCustomers(organizationId: string) {
  try {
    return await db.query.profilesTable.findMany({
      where: and(
        eq(profilesTable.organization, organizationId),
        eq(profilesTable.role, "customer"),
      ),
    });
  } catch (error) {
    console.error("Error in getCustomers:", error);
  }
}

export async function getCustomer(customerId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    console.error("Not authenticated");
  }

  try {
    const service = await db.query.profilesTable.findFirst({
      where: eq(profilesTable.id, customerId),
    });
    return service;
  } catch (error) {
    console.error("Error in getCustomer:", error);
  }
}

export async function editCustomer(formData: NewProfile, customerId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    console.error("Not authenticated");
  }
  try {
    console.log("Editing service with ID:", customerId);
    await db
      .update(profilesTable)
      .set({
        ...formData,
      })
      .where(eq(profilesTable.id, customerId));
    return { success: true };
  } catch (error) {
    console.error("Error in editCustomer:", error);
  }
}
