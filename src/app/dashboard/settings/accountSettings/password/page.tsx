"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";

import { changePassword } from "@/app/dashboard/settings/accountSettings/actions";
import { changePasswordFormSchema } from "@/app/dashboard/settings/accountSettings/schema";
import { Button } from "@/components/ui/button";

export default function Page() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<changePasswordFormSchema>({
    resolver: zodResolver(changePasswordFormSchema),
  });

  const onSubmit: SubmitHandler<changePasswordFormSchema> = (data) => {
    console.log("Form data:", data);
    changePassword(data);
    router.push("/dashboard/settings/accountSettings");
  };

  return (
    <main className="p-8">
      <div className="mx-auto max-w-7xl">
        <button
          onClick={() => router.back()}
          className="hover:text-primary mb-8 flex cursor-pointer items-center"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Account Settings
        </button>
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Change Password</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">
              Current Password
            </label>
            <input
              type="password"
              {...register("currentPassword")}
              placeholder="Current Password"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none"
            />
            {errors.currentPassword && (
              <span className="text-sm text-red-500">
                {errors.currentPassword.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">New Password</label>
            <input
              type="password"
              {...register("newPassword")}
              placeholder="Current Password"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none"
            />
            {errors.newPassword && (
              <span className="text-sm text-red-500">
                {errors.newPassword.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">
              Confirm New Password
            </label>
            <input
              type="password"
              {...register("confirmNewPassword")}
              placeholder="Confirm New Password"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none"
            />
            {errors.confirmNewPassword && (
              <span className="text-sm text-red-500">
                {errors.confirmNewPassword.message}
              </span>
            )}
          </div>
          <Button
            type="submit"
            className="my-3 flex w-full flex-row items-center justify-center rounded-full bg-black py-3 text-white transition hover:bg-gray-800"
          >
            Submit
          </Button>
        </form>
      </div>
    </main>
  );
}
