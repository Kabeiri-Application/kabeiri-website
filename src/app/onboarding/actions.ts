"use server";

import { revalidatePath } from "next/cache";

import { eq } from "drizzle-orm";

import type {
  AddressSchema,
  PersonalSchema,
  ShopSchema,
} from "@/app/onboarding/schema";
import { db } from "@/db";
import { profilesTable } from "@/db/app.schema";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";

type ActionResponse<T = undefined> = {
  success: boolean;
  error?: string;
  data?: T;
};

export async function createUserAccount(formData: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}): Promise<ActionResponse<{ userId: string }>> {
  try {
    const authResponse = await auth.api.signUpEmail({
      body: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
      },
    });

    if (!authResponse?.user?.id) {
      throw new Error("Failed to create account");
    }

    return {
      success: true,
      data: { userId: authResponse.user.id },
    };
  } catch (error: unknown) {
    console.error("Error creating account:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create account",
    };
  }
}

export async function createUserProfile(
  userId: string,
  formData: PersonalSchema & AddressSchema,
): Promise<ActionResponse> {
  try {
    await db.insert(profilesTable).values({
      id: userId,
      username: formData.username,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phoneNumber,
      role: "user",
      streetAddress: formData.address,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      avatarUrl: formData.avatarUrl,
    });

    return { success: true };
  } catch (error: unknown) {
    console.error("Error creating profile:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create profile",
    };
  }
}

export async function createOrganization(
  userId: string,
  formData: ShopSchema,
): Promise<ActionResponse<{ organizationId: string }>> {
  console.log("Creating organization with data:", formData);
  try {
    const orgResponse = await authClient.organization.create({
      userId: userId,
      name: formData.shopName,
      slug: formData.shopName.toLowerCase().replace(/\s+/g, "-"),

      // logo: formData.logoUrl || "",
      // phoneNumber: formData.phoneNumber,
      // streetAddress: formData.streetAddress,
      // city: formData.city,
      // state: formData.state,
      // zipCode: formData.zipCode,
      // website: formData.website || "",
    });
    console.log("Organization created:", orgResponse);
    const org = orgResponse?.data;

    if (!org?.id) {
      throw new Error("Failed to create organization");
    }

    // Update the user's profile with the organization ID and change role to owner
    await db
      .update(profilesTable)
      .set({
        organization: org.id,
        role: "owner",
        updatedAt: new Date(),
      })
      .where(eq(profilesTable.id, userId));

    revalidatePath("/onboarding");
    return {
      success: true,
      data: { organizationId: org.id },
    };
  } catch (error: unknown) {
    console.error("Error creating organization:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to create organization",
    };
  }
}
