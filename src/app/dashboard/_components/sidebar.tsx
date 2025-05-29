"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  BellIcon,
  CogIcon,
  // CarIcon,
  LayoutDashboardIcon,
  PencilRulerIcon,
  UsersRoundIcon,
  WrenchIcon,
} from "lucide-react";

import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboardIcon },
    { name: "Jobs", href: "/dashboard/jobs", icon: WrenchIcon },
    { name: "Services", href: "/dashboard/services", icon: PencilRulerIcon },
    { name: "Vehicles", href: "/dashboard/vehicles", icon: CarIcon },
    { name: "Customers", href: "/dashboard/customers", icon: UsersRoundIcon },
    { name: "Notifications", href: "/dashboard/notifications", icon: BellIcon },
    { name: "Settings", href: "/dashboard/settings", icon: CogIcon },
  ];

  return (
    <aside className="bg-sidebar flex w-64 flex-col justify-between pt-10 shadow-xs">
      <div>
        <div className="mb-6 px-6">
          <Logo />
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
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                )}
              >
                <Icon className="size-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
