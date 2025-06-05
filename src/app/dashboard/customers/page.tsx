"use client";

import { useEffect, useState } from "react";

import { getCustomers } from "@/app/dashboard/customers/actions";
import { CustomerCard } from "@/app/dashboard/customers/components/customer-card";
import { getOrganizationId } from "@/app/dashboard/jobs/actions";
import { Customer } from "@/db/app.schema";

export default function Page() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [organization, setOrganization] = useState("");

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

  if (isLoading) {
    return (
      <main className="p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Customers</h1>
          </div>
          <div className="flex h-64 items-center justify-center">
            <div className="flex w-full flex-col items-center justify-center gap-4">
              <div className="border-t-primary flex h-20 w-20 animate-spin items-center justify-center rounded-full border-4 border-transparent text-4xl" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Customers</h1>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {customers.map((customer) => (
            <CustomerCard key={customer.id} {...customer} />
          ))}
        </div>
      </div>
    </main>
  );
}
