import type { Customer, Employee } from "@/app/dashboard/jobs/schema";
import type { Car, Job, Service } from "@/db/app.schema";

export interface JobsData {
  jobs: Job[];
  customers: Customer[];
  employees: Employee[];
  services: Service[];
  vehicles: Car[];
}

export interface JobFilters {
  search: string;
  status: string[];
  customer: string[];
  vehicle: string[];
  service: string[];
  employee: string[];
  dateRange?: { from?: Date; to?: Date };
}

export interface JobFormData {
  title: string;
  customer: string;
  vehicle: string;
  service: string;
  due_date: string;
  assigned_to: string;
  description: string;
}

export function isService(obj: unknown): obj is Service {
  return obj !== null && typeof obj === "object" && "title" in obj;
}
