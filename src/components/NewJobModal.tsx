"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";

import {
  createJob,
  getCustomers,
  getEmployees,
  getServices,
  getVehicles,
  getOrganizationId,
} from "@/app/dashboard/jobs/actions";
import {
  jobFormSchema,
  JobStatus,
  type Customer,
  type Employee,
} from "@/app/dashboard/jobs/schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Car, Service } from "@/db/app.schema";

interface NewJobModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onJobCreated?: () => void;
}

/**
 * Reusable modal component for creating new jobs
 * Can be used across different parts of the application
 */
export function NewJobModal({ isOpen, onOpenChange, onJobCreated }: NewJobModalProps) {
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [organization, setOrganization] = useState("");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [vehicles, setVehicles] = useState<Car[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<jobFormSchema>({
    resolver: zodResolver(jobFormSchema),
  });

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const orgId = await getOrganizationId();
        if (!orgId) {
          console.error("No organization found");
          return;
        }
        
        setOrganization(orgId);
        
        // Fetch other data with organizationId
        const [employeesData, servicesData, customersData] = await Promise.all([
          getEmployees(orgId),
          getServices(orgId),
          getCustomers(orgId),
        ]);
        
        setEmployees(employeesData as Employee[]);
        setServices(servicesData as Service[]);
        setCustomers(customersData as Customer[]);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    if (isOpen) {
      fetchInitialData();
    }
  }, [isOpen]);

  // Fetch vehicles when customer changes
  useEffect(() => {
    if (!selectedCustomer) {
      setVehicles([]);
      return;
    }

    const fetchVehicles = async () => {
      try {
        const data = await getVehicles(selectedCustomer);
        setVehicles(data as Car[]);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, [selectedCustomer]);

  const onSubmit: SubmitHandler<jobFormSchema> = async (data) => {
    try {
      await createJob({
        ...data,
        due_date: new Date(data.due_date),
        organization,
        status: JobStatus.PENDING,
      });
      
      // Reset form and close modal
      reset();
      setSelectedCustomer("");
      onOpenChange(false);
      
      // Notify parent component that job was created
      if (onJobCreated) {
        onJobCreated();
      }
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Reset form when closing
      reset();
      setSelectedCustomer("");
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-full overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-gray-900 dark:text-white">
            Create a Job
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title
            </label>
            <input
              type="text"
              {...register("title")}
              className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 shadow-xs focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-hidden dark:bg-gray-800 dark:text-white"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              {...register("description")}
              rows={3}
              className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 shadow-xs focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-hidden dark:bg-gray-800 dark:text-white"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          {/* Customer Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Customer
            </label>
            <select
              {...register("customer", {
                onChange: (e) => setSelectedCustomer(e.target.value),
              })}
              className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 shadow-xs focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-hidden dark:bg-gray-800 dark:text-white"
            >
              <option value="">Select a Customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.firstName} {customer.lastName}
                </option>
              ))}
            </select>
            {errors.customer && (
              <p className="mt-1 text-sm text-red-600">{errors.customer.message}</p>
            )}
          </div>

          {/* Vehicle Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Vehicle
            </label>
            <select
              {...register("vehicle")}
              disabled={!selectedCustomer}
              className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 shadow-xs focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-hidden disabled:bg-gray-100 disabled:cursor-not-allowed dark:bg-gray-800 dark:text-white dark:disabled:bg-gray-700"
            >
              <option value="">Select a Vehicle</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.year} {vehicle.make} {vehicle.model} ({vehicle.vin})
                </option>
              ))}
            </select>
            {errors.vehicle && (
              <p className="mt-1 text-sm text-red-600">{errors.vehicle.message}</p>
            )}
          </div>

          {/* Service Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Service
            </label>
            <select
              {...register("service")}
              className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 shadow-xs focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-hidden dark:bg-gray-800 dark:text-white"
            >
              <option value="">Select a Service</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.title} - ${service.price}
                </option>
              ))}
            </select>
            {errors.service && (
              <p className="mt-1 text-sm text-red-600">{errors.service.message}</p>
            )}
          </div>

          {/* Assigned To Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Assigned To
            </label>
            <select
              {...register("assigned_to")}
              className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 shadow-xs focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-hidden dark:bg-gray-800 dark:text-white"
            >
              <option value="">Select an Employee</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.firstName} {employee.lastName}
                </option>
              ))}
            </select>
            {errors.assigned_to && (
              <p className="mt-1 text-sm text-red-600">{errors.assigned_to.message}</p>
            )}
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Due Date
            </label>
            <input
              type="date"
              {...register("due_date")}
              className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 shadow-xs focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-hidden dark:bg-gray-800 dark:text-white"
            />
            {errors.due_date && (
              <p className="mt-1 text-sm text-red-600">{errors.due_date.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={() => handleOpenChange(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Create Job
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
