"use client";

import { startTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";

import { shopSchema, type ShopSchema } from "@/app/onboarding/schema";
import { useOnboardingStore } from "@/app/onboarding/store";

export function ShopForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { shopInfo, setShopInfo } = useOnboardingStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ShopSchema>({
    resolver: zodResolver(shopSchema),
    defaultValues: shopInfo,
  });

  const onSubmit = (data: ShopSchema) => {
    startTransition(() => {
      setShopInfo(data);

      // Navigate to review step
      const params = new URLSearchParams(searchParams);
      params.set("step", "review");
      router.push(`?${params.toString()}`);
    });
  };

  const handleBack = () => {
    const params = new URLSearchParams(searchParams);
    params.set("step", "address");
    router.push(`?${params.toString()}`);
  };

  const handleSkip = () => {
    const params = new URLSearchParams(searchParams);
    params.set("step", "review");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={handleBack}
          className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100"
        >
          <ArrowLeft className="size-5" />
        </button>
        <h2 className="text-2xl font-semibold tracking-tight">
          Tell us about your shop
        </h2>
      </div>
      <p className="text-gray-600">
        This information will be used to setup your shop profile.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="shopName" className="mb-2 block text-sm font-medium">
            Shop Name
          </label>
          <input
            {...register("shopName")}
            type="text"
            id="shopName"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-black"
          />
          {errors.shopName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.shopName.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="address" className="mb-2 block text-sm font-medium">
            Address
          </label>
          <input
            {...register("address")}
            id="address"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-black"
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-500">
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
            id="city"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-black"
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="state" className="mb-2 block text-sm font-medium">
            State
          </label>
          <input
            {...register("state")}
            id="state"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-black"
          />
          {errors.state && (
            <p className="mt-1 text-sm text-red-500">{errors.state.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="zipCode" className="mb-2 block text-sm font-medium">
            Zip Code
          </label>
          <input
            {...register("zipCode")}
            id="zipCode"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-black"
          />
          {errors.zipCode && (
            <p className="mt-1 text-sm text-red-500">
              {errors.zipCode.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="website" className="mb-2 block text-sm font-medium">
            Website
          </label>
          <input
            {...register("website")}
            id="website"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-black"
          />
          {errors.website && (
            <p className="mt-1 text-sm text-red-500">
              {errors.website.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium">
            Business Phone
          </label>
          <input
            {...register("phone")}
            type="tel"
            id="phone"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-black"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="businessPhotoUrl"
            className="mb-2 block text-sm font-medium"
          >
            Business Photo URL
          </label>
          <input
            {...register("businessPhotoUrl")}
            type="url"
            id="businessPhotoUrl"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-black"
          />
          {errors.businessPhotoUrl && (
            <p className="mt-1 text-sm text-red-500">
              {errors.businessPhotoUrl.message}
            </p>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleSkip}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-50"
          >
            Skip for now
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 rounded-lg bg-black px-4 py-2 text-white transition hover:bg-black/90 disabled:opacity-50"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

export function ShopInfo() {
  return (
    <>
      <h2 className="mb-6 text-3xl font-semibold tracking-tight">
        Setup your shop
      </h2>

      <div className="mb-8 max-w-md text-lg text-gray-600">
        <div className="flex flex-col gap-4">
          <p>
            Tell us about your shop so we can help you get started with your
            business.
          </p>
          <p>You can skip this step and set it up later if you prefer.</p>
        </div>
      </div>
    </>
  );
}
