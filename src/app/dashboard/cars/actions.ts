"use server";

import { headers } from "next/headers";

import { eq } from "drizzle-orm";

import { carFormSchema } from "@/app/dashboard/cars/schema";
import { db } from "@/db";
import { carsTable } from "@/db/app.schema";
import { auth } from "@/lib/auth";

export async function getCar(carId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    console.error("Not authenticated");
  }

  try {
    const car = await db.query.carsTable.findFirst({
      where: eq(carsTable.id, carId),
    });
    return car;
  } catch (error) {
    console.error("Error in getCustomer:", error);
  }
}

export async function editCar(carId: string, formData: carFormSchema) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    console.error("Not authenticated");
    return;
  }

  try {
    console.log("Editing car with ID:", carId);
    await db
      .update(carsTable)
      .set({
        ...formData,
      })
      .where(eq(carsTable.id, carId));
    return { success: true };
  } catch (error) {
    console.error("Error in editCar:", error);
  }
}
