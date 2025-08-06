import { useState } from "react";

import type { JobFilters } from "../_types/job.types";

export function useJobFilters() {
  const [filters, setFilters] = useState<JobFilters>({
    search: "",
    status: [],
    customer: [],
    vehicle: [],
    service: [],
    employee: [],
    dateRange: undefined,
  });

  const updateFilter = <K extends keyof JobFilters>(
    key: K,
    value: JobFilters[K],
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      status: [],
      customer: [],
      vehicle: [],
      service: [],
      employee: [],
      dateRange: undefined,
    });
  };

  const hasActiveFilters = () => {
    return (
      filters.search !== "" ||
      filters.status.length > 0 ||
      filters.customer.length > 0 ||
      filters.vehicle.length > 0 ||
      filters.service.length > 0 ||
      filters.employee.length > 0 ||
      filters.dateRange !== undefined
    );
  };

  return {
    filters,
    updateFilter,
    clearFilters,
    hasActiveFilters,
  };
}
