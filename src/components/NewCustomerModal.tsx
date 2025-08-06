"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { createCustomer } from "@/app/dashboard/customers/actions";
import { customerFormSchema } from "@/app/dashboard/customers/schema";
import { getOrganizationId } from "@/app/dashboard/jobs/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface NewCustomerModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCustomerCreated?: () => void;
}

export function NewCustomerModal({
  isOpen,
  onOpenChange,
  onCustomerCreated,
}: NewCustomerModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<customerFormSchema>({
    resolver: zodResolver(customerFormSchema),
  });

  const onSubmit: SubmitHandler<customerFormSchema> = async (data) => {
    try {
      setIsSubmitting(true);

      const organizationId = await getOrganizationId();
      if (!organizationId) {
        throw new Error("Organization ID not found");
      }

      await createCustomer(data, organizationId);

      // Reset form and close modal
      reset();
      onOpenChange(false);

      // Notify parent component
      onCustomerCreated?.();
    } catch (error) {
      console.error("Error creating customer:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-full overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-gray-900 dark:text-white">
            Add New Customer
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              First Name
            </label>
            <input
              {...register("firstName")}
              placeholder="First Name"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            {errors.firstName && (
              <span className="text-sm text-red-500">
                {errors.firstName.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Last Name
            </label>
            <input
              {...register("lastName")}
              placeholder="Last Name"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            {errors.lastName && (
              <span className="text-sm text-red-500">
                {errors.lastName.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Phone Number
            </label>
            <input
              placeholder="Phone Number"
              type="tel"
              {...register("phoneNumber")}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            {errors.phoneNumber && (
              <span className="text-sm text-red-500">
                {errors.phoneNumber.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              {...register("email")}
              placeholder="Email"
              type="email"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Street Address
            </label>
            <input
              {...register("streetAddress")}
              placeholder="Street Address"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            {errors.streetAddress && (
              <span className="text-sm text-red-500">
                {errors.streetAddress.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              City
            </label>
            <input
              {...register("city")}
              placeholder="City"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            {errors.city && (
              <span className="text-sm text-red-500">
                {errors.city.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              State
            </label>
            <input
              {...register("state")}
              placeholder="State"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            {errors.state && (
              <span className="text-sm text-red-500">
                {errors.state.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Zip Code
            </label>
            <input
              {...register("zipCode")}
              placeholder="Zip Code"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            {errors.zipCode && (
              <span className="text-sm text-red-500">
                {errors.zipCode.message}
              </span>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="my-3 flex w-full flex-row items-center justify-center rounded-full bg-black py-3 text-white transition hover:bg-gray-800 disabled:opacity-50"
          >
            {isSubmitting ? "Creating..." : "Create Customer"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
