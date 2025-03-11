'use server';

import { createClient } from '@/utils/supabase/server';

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
