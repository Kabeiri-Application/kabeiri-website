"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { z } from "zod";

import { db } from "@/db";
import { profilesTable } from "@/db/app.schema";
import { auth } from "@/lib/auth";

import { addUserFormSchema } from "./schema";

export async function addUser(
  data: z.infer<typeof addUserFormSchema>,
): Promise<{ success: boolean; error?: string }> {
  try {
    // Check authentication
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    // Create user through auth system
    const newUserResult = await auth.api.signUpEmail({
      body: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });

    // Check if user creation was successful
    if (!newUserResult?.user?.id) {
      return { success: false, error: "Failed to create user account" };
    }

    // Create profile (using available fields from schema)
    await db.insert(profilesTable).values({
      id: newUserResult.user.id,
      username: data.email,
      firstName: data.name.split(" ")[0] || data.name, // Extract first name
      lastName: data.name.split(" ").slice(1).join(" ") || "", // Extract last name
      role: data.role,
      organization: null, // Will be set properly later with organization management
      phone: "", // Will be filled later
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
    });

    revalidatePath("/dashboard/settings/adminSettings/manageUsers");

    return { success: true };
  } catch (error) {
    console.error("Error adding user:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to add user",
    };
  }
}

// export async function getUsers() {
//   const session = await auth.api.getSession({ headers: await headers() });
//   if (!session?.user?.id) {
//     console.error("Not authenticated");
//     return [];
//   }

//   const users = await authClient.admin.listUsers();

//   if (!users) {
//     console.error("Failed to fetch users");
//     return [];
//   }

//   return users;
// }
