'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

export async function submitInitialData(formData: FormData) {
  // const supabase = await createClient();
  console.log(formData);
}
