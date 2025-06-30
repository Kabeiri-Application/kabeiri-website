"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";

import { changePasswordFormSchema } from "./schema";

export async function changePassword(formData: changePasswordFormSchema) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    console.error("Not authenticated");
  }

  await authClient.changePassword({
    currentPassword: formData.currentPassword,
    newPassword: formData.newPassword,
    revokeOtherSessions: true, // revoke all other sessions the user is signed into
  });
}
