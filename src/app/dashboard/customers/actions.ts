"use server";

import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { profilesTable } from "@/db/app.schema";

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
