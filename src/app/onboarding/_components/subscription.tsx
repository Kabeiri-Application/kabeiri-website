"use client";

import { startTransition, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { useOnboardingStore } from "@/app/onboarding/store";

import { subscriptionSchema, type SubscriptionSchema } from "../schema";

export function SubscriptionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { subscriptionInfo, setSubscriptionInfo } = useOnboardingStore();
  const [selectedTier, setSelectedTier] = useState("Free");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SubscriptionSchema>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: subscriptionInfo,
  });

  const onSubmit = (data: SubscriptionSchema) => {
    startTransition(() => {
      setSubscriptionInfo(data);

      // Navigate to review step
      const params = new URLSearchParams(searchParams);
      params.set("step", "review");
      router.push(`?${params.toString()}`);
    });
  };

  const handleBack = () => {
    const params = new URLSearchParams(searchParams);
    params.set("step", "shop");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={handleBack}
          className="text-muted-foreground hover:bg-muted rounded-lg p-2 transition"
        >
          <ArrowLeftIcon className="size-5" />
        </button>
        <h2 className="text-2xl font-semibold tracking-tight">
          {`Choose your plan`}
        </h2>
      </div>
      <p className="text-muted-foreground">
        This information will be used to verify your identity.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="subscription-tier" className="mb-2 block font-medium">
          Subscription Tier
        </label>
        <select
          {...register("tier")}
          id="subscription-tier"
          className="w-full rounded-md border px-3 py-2"
          value={selectedTier}
          onChange={(e) => setSelectedTier(e.target.value)}
          defaultValue={subscriptionInfo.tier}
        >
          <option value="Free">Free</option>
          <option value="Pro">Pro</option>
          <option value="Enterprise">Enterprise</option>
        </select>
        {errors.tier && (
          <p className="text-destructive mt-1 text-sm">{errors.tier.message}</p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary text-primary-foreground hover:bg-primary/90 mt-2 w-full rounded-md px-4 py-2"
        >
          Continue
        </button>
      </form>
    </div>
  );
}

export function SubscriptionInfo() {
  return (
    <>
      <h2 className="mb-6 text-3xl font-semibold tracking-tight">
        Choose your plan. Cancel whenever you want.
      </h2>

      <div className="text-muted-foreground mb-8 max-w-md text-lg">
        <div className="flex flex-col gap-4">
          <p>Pick the plan that&apos;s right for you.</p>
        </div>
      </div>
    </>
  );
}
