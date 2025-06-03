"use client";

import { useEffect, useState } from "react";

import { getCustomers } from "@/app/dashboard/customers/actions";
import { CustomerCard } from "@/app/dashboard/customers/components/customer-card";
import { getOrganizationId } from "@/app/dashboard/jobs/actions";
import { Profile } from "@/db/app.schema";

export default function Page() {
  const [customers, setCustomers] = useState<Profile[]>([]);
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
              <CustomerCard key={customer.id} {...customer} />
            ))
          ) : (
            <p>No customers found.</p>
          )}
        </div>
      </div>
    </main>
  );
}
