"use client";

import { useState } from "react";

import { CheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(
    "monthly",
  );

  const plans: Omit<PricingCardProps, "billingPeriod">[] = [
    {
      title: "Basic",
      description: "Perfect for individual car owners and enthusiasts",
      price: {
        monthly: "TBD",
        yearly: "TBD",
      },
      features: [
        "Real-time vehicle diagnostics",
        "Maintenance history tracking",
        "Access to marketplace",
        "Basic repair estimates",
        "Email support",
      ],
    },
    {
      title: "Pro",
      description: "Ideal for professional mechanics and small workshops",
      price: {
        monthly: "TBD",
        yearly: "TBD",
      },
      features: [
        "Everything in Basic, plus:",
        "Advanced AI diagnostics",
        "Digital workflow tools",
        "Customer management",
        "Priority email support",
        "API access (100 calls/day)",
      ],
      highlighted: true,
    },
    {
      title: "Business",
      description: "For growing auto repair workshops and dealerships",
      price: {
        monthly: "TBD",
        yearly: "TBD",
      },
      features: [
        "Everything in Pro, plus:",
        "Unlimited diagnostics",
        "Multi-user access (up to 10)",
        "Advanced analytics",
        "Priority phone support",
        "API access (1000 calls/day)",
      ],
    },
    {
      title: "Enterprise",
      description: "Custom solutions for large fleets and manufacturers",
      features: [
        "Everything in Business, plus:",
        "Unlimited users",
        "Custom integrations",
        "Dedicated API access",
        "Custom features",
        "24/7 dedicated support",
      ],
    },
  ] as const;

  return (
    <section className="flex min-h-screen items-center justify-center py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            Simple pricing for
            <br />
            <span className="from-primary to-primary/80 bg-linear-to-r bg-clip-text text-transparent">
              every automotive business
            </span>
          </h1>

          <div className="mt-8 flex justify-center">
            <div className="relative">
              <div className="from-primary to-primary/80 absolute -top-4 -right-10 z-10 rounded-full rounded-bl-none bg-linear-to-b px-3 py-1 text-xs font-semibold shadow-lg">
                Save TBD%
              </div>
              <div className="bg-card relative inline-flex rounded-full border p-1 shadow-xs">
                <div
                  className={cn(
                    "from-primary to-primary/80 absolute inset-y-1 w-[120px] rounded-full bg-linear-to-r shadow-xs transition-transform duration-200 ease-in-out",
                    billingPeriod === "yearly" && "translate-x-[120px]",
                  )}
                  aria-hidden="true"
                />
                <button
                  type="button"
                  onClick={() => setBillingPeriod("monthly")}
                  className={cn(
                    "relative w-[120px] cursor-pointer rounded-full py-2 text-sm font-medium transition-colors duration-200",
                    billingPeriod === "monthly"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setBillingPeriod("yearly")}
                  className={cn(
                    "relative w-[120px] cursor-pointer rounded-full py-2 text-sm font-medium transition-colors duration-200",
                    billingPeriod === "yearly"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  Yearly
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <PricingCard
              key={plan.title}
              {...plan}
              billingPeriod={billingPeriod}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

type PricingCardProps = {
  title: string;
  description: string;
  price?: {
    monthly: string;
    yearly: string;
  };
  features: string[];
  highlighted?: boolean;
  billingPeriod: "monthly" | "yearly";
};

const PricingCard = ({
  title,
  description,
  price,
  features,
  highlighted = false,
  billingPeriod,
}: PricingCardProps) => {
  const displayPrice = price
    ? billingPeriod === "monthly"
      ? price.monthly
      : price.yearly
    : "Contact Us";

  return (
    <div
      className={cn(
        "bg-card relative flex flex-col justify-between rounded-2xl border p-8 shadow-xs transition-all duration-200",
        highlighted &&
          "border-primary ring-primary bg-card scale-105 shadow-md ring-1",
      )}
    >
      {highlighted && (
        <div className="bg-primary absolute -top-4 right-8 rounded-full px-3 py-1 text-sm font-medium shadow-xs">
          Most Popular
        </div>
      )}
      <div>
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-muted-foreground mt-2 min-h-[48px] text-sm">
          {description}
        </p>
        <p className="mt-4">
          <span className="text-4xl font-bold">{displayPrice}</span>
          {price && (
            <span className="text-muted-foreground font-semibold">
              /{billingPeriod === "monthly" ? "mo" : "yr"}
            </span>
          )}
        </p>
        <ul className="text-muted-foreground mt-8 space-y-4 text-sm">
          {features.map((feature) => (
            <li key={feature} className="flex items-center">
              <CheckIcon className="text-primary mr-3 size-5" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <Button
        className="mt-8 w-full"
        variant={highlighted ? "default" : "outline"}
        disabled
      >
        {!price ? "Contact Sales" : "Get Started"}
      </Button>
    </div>
  );
};
