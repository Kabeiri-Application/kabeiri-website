'use server';

import { createClient } from '@/utils/supabase/server';

interface FormData {
  customer: string;
  service: string;
  description: string;
  dueDate: Date;
  assignedTo: string;
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

export async function getServices(organizationId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('services')
    .select()
    .eq('organization', organizationId);

  if (error) {
    return { error: error.message };
  }

  return data;
}

export async function getCustomers() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select()
    .eq('role', 'customer');

  if (error) {
    return { error: error.message };
  }

  return data;
}

export async function getVehicles(customerId: string) {
  console.log(customerId);
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('cars')
    .select()
    .eq('owner', customerId);

  if (error) {
    return { error: error.message };
  }

  return data;
}

export async function getEmployees(organizationId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select()
    .eq('organization', organizationId)
    .eq('role', 'employee');

  if (error) {
    return { error: error.message };
  }

  return data;
}
