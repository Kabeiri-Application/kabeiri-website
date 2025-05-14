"use client";

import Image from "next/image";
import Link from "next/link";

import { User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function Header() {
  const { data: session } = authClient.useSession();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="flex cursor-progress items-center justify-center bg-linear-to-b from-green-700 to-yellow-500 py-2">
        <span className="font-bold text-white">
          🚧 This site is under construction 🚧
        </span>
      </div>
      <nav className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="relative -top-1 text-2xl font-bold">
            Kabeiri
            <span className="absolute right-0 -bottom-4 rounded-full rounded-tl-none bg-linear-to-b from-green-700 to-yellow-500 px-2 py-0.5 text-xs font-semibold text-white">
              BETA
            </span>
          </Link>

          {session ? (
            <div className="absolute left-1/2 -translate-x-1/2">
              <div className="hidden items-center gap-8 text-lg font-semibold text-gray-600 transition-colors md:flex">
                <Link href="/dashboard" className="hover:text-gray-900">
                  Dashboard
                </Link>
              </div>
            </div>
          ) : (
            <div className="absolute left-1/2 -translate-x-1/2">
              <div className="hidden items-center gap-8 text-lg font-semibold text-gray-600 transition-colors md:flex">
                <Link href="/#features" className="hover:text-gray-900">
                  Features
                </Link>
                <Link href="/pricing" className="hover:text-gray-900">
                  Pricing
                </Link>
                <Link href="/about" className="hover:text-gray-900">
                  About
                </Link>
              </div>
            </div>
          )}

          {session ? (
            <Link
              href="/account"
              className="group relative rounded-full focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:outline-hidden"
            >
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full object-cover transition-opacity group-hover:opacity-80"
                />
              ) : (
                <div className="flex size-10 items-center justify-center rounded-full bg-purple-100 text-purple-600 transition-colors group-hover:bg-purple-200">
                  <User />
                </div>
              )}
            </Link>
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
