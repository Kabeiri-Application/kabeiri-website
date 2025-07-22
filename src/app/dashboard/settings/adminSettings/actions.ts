"use server";

import { headers } from "next/headers";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { profilesTable } from "@/db/app.schema";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";

import { addUserFormSchema } from "./schema";

export async function addUser(formData: addUserFormSchema) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    console.error("Not authenticated");
  }

  const newUser = await authClient.admin.createUser(formData);

  if (!newUser) {
    console.error("Failed to create user");
    return;
  }
}

export async function getOrganizationUsers() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  // Get the user's profile to determine their organization
  const profile = await db.query.profilesTable.findFirst({
    where: eq(profilesTable.id, session.user.id),
  });
  if (!profile?.organization) {
    throw new Error("No organization found for user");
  }

  // Fetch all users in the same organization
  const users = await db.query.profilesTable.findMany({
    where: eq(profilesTable.organization, profile.organization),
  });
  return users;
}
