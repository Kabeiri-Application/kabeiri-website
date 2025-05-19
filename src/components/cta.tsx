import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CTA({ className }: { className?: string }) {
  return (
    <section className={cn("mx-auto max-w-7xl px-4 sm:px-6", className)}>
      <div className="from-primary/80 to-primary/50 rounded-2xl bg-linear-to-r p-8 text-center sm:rounded-3xl sm:p-12 md:p-20">
        <h2 className="mb-4 text-3xl font-bold sm:mb-6 sm:text-4xl">
          Join the Automotive Revolution
        </h2>
        <p className="text-muted-foreground mx-auto mb-6 max-w-2xl text-base sm:mb-8 sm:text-lg">
          {`Whether you're a car owner, mechanic, or developer, be part of
          the platform that's reshaping the future of automotive care.`}
        </p>
        <div className="flex flex-col justify-center gap-3 sm:gap-4 md:flex-row">
          <Button variant="default" className="w-full md:w-auto" asChild>
            <Link href="/signup">Get started now →</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="mailto:partners@kabeiri.app">Become a Partner</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
