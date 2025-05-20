"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  BellIcon,
  DollarSignIcon,
  LayoutDashboardIcon,
  MessageSquareIcon,
  PackageIcon,
  PencilRulerIcon,
  StoreIcon,
  UserIcon,
  WrenchIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboardIcon },
    { name: "Jobs", href: "/dashboard/jobs", icon: WrenchIcon },
    { name: "Services", href: "/dashboard/services", icon: PencilRulerIcon },

    { name: "Inventory", href: "/dashboard/inventory", icon: PackageIcon },
    { name: "Marketplace", href: "/dashboard/marketplace", icon: StoreIcon },
    {
      name: "Communication",
      href: "/dashboard/communication",
      icon: MessageSquareIcon,
    },
    { name: "Notifications", href: "/dashboard/notifications", icon: BellIcon },
    { name: "Pricing", href: "/dashboard/pricing", icon: DollarSignIcon },
  ];

  return (
    <aside className="flex w-64 flex-col justify-between bg-white pt-10 shadow-xs">
      <div className="">
        <div className="mb-6 px-6">
          <Link href="/" className="relative -top-1 text-2xl font-bold">
            Kabeiri
            <span className="absolute right-0 -bottom-4 rounded-full rounded-tl-none bg-linear-to-b from-purple-600 to-pink-600 px-2 py-0.5 text-xs font-semibold text-white">
              BETA
            </span>
          </Link>
        </div>
        <nav className="space-y-1 p-3">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-purple-50 text-purple-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                )}
              >
                <Icon className="size-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex size-10 items-center justify-center rounded-full bg-purple-100 text-purple-600 transition-colors group-hover:bg-purple-200">
        <UserIcon className="size-5" />
      </div>
    </aside>
  );
}
