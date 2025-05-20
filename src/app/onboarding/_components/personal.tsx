"use client";

import { startTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, UserIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { personalSchema, type PersonalSchema } from "@/app/onboarding/schema";
import { useOnboardingStore } from "@/app/onboarding/store";

export function PersonalForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { personalInfo, setPersonalInfo } = useOnboardingStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PersonalSchema>({
    resolver: zodResolver(personalSchema),
    defaultValues: personalInfo,
  });

  const onSubmit = (data: PersonalSchema) => {
    startTransition(() => {
      setPersonalInfo(data);

      // Navigate to next step
      const params = new URLSearchParams(searchParams);
      params.set("step", "address");
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100"
        >
          <ArrowLeftIcon className="size-5" />
        </button>
        <h2 className="text-2xl font-semibold tracking-tight">
          Tell us about yourself
        </h2>
      </div>
      <p className="text-gray-600">
        Your profile will be used to identify you.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex justify-center">
          <UserIcon className="size-24" />
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="mb-2 block text-sm font-medium"
              >
                First Name
              </label>
              <input
                {...register("firstName")}
                type="text"
                id="firstName"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-black"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="mb-2 block text-sm font-medium"
              >
                Last Name
              </label>
              <input
                {...register("lastName")}
                type="text"
                id="lastName"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-black"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-black"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="phoneNumber"
              className="mb-2 block text-sm font-medium"
            >
              Phone Number
            </label>
            <input
              {...register("phoneNumber")}
              type="text"
              id="phoneNumber"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-black"
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium"
            >
              Username
            </label>
            <input
              {...register("username")}
              type="text"
              id="username"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-black"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-500">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium"
            >
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              id="password"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-black"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium"
            >
              Confirm Password
            </label>
            <input
              {...register("confirmPassword")}
              type="password"
              id="confirmPassword"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-black"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-black px-4 py-2 text-white transition hover:bg-black/90 disabled:opacity-50"
        >
          Continue
        </button>
      </form>
    </div>
  );
}

export function PersonalInfo() {
  return (
    <>
      <h2 className="mb-6 text-3xl font-semibold tracking-tight">
        Create your account
      </h2>

      <div className="mb-8 max-w-md text-lg text-gray-600">
        <div className="flex flex-col gap-4">
          <p>Sign up and create your profile to get started with Kabeiri.</p>
          <p>{`We'll help you set up your account step by step.`}</p>
        </div>
      </div>
    </>
  );
}
