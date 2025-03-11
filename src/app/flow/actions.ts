'use server';

import { revalidatePath } from 'next/cache';

import {
  PersonalSchema,
  type AddressSchema,
  type ShopSchema,
  type SignupSchema,
} from '@/app/flow/schema';
import { db } from '@/db';
import { organizationsTable, profilesTable } from '@/db/schema';
import { createClient } from '@/utils/supabase/server';

export async function createAccount(formData: SignupSchema) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/flow', 'layout');
}

export async function uploadAvatar(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    if (!file) {
      throw new Error('No file provided');
    }

    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('User not found');
    }

    // Generate a unique filename using timestamp and original extension
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, file);

    if (uploadError) {
      throw uploadError;
    }

    return { url: fileName };
  } catch (error) {
    console.error('Error uploading avatar:', error);
    return { error: 'Failed to upload avatar' };
  }
}

export async function deleteAvatar(path: string) {
  try {
    const supabase = await createClient();

    const { error: deleteError } = await supabase.storage
      .from('avatars')
      .remove([path]);

    if (deleteError) {
      throw deleteError;
    }

    return { success: true };
  } catch (error) {
    console.error('Error deleting avatar:', error);
    return { error: 'Failed to delete avatar' };
  }
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

export async function setShopInfo(formData: ShopSchema) {
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
