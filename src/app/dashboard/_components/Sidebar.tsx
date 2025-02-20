'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Bell,
  DollarSign,
  LayoutDashboard,
  MessageSquare,
  Package,
  Store,
  User,
  Wrench,
} from 'lucide-react';

import { cn } from '@/utils/cn';
import { createClient } from '@/utils/supabase/client';

export function Sidebar() {
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Jobs', href: '/dashboard/jobs', icon: Wrench },
    { name: 'Inventory', href: '/dashboard/inventory', icon: Package },
    { name: 'Marketplace', href: '/dashboard/marketplace', icon: Store },
    {
      name: 'Communication',
      href: '/dashboard/communication',
      icon: MessageSquare,
    },
    { name: 'Notifications', href: '/dashboard/notifications', icon: Bell },
    { name: 'Pricing', href: '/dashboard/pricing', icon: DollarSign },
  ];
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
    <aside className='flex w-64 flex-col justify-between bg-white pt-10 shadow-sm'>
      <div className=''>
        <div className='mb-6 px-6'>
          <Link href='/' className='relative -top-1 text-2xl font-bold'>
            Kabeiri
            <span className='absolute -bottom-4 right-0 rounded-full rounded-tl-none bg-gradient-to-b from-purple-600 to-pink-600 px-2 py-0.5 text-xs font-semibold text-white'>
              BETA
            </span>
          </Link>
        </div>
        <nav className='space-y-1 p-3'>
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  pathname === item.href
                    ? 'bg-purple-50 text-purple-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                )}>
                <Icon className='size-5' />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <Link
        href='/account'
        className='group relative flex justify-end rounded-full pb-3 pr-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'>
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
            <User />
          </div>
        )}
      </Link>
    </aside>
  );
}
