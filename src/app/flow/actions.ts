'use server';

import { revalidatePath } from 'next/cache';

import type {
  AddressSchema,
  PersonalSchema,
  // ShopSchema,
  SignupSchema,
} from '@/app/flow/schema';
// import { db } from '@/db';
// import { organizationsTable, profilesTable } from '@/db/schema';
import { authClient } from '@/lib/auth-client';

export async function createAccount(formData: SignupSchema) {
  const { error } = await authClient.signUp({
    name: '', // TODO: Add name here
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/flow', 'layout');
}

export async function setPersonalInfo(
  formData: PersonalSchema & AddressSchema
) {
  // TODO: Implement this
  console.log(formData);

  // try {
  //   await db.insert(profilesTable).values({
  //     fullName: formData.firstName,
  //     username: formData.username,
  //     phone: formData.phoneNumber,
  //     streetAddress: formData.address,
  //     city: formData.city,
  //     state: formData.state,
  //     zipCode: formData.zipCode,
  //   });
  // } catch (error) {
  //   console.error(error);
  //   return { error: 'Failed to set personal info' };
  // }

  if (false) {
    return { error: 'Failed to set personal info' };
  }

  // revalidatePath('/flow', 'layout');
}

export async function setShopInfo() {
  // export async function setShopInfo(formData: ShopSchema) {
  // TODO: Implement this

  // try {
  //   await db.insert(organizationsTable).values({
  //     businessName: formData.shopName,
  //   });
  // } catch (error) {
  //   console.error(error);
  //   return { error: 'Failed to set shop info' };
  // }

  if (false) {
    return { error: 'Failed to set shop info' };
  }

  // revalidatePath('/flow', 'layout');
}
