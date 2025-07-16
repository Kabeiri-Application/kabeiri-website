"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";

import { addUser } from "@/app/dashboard/settings/adminSettings/actions";
import { Button } from "@/components/ui/button";

import { addUserFormSchema } from "../schema";

export default function Page() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<addUserFormSchema>({
    resolver: zodResolver(addUserFormSchema),
  });

  const onSubmit: SubmitHandler<addUserFormSchema> = (data) => {
    console.log("Form data:", data);
    addUser(data);
  };

  return (
    <main className="p-8">
      <div className="mx-auto max-w-7xl">
        <button
          onClick={() => router.back()}
          className="hover:text-primary mb-8 flex cursor-pointer items-center"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Manage Users
        </button>
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Add User</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              {...register("name")}
              placeholder="Full Name"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none"
            />
            {errors.name && (
              <span className="text-sm text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              {...register("email")}
              placeholder="Email Address"
              type="email"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none"
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              {...register("password")}
              placeholder="Password"
              type="password"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none"
            />
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Role</label>
            <select
              {...register("role")}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none"
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            {errors.role && (
              <span className="text-sm text-red-500">
                {errors.role.message}
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
