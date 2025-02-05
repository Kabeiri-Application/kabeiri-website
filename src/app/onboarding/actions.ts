'use server';

import { createClient } from '@/utils/supabase/server';

type OrganizationData = {
  firstName: string;
  lastName: string;
  businessName: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
};

export async function submitInitialData(
  formData: OrganizationData & { certificates?: FileList }
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  try {
    // First, insert organization data
    const { error: orgError } = await supabase.from('organizations').insert({
      owner: user.id,
      business_name: formData.businessName,
      street_address: formData.streetAddress,
      city: formData.city,
      state: formData.state,
      zip_code: formData.zipCode,
    });

    if (orgError) throw orgError;

    // Handle certificate upload if provided
    if (formData.certificates?.[0]) {
      const file = formData.certificates[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from(`mechanic_onboarding_files`)
        .upload(`${user.id}/${filePath}`, file);

      if (uploadError) throw uploadError;
    }

    return { success: true };
  } catch (error) {
    console.error('Error in submitInitialData:', error);
    return { success: false, error };
  }
}
