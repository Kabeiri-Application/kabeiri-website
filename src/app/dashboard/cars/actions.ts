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

export async function getCarsModels(make: string, year: string) {
  console.log("Fetching car models for make:", make, "and year:", year);
  try {
    const response = await fetch(
      `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records?limit=100&refine=make%3A%22${encodeURIComponent(make)}%22&refine=year%3A%22${encodeURIComponent(year)}%22`,
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch car models: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getCarsModels:", error);
  }
}
