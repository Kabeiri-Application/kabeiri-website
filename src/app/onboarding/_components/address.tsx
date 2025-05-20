"use client";

import { startTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { addressSchema, type AddressSchema } from "@/app/onboarding/schema";
import { useOnboardingStore } from "@/app/onboarding/store";

export function AddressForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addressInfo, setAddressInfo } = useOnboardingStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddressSchema>({
    resolver: zodResolver(addressSchema),
    defaultValues: addressInfo,
  });

  const onSubmit = (data: AddressSchema) => {
    startTransition(() => {
      setAddressInfo(data);

      // Navigate to next step
      const params = new URLSearchParams(searchParams);
      params.set("step", "shop");
      router.push(`?${params.toString()}`);
    });
  };

  const handleBack = () => {
    const params = new URLSearchParams(searchParams);
    params.set("step", "personal");
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
          {`What's your address?`}
        </h2>
      </div>
      <p className="text-muted-foreground">
        This information will be used to verify your identity.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="address" className="mb-2 block text-sm font-medium">
            Address
          </label>
          <input
            {...register("address")}
            type="text"
            id="address"
            className="border-border focus:ring-primary w-full rounded-lg border px-4 py-2 transition focus:border-transparent focus:ring-2"
          />
          {errors.address && (
            <p className="text-destructive mt-1 text-sm">
              {errors.address.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="city" className="mb-2 block text-sm font-medium">
            City
          </label>
          <input
            {...register("city")}
            type="text"
            id="city"
            className="border-border focus:ring-primary w-full rounded-lg border px-4 py-2 transition focus:border-transparent focus:ring-2"
          />
          {errors.city && (
            <p className="text-destructive mt-1 text-sm">
              {errors.city.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="state" className="mb-2 block text-sm font-medium">
            State
          </label>
          <input
            {...register("state")}
            type="text"
            id="state"
            className="border-border focus:ring-primary w-full rounded-lg border px-4 py-2 transition focus:border-transparent focus:ring-2"
          />
          {errors.state && (
            <p className="text-destructive mt-1 text-sm">
              {errors.state.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="zipCode" className="mb-2 block text-sm font-medium">
            Zip Code
          </label>
          <input
            {...register("zipCode")}
            type="text"
            id="zipCode"
            className="border-border focus:ring-primary w-full rounded-lg border px-4 py-2 transition focus:border-transparent focus:ring-2"
          />
          {errors.zipCode && (
            <p className="text-destructive mt-1 text-sm">
              {errors.zipCode.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-lg px-4 py-2 transition disabled:opacity-50"
        >
          Continue
        </button>
      </form>
    </div>
  );
}

export function AddressInfo() {
  return (
    <>
      <h2 className="mb-6 text-3xl font-semibold tracking-tight">
        Where are you located?
      </h2>

      <div className="text-muted-foreground mb-8 max-w-md text-lg">
        <div className="flex flex-col gap-4">
          <p>
            We need your address to verify your identity and ensure a secure
            experience.
          </p>
        </div>
      </div>
    </>
  );
}
