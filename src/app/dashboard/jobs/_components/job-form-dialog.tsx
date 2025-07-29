"use client";

import React, { useEffect } from "react";

import type { FieldErrors, UseFormRegister } from "react-hook-form";

import type { Customer, Employee } from "@/app/dashboard/jobs/schema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Car, Service } from "@/db/app.schema";

import type { JobFormData } from "../_types/job.types";

interface JobFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  customers: Customer[];
  employees: Employee[];
  services: Service[];
  vehicles: Car[];
  selectedCustomer: string;
  watchedCustomer: string;
  onSubmit: (e: React.FormEvent) => void;
  register: UseFormRegister<JobFormData>;
  errors: FieldErrors<JobFormData>;
  setSelectedCustomer: (value: string) => void;
}

export function JobFormDialog({
  isOpen,
  onClose,
  customers,
  employees,
  services,
  vehicles,
  selectedCustomer,
  watchedCustomer,
  onSubmit,
  register,
  errors,
  setSelectedCustomer,
}: JobFormDialogProps) {
  useEffect(() => {
    if (watchedCustomer && watchedCustomer !== selectedCustomer) {
      setSelectedCustomer(watchedCustomer);
    }
  }, [watchedCustomer, selectedCustomer, setSelectedCustomer]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-full overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Create New Job</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Job Title
            </label>
            <input
              {...register("title")}
              type="text"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-xs focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-hidden dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            {errors.title && (
              <span className="text-sm text-red-500 dark:text-red-400">
                {errors.title.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Customer
            </label>
            <select
              {...register("customer")}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-xs focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-hidden dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            >
              <option value="">Select a customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.firstName} {customer.lastName}
                </option>
              ))}
            </select>
            {errors.customer && (
              <span className="text-sm text-red-500 dark:text-red-400">
                {errors.customer.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Vehicle
            </label>
            <select
              disabled={!selectedCustomer}
              {...register("vehicle")}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-xs focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-hidden disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            >
              <option value="">Select a vehicle</option>
              {vehicles.length > 0 ? (
                vehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </option>
                ))
              ) : (
                <option value="">No vehicles found</option>
              )}
            </select>
            {errors.vehicle && (
              <span className="text-sm text-red-500 dark:text-red-400">
                {errors.vehicle.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Service
            </label>
            <select
              {...register("service")}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-xs focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-hidden dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            >
              <option value="">Select a service</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.title}
                </option>
              ))}
            </select>
            {errors.service && (
              <span className="text-sm text-red-500 dark:text-red-400">
                {errors.service.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Due Date
            </label>
            <input
              min={new Date().toISOString().split("T")[0]}
              {...register("due_date")}
              type="date"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-xs focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-hidden dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            {errors.due_date && (
              <span className="text-sm text-red-500 dark:text-red-400">
                {errors.due_date.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Assigned To
            </label>
            <select
              {...register("assigned_to")}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-xs focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-hidden dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            >
              <option value="">Select a mechanic</option>
              {employees.map((mechanic) => (
                <option key={mechanic.id} value={mechanic.id}>
                  {mechanic.firstName} {mechanic.lastName}
                </option>
              ))}
            </select>
            {errors.assigned_to && (
              <span className="text-sm text-red-500 dark:text-red-400">
                {errors.assigned_to.message}
              </span>
            )}
          </div>

          <div className="my-3 flex gap-3">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Create Job
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
