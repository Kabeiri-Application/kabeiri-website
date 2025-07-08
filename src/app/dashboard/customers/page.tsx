"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

import { addCustomer, getCustomers } from "@/app/dashboard/customers/actions";
import { CustomerCard } from "@/app/dashboard/customers/components/customer-card";
import { customerFormSchema } from "@/app/dashboard/customers/schema";
import { getOrganizationId } from "@/app/dashboard/jobs/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Customer } from "@/db/app.schema";

export default function Page() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [organization, setOrganization] = useState("");
  const [modalStatus, setModalStatus] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<customerFormSchema>({
    resolver: zodResolver(customerFormSchema),
  });

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const organizationId = await getOrganizationId();
      if (!organizationId) {
        throw new Error("Organization ID not found");
      }
      setOrganization(organizationId);

      const customers = await getCustomers(organizationId);
      if (!customers) {
        throw new Error("No customers found for the organization");
      }

      setCustomers(customers);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log("Customers:", customers);

  const onSubmit: SubmitHandler<customerFormSchema> = (data) => {
    console.log("Form data:", data);
    addCustomer(data, organization);
    setModalStatus(false);
    fetchData();
  };

  return (
    <main className="p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Customers</h1>
          <Button
            onClick={() => setModalStatus(true)}
            className="flex flex-row items-center rounded-full bg-black px-4 py-2 text-white transition hover:bg-gray-800"
          >
            <PlusIcon className="mr-2 size-5" />
            New Customer
          </Button>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="border-t-primary flex h-20 w-20 animate-spin items-center justify-center rounded-full border-4 border-transparent text-4xl" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {customers.map((customer) => (
              <CustomerCard key={customer.id} {...customer} />
            ))}
          </div>
        )}
      </div>
      <Dialog open={modalStatus} onOpenChange={setModalStatus}>
        <DialogContent className="max-h-full overflow-y-scroll">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-gray-900">
              Create a Service
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                {...register("firstName")}
                placeholder="First Name"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none"
              />
              {errors.firstName && (
                <span className="text-sm text-red-500">
                  {errors.firstName.message}
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                {...register("lastName")}
                placeholder="Last Name"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none"
              />
              {errors.lastName && (
                <span className="text-sm text-red-500">
                  {errors.lastName.message}
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                placeholder="Phone Number"
                type="phone"
                min={0.0}
                step={0.01}
                {...register("phoneNumber")}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none"
              />
              {errors.phoneNumber && (
                <span className="text-sm text-red-500">
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                {...register("email")}
                placeholder="Email"
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
              <label className="block text-sm font-medium">
                Street Address
              </label>
              <input
                {...register("streetAddress")}
                placeholder="Street Address"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none"
              />
              {errors.streetAddress && (
                <span className="text-sm text-red-500">
                  {errors.streetAddress.message}
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">City</label>
              <input
                {...register("city")}
                placeholder="City"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none"
              />
              {errors.city && (
                <span className="text-sm text-red-500">
                  {errors.city.message}
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">State</label>
              <input
                {...register("state")}
                placeholder="State"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none"
              />
              {errors.state && (
                <span className="text-sm text-red-500">
                  {errors.state.message}
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Zip Code</label>
              <input
                {...register("zipCode")}
                placeholder="Zip Code"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-none"
              />
              {errors.zipCode && (
                <span className="text-sm text-red-500">
                  {errors.zipCode.message}
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
        </DialogContent>
      </Dialog>
    </main>
  );
}
