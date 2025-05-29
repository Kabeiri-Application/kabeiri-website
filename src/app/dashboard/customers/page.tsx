"use client";

import { useEffect, useState } from "react";

import { getCustomers } from "@/app/dashboard/customers/actions";
import { getOrganizationId } from "@/app/dashboard/jobs/actions";
import { type Customer } from "@/app/dashboard/jobs/schema";

export default function Page() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [organization, setOrganization] = useState("");

  const fetchData = async () => {
    try {
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
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log("Customers:", customers);

  return (
    <main className="p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Customers</h1>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {customers.length > 0 ? (
            customers.map((customer) => (
              <div
                key={customer.id}
                className="rounded-lg border p-4 shadow-sm transition-shadow hover:cursor-pointer hover:shadow-md"
              >
                <h2 className="text-xl font-semibold">
                  {customer.firstName + " " + customer.lastName}
                </h2>
                <p>{customer.streetAddress}</p>
              </div>
            ))
          ) : (
            <p>No customers found.</p>
          )}
        </div>
      </div>
    </main>
  );
}
