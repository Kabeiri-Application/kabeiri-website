"use server";

import { headers } from "next/headers";

import {
  changeEmailFormSchema,
  changePasswordFormSchema,
} from "@/app/dashboard/settings/accountSettings/schema";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";

export async function changeEmail(formData: changeEmailFormSchema) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    console.error("Not authenticated");
  }

  await authClient.changeEmail({
    newEmail: formData.newEmail,
    callbackURL: "/dashboard", //to redirect after verification
  });
}

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
