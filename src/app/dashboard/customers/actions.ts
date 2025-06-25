"use server";

import { headers } from "next/headers";

import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import {
  carsTable,
  customersTable,
  NewCar,
  NewCustomer,
} from "@/db/app.schema";
import { auth } from "@/lib/auth";

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
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    console.error("Not authenticated");
  }

  try {
    const service = await db.query.customersTable.findFirst({
      where: eq(customersTable.id, customerId),
    });
    return service;
  } catch (error) {
    console.error("Error in getCustomer:", error);
  }
}

export async function editCustomer(formData: NewCustomer) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    console.error("Not authenticated");
  }
  try {
    if (!formData.id) {
      throw new Error("Customer ID is required to edit a customer.");
    }
    console.log("Editing service with ID:", formData.id);
    await db
      .update(customersTable)
      .set({
        ...formData,
      })
      .where(eq(customersTable.id, formData.id));
    return { success: true };
  } catch (error) {
    console.error("Error in editCustomer:", error);
  }
}

export async function createCustomer(
  formData: NewCustomer,
  organizationId: string,
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    console.error("Not authenticated");
  }
  try {
    const newCustomer = await db
      .insert(customersTable)
      .values({ ...formData, organization: organizationId });
    return newCustomer;
  } catch (error) {
    console.error("Error in createCustomer:", error);
  }
}

export async function getCars(customerId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    console.error("Not authenticated");
  }
  try {
    return await db.query.carsTable.findMany({
      where: eq(carsTable.owner, customerId),
    });
  } catch (error) {
    console.error("Error in getCustomers:", error);
  }
}

export async function addVehicle(formData: NewCar) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    console.error("Not authenticated");
  }
  try {
    const newVehicle = await db.insert(carsTable).values({
      ...formData,
    });
    return newVehicle;
  } catch (error) {
    console.error("Error in addVehicle:", error);
  }
}
