"use client";

import { useRouter } from "next/navigation";

import { ChevronRightIcon } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface SettingsCardProps {
  title: string;
  description: string;
  href: string;
}

export default function SettingsCard({
  title,
  description,
  href,
}: SettingsCardProps) {
  const router = useRouter();
  return (
    <Card
      onClick={() => router.push(href)}
      className="hover:bg-accent mt-2 cursor-pointer rounded-lg p-6 shadow transition"
    >
      <CardHeader className="flex items-center justify-between">
        <h2 className="mb-4 text-xl font-semibold">{title}</h2>
        <ChevronRightIcon className="text-muted-foreground h-5 w-5" />
      </CardHeader>
      <CardContent className="text-muted-foreground mb-2">
        {description}
      </CardContent>
    </Card>
  );
}
