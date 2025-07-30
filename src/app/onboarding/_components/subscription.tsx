"use client";

import { startTransition, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, CheckIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { useOnboardingStore } from "@/app/onboarding/store";
import { getTierPricing } from "@/lib/polar-checkout";

import { subscriptionSchema, type SubscriptionSchema } from "../schema";

export function SubscriptionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { subscriptionInfo, setSubscriptionInfo } = useOnboardingStore();
  const [selectedTier, setSelectedTier] = useState<"Free" | "Pro" | "Enterprise">(subscriptionInfo.tier || "Free");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pricing, setPricing] = useState<Record<string, any> | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SubscriptionSchema>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: subscriptionInfo,
  });

  useEffect(() => {
    const loadPricing = async () => {
      const pricingData = await getTierPricing();
      setPricing(pricingData);
    };
    loadPricing();
  }, []);

  const onSubmit = () => {
    startTransition(() => {
      setSubscriptionInfo({ tier: selectedTier });

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

  const handleTierSelect = (tier: "Free" | "Pro" | "Enterprise") => {
    setSelectedTier(tier);
    setValue("tier", tier);
  };

  const formatPrice = (price: number, currency: string) => {
    if (price === 0) return "Free";
    return `$${(price / 100).toFixed(2)} ${currency}`;
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
          Choose your plan
        </h2>
      </div>
      <p className="text-muted-foreground">
        Select the plan that best fits your business needs.
      </p>

      {pricing && (
        <div className="grid gap-6 md:grid-cols-3">
          {Object.entries(pricing).map(([tier, details]) => (
            <div
              key={tier}
              className={`relative cursor-pointer rounded-lg border-2 p-6 transition-all hover:shadow-md ${
                selectedTier === tier
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => handleTierSelect(tier as "Free" | "Pro" | "Enterprise")}
            >
              {selectedTier === tier && (
                <div className="absolute right-4 top-4">
                  <CheckIcon className="size-5 text-primary" />
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold">{details.name}</h3>
                  <p className="text-muted-foreground text-sm">{details.description}</p>
                </div>
                
                <div className="space-y-1">
                  <div className="text-3xl font-bold">
                    {formatPrice(details.price, details.currency)}
                  </div>
                  {details.interval && (
                    <p className="text-muted-foreground text-sm">per {details.interval}</p>
                  )}
                </div>
                
                <ul className="space-y-2">
                  {details.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CheckIcon className="size-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("tier")} value={selectedTier} />
        {errors.tier && (
          <p className="text-destructive mb-4 text-sm">{errors.tier.message}</p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-md px-4 py-2 transition disabled:opacity-50"
        >
          {isSubmitting ? "Processing..." : "Continue"}
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
