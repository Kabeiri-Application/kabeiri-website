'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';

type LoginState = { error: string };

export async function login(prevState: LoginState, formData: FormData) {
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  try {
    await auth.api.signInEmail({ body: data });
  } catch (error: unknown) {
    console.log(error);
    return { error: error instanceof Error ? error.message : error };
  }

  revalidatePath('/', 'layout');
  redirect('/dashboard');
}
