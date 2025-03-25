'use server';

import { createClient } from '@/utils/supabase/server';

interface FormData {
  customer: string;
  service: string;
  description: string;
  due_date: string | Date;
  assigned_to: string;
  title: string;
  vehicle: string;
  organization: string | null;
}

export async function createJob(formData: FormData, organizationId: string) {
  console.log(formData, organizationId);
  formData.organization = organizationId;
  console.log('Edited: ', formData);
  const supabase = await createClient();
  const { data, error } = await supabase.from('jobs').insert(formData);

  if (error) {
    console.error('Error in createJob:', error);
    return { success: false, error };
  }
  console.log(data);
  return { success: true };
}

export async function getOrganizationId() {
  const supabase = await createClient();

  const { data: userData, error } = await supabase.auth.getUser();
  const { data, error: error2 } = await supabase
    .from('profiles')
    .select()
    .eq('id', userData?.user?.id);
  if (error2) {
    return { error: error2.message };
  }
  console.log('USER: ', data[0]?.organization);
  return data[0]?.organization;
}

export async function getJobs(organizationId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('jobs')
    .select()
    .eq('organization', organizationId);

  if (error) {
    console.log('ERROR JOBS', error);
    return { error: error.message };
  }
  console.log('JOBS: ', data);
  return data;
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
  console.log('SERVICES: ', data);
  return data;
}

export async function getCustomers(organizationId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select()
    .eq('organization', organizationId)
    .eq('role', 'customer');

  if (error) {
    return { error: error.message };
  }
  console.log('CUSTOMERS: ', data);
  return data;
}

export async function getCustomer(customerId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select()
    .eq('id', customerId);

  if (error) {
    return { error: error.message };
  }
  console.log('CUSTOMER: ', data);
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
  console.log('VEHICLES: ', data);
  return data;
}

export async function getEmployees(organizationId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select()
    .eq('organization', organizationId)
    .eq('role', 'user');

  if (error) {
    return { error: error.message };
  }
  console.log('EMPLOYEES: ', data);
  return data;
}
