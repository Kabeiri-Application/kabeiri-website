"use client";

import { useRouter } from "next/navigation";

import { ArrowLeftIcon } from "lucide-react";

export default function SettingPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <main className="p-8">
      <div className="mx-auto max-w-7xl">
        <button
          onClick={() => router.back()}
          className="hover:text-primary mb-8 flex cursor-pointer items-center"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Settings
        </button>
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">{title}</h1>
        </div>
        {children}
      </div>
    </main>
  );
}
