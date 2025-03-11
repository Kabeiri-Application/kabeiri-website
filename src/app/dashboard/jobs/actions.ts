'use server';

import { createClient } from '@/utils/supabase/server';

interface FormData {
  customer: string;
  organization: string;
  service: string;
  description: string;
  // dueDate: Date;
  // assignedTo: string;
  // createdBy: string;
  title: string;
}

export async function getJobs(org: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('jobs')
    .select()
    .eq('organization', org);

  if (error) {
    return { error: error.message };
  }

  return data;
}

export async function createJob(formData: FormData) {
  console.log(formData);
  // const supabase = await createClient();

  // const { error } = await supabase.from('jobs').insert(formData);

  // if (error) {
  //   console.error('Error in createJob:', error);
  //   return { success: false, error };
  // }

  // return { success: true };
}
