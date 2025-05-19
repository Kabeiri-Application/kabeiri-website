import Link from "next/link";

import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("inline-block", className)}>
      <Link href="/" className="relative -top-1 text-xl font-bold">
        Kabeiri
        <span className="from-primary to-primary/80 absolute right-0 -bottom-4 scale-75 rounded-full rounded-tl-none bg-linear-to-b px-2 py-0.5 text-xs font-semibold">
          BETA
        </span>
      </Link>
    </div>
  );
}
