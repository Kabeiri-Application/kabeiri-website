"use client";

import Link from "next/link";

import {
  ArrowRightIcon,
  DownloadIcon,
  ShieldCheckIcon,
  ShoppingCartIcon,
  TruckIcon,
  UsersIcon,
  WorkflowIcon,
} from "lucide-react";

import { CTA } from "@/components/cta";
import { FeatureCard } from "@/components/feature-card";
import { Button } from "@/components/ui/button";
import { scrollToElement } from "@/lib/utils";

export default function Home() {
  return (
    <>
      <section className="flex min-h-screen items-center justify-center px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-5xl font-bold tracking-tight sm:mb-8 sm:text-6xl lg:text-7xl">
              The Future of
              <br />
              <span className="from-primary to-primary/80 bg-linear-to-r bg-clip-text text-transparent">
                Automotive Repair
              </span>
            </h2>
            <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg leading-relaxed sm:mb-12 sm:text-xl md:text-2xl">
              Revolutionizing the automotive repair experience for mechanics,
              repair shops, and vehicle owners alike
            </p>
            <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
              <Button asChild>
                <Link href="/signup">Join the Revolution</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="group gap-1"
                onClick={() => scrollToElement("#features")}
              >
                <Link href="/#features" scroll={false}>
                  Explore the Platform
                  <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="scroll-mt-16 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={
                <div className="flex size-10 items-center justify-center rounded-xl bg-blue-100 sm:size-12 dark:bg-blue-900">
                  <WorkflowIcon className="size-5 text-blue-600 sm:size-6 dark:text-blue-400" />
                </div>
              }
              title="Digital Workflows"
              description="Streamlined operations for mechanics and workshops with smart scheduling, digital documentation, and automated reporting."
            />

            <FeatureCard
              icon={
                <div className="flex size-10 items-center justify-center rounded-xl bg-purple-100 sm:size-12 dark:bg-purple-900">
                  <TruckIcon className="size-5 text-purple-600 sm:size-6 dark:text-purple-400" />
                </div>
              }
              title="Inventory Management System"
              description="Advanced real-time Inventory management and procurement system for automotive parts and supplies."
            />

            <FeatureCard
              icon={
                <div className="flex size-10 items-center justify-center rounded-xl bg-pink-100 sm:size-12 dark:bg-pink-900">
                  <DownloadIcon className="size-5 text-pink-600 sm:size-6 dark:text-pink-400" />
                </div>
              }
              title="Open APIs"
              description="Build innovative solutions with our comprehensive API suite, enabling seamless integration with your existing systems."
            />

            <FeatureCard
              icon={
                <div className="flex size-10 items-center justify-center rounded-xl bg-green-100 sm:size-12 dark:bg-green-900">
                  <ShoppingCartIcon className="size-5 text-green-600 sm:size-6 dark:text-green-400" />
                </div>
              }
              title="Marketplace"
              description="Access a thriving ecosystem of third-party apps, services, and automotive solutions all in one place."
            />

            <FeatureCard
              icon={
                <div className="flex size-10 items-center justify-center rounded-xl bg-orange-100 sm:size-12 dark:bg-orange-900">
                  <UsersIcon className="size-5 text-orange-600 sm:size-6 dark:text-orange-400" />
                </div>
              }
              title="Multi-User Access"
              description="Collaborate seamlessly between car owners, mechanics, and service providers with role-based access control."
            />

            <FeatureCard
              icon={
                <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-100 sm:size-12 dark:bg-indigo-900">
                  <ShieldCheckIcon className="size-5 text-indigo-600 sm:size-6 dark:text-indigo-400" />
                </div>
              }
              title="Enterprise Security"
              description="Military-grade security protocols and compliance measures to protect your sensitive automotive data."
            />
          </div>
        </div>
      </section>

      <CTA className="mb-24" />
    </>
  );
}
