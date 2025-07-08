"use server";

import { headers } from "next/headers";

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
