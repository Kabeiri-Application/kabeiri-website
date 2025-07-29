import { useCallback, useEffect, useState } from "react";

import {
  getCustomers,
  getEmployees,
  getJobs,
  getOrganizationId,
  getServices,
} from "@/app/dashboard/jobs/actions";
import type { Customer, Employee } from "@/app/dashboard/jobs/schema";
import type { Car, Job, Service } from "@/db/app.schema";

import type { JobsData } from "../_types/job.types";

export function useJobsData() {
  const [data, setData] = useState<JobsData>({
    jobs: [],
    customers: [],
    employees: [],
    services: [],
    vehicles: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Get organization ID first
      const organizationId = await getOrganizationId();
      if (!organizationId) {
        throw new Error("Organization ID not found");
      }

      const [jobs, customers, employees, services] = await Promise.all([
        getJobs(organizationId),
        getCustomers(organizationId),
        getEmployees(organizationId),
        getServices(organizationId),
      ]);

      // getVehicles needs a specific customerId, so we'll set it as empty for now
      // It will be populated when a customer is selected in the form
      const vehicles: Car[] = [];

      setData({
        jobs: jobs as Job[],
        customers: customers as Customer[],
        employees: employees as Employee[],
        services: services as Service[],
        vehicles: vehicles as Car[],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    void fetchData();
  }, [fetchData]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    error,
    refetch,
  };
}
