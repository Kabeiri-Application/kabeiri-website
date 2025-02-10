'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Bell,
  DollarSign,
  LayoutDashboard,
  MessageSquare,
  Package,
  Store,
  Wrench,
} from 'lucide-react';

import { cn } from '@/utils/cn';

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

  return (
    <aside className='w-64 bg-white shadow-sm'>
      <div className='sticky top-32'>
        <div className='mb-6 px-6'>
          <h2 className='text-2xl font-bold'>Mech Manager</h2>
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
    </aside>
  );
}
