import { revalidatePath } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';

import { createClient } from '@/utils/supabase/server';

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    await supabase.auth.signOut();
  }

  const protocol = req.headers.get('x-forwarded-proto') || 'http';
  const host = req.headers.get('host') || '';
  const baseUrl = `${protocol}://${host}`;

  revalidatePath('/', 'layout');
  return NextResponse.redirect(baseUrl, {
    status: 302,
  });
}
