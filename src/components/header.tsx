import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

import { User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";

export async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header className="bg-card fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md">
      <div className="from-primary to-primary/80 flex cursor-progress items-center justify-center bg-linear-to-b py-2">
        <span className="font-bold">🚧 This site is under construction 🚧</span>
      </div>

      <nav className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="relative -top-1 text-2xl font-bold">
            Kabeiri
            <span className="from-primary to-primary/80 absolute right-0 -bottom-4 rounded-full rounded-tl-none bg-linear-to-b px-2 py-0.5 text-xs font-semibold">
              BETA
            </span>
          </Link>

          <div className="text-muted-foreground absolute left-1/2 -translate-x-1/2 text-lg font-semibold transition-colors">
            <div className="hidden items-center gap-8 md:flex">
              {session ? (
                <Link href="/dashboard" className="hover:text-primary">
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link href="/#features" className="hover:text-primary">
                    Features
                  </Link>
                  <Link href="/pricing" className="hover:text-primary">
                    Pricing
                  </Link>
                  <Link href="/about" className="hover:text-primary">
                    About
                  </Link>
                </>
              )}
            </div>
          </div>

          {session ? (
            <Link
              href="/account"
              className="group ring-ring relative rounded-full focus:ring-2 focus:outline-hidden"
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
                <div className="bg-primary group-hover:bg-primary/80 flex size-10 items-center justify-center rounded-full transition-colors">
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
