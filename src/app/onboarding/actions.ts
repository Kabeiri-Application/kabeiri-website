'use server';

import { revalidatePath } from 'next/cache';

import { eq } from 'drizzle-orm';

import type {
  AddressSchema,
  PersonalSchema,
  ShopSchema,
} from '@/app/onboarding/schema';
import { db } from '@/db';
import { organizationsTable, profilesTable } from '@/db/app.schema';
import { auth } from '@/lib/auth';

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
      throw new Error('Failed to create account');
    }

    return {
      success: true,
      data: { userId: authResponse.user.id },
    };
  } catch (error: unknown) {
    console.error('Error creating account:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to create account',
    };
  }
}

export async function createUserProfile(
  userId: string,
  formData: PersonalSchema & AddressSchema
): Promise<ActionResponse> {
  try {
    await db.insert(profilesTable).values({
      id: userId,
      username: formData.username,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phoneNumber,
      role: 'user',
      streetAddress: formData.address,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      avatarUrl: formData.avatarUrl,
    });

    return { success: true };
  } catch (error: unknown) {
    console.error('Error creating profile:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to create profile',
    };
  }
}

export async function createOrganization(
  userId: string,
  formData: ShopSchema
): Promise<ActionResponse<{ organizationId: string }>> {
  try {
    // Create the organization
    const [org] = await db
      .insert(organizationsTable)
      .values({
        businessName: formData.shopName,
        streetAddress: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        phone: '', // TODO: Add phone to shop schema
        website: formData.website || '',
      })
      .returning({ id: organizationsTable.id });

    if (!org?.id) {
      throw new Error('Failed to create organization');
    }

    // Update the user's profile with the organization ID and change role to owner
    await db
      .update(profilesTable)
      .set({
        organization: org.id,
        role: 'owner',
        updatedAt: new Date(),
      })
      .where(eq(profilesTable.id, userId));

    revalidatePath('/onboarding');
    return {
      success: true,
      data: { organizationId: org.id },
    };
  } catch (error: unknown) {
    console.error('Error creating organization:', error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to create organization',
    };
  }
}
