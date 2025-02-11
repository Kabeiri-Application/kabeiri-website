'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { type Session } from '@supabase/supabase-js';

import { Button } from '@/components/Button';
import { createClient } from '@/utils/supabase/client';

export function Header() {
  const supabase = createClient();
  const [session, setSession] = useState<Session | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);

      if (session?.user) {
        const { data } = await supabase
          .from('profiles')
          .select('avatar_url')
          .eq('id', session.user.id)
          .single();

        if (data?.avatar_url) {
          const { data: avatarData } = await supabase.storage
            .from('avatars')
            .download(data.avatar_url);

          if (avatarData) {
            const url = URL.createObjectURL(avatarData);
            setAvatarUrl(url);
          }
        }
      }
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  return (
    <header className='fixed inset-x-0 top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md'>
      <div className='flex cursor-progress items-center justify-center bg-gradient-to-b from-purple-600 to-pink-600 py-2'>
        <span className='font-bold text-white'>
          🚧 This site is under construction 🚧
        </span>
      </div>
      <nav className='mx-auto max-w-7xl px-6 py-4'>
        <div className='flex items-center justify-between'>
          <Link href='/' className='relative text-2xl font-bold'>
            Kabeiri
            <span className='absolute -bottom-4 right-0 rounded-full rounded-tl-none bg-gradient-to-b from-purple-600 to-pink-600 px-2 py-0.5 text-xs font-semibold text-white'>
              BETA
            </span>
          </Link>

          <div className='absolute left-1/2 -translate-x-1/2'>
            <div className='hidden items-center gap-8 text-lg font-semibold text-gray-600 transition-colors md:flex'>
              <Link href='/#features' className='hover:text-gray-900'>
                Features
              </Link>
              <Link href='/pricing' className='hover:text-gray-900'>
                Pricing
              </Link>
              <Link href='/about' className='hover:text-gray-900'>
                About
              </Link>
            </div>
          </div>

          {session ? (
            <Link
              href='/account'
              className='group relative rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'>
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt='Profile'
                  width={40}
                  height={40}
                  className='rounded-full object-cover transition-opacity group-hover:opacity-80'
                />
              ) : (
                <div className='flex size-10 items-center justify-center rounded-full bg-purple-100 text-purple-600 transition-colors group-hover:bg-purple-200'>
                  <svg
                    className='size-6'
                    fill='currentColor'
                    viewBox='0 0 24 24'>
                    <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8c0 2.208-1.79 4-3.998 4-2.208 0-3.998-1.792-3.998-4 0-2.208 1.79-4 3.998-4 2.208 0 3.998 1.792 3.998 4z' />
                  </svg>
                </div>
              )}
            </Link>
          ) : (
            <Link href='/login'>
              <Button variant='primary' size='sm'>
                Login
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
