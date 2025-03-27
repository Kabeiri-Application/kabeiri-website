'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';

type SignupState = {
  error: string;
};

export async function signup(prevState: SignupState, formData: FormData) {
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  try {
    await auth.api.signUpEmail({ body: data });
  } catch (error: unknown) {
    console.log(error);
    return { error: error instanceof Error ? error.message : error };
  }

  revalidatePath('/', 'layout');
  redirect('/account');
}
