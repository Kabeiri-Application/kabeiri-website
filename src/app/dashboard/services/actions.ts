"use server";

import { headers } from "next/headers";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { NewService, servicesTable } from "@/db/app.schema";
import { auth } from "@/lib/auth";

export async function createService(
  formData: NewService,
  organizationId: string,
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    await db.insert(servicesTable).values({
      ...formData,
      organization: organizationId,
    });
  } catch (error) {
    console.error("Error in createJob:", error);
  }
}

export async function getService(serviceId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    console.error("Not authenticated");
  }

  try {
    const service = await db.query.servicesTable.findFirst({
      where: eq(servicesTable.id, serviceId),
    });
    return service;
  } catch (error) {
    console.error("Error in getService:", error);
  }
}

export async function editService(formData: NewService, serviceId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    console.error("Not authenticated");
  }
  try {
    console.log("Editing service with ID:", serviceId);
    await db
      .update(servicesTable)
      .set({
        ...formData,
      })
      .where(eq(servicesTable.id, serviceId));
    return { success: true };
  } catch (error) {
    console.error("Error in createJob:", error);
  }
}
