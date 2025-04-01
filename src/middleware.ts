import { NextResponse, type NextRequest } from 'next/server';

import { getSessionCookie } from 'better-auth/cookies';

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request, {
    // cookieName: 'session_token',
    // cookiePrefix: 'better-auth',
  });

  console.log('Session cookie:', sessionCookie);

  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = { matcher: ['/dashboard'] };
