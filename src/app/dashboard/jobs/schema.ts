import { z } from "zod";

export enum JobStatus {
  IN_PROGRESS = "in progress",
  PENDING = "pending",
  COMPLETE = "complete",
}

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Customer extends BaseEntity {
  firstName: string;
  lastName: string;
  streetAddress: string;
}

export interface Vehicle extends BaseEntity {
  make: string;
  model: string;
  year: string;
  vin: string;
  licensePlate: string;
  color: string;
  owner: string;
}

export interface Service extends BaseEntity {
  title: string;
  organization: string;
}

export interface Employee extends BaseEntity {
  firstName: string;
  lastName: string;
}

export interface Job extends BaseEntity {
  title: string;
  description: string;
  customer: Customer;
  vehicle: Vehicle;
  service: Service;
  status: JobStatus;
  assigned_to: Employee;
  due_date?: string | Date;
  organization: string;
  createdBy: string;
}

export interface JobFormInputs {
  title: string;
  description: string;
  customer: string;
  vehicle: string;
  service: string;
  due_date: string;
  assigned_to: string;
  status: JobStatus;
  organization?: string;
}

export const jobFormSchema = z.object({
  title: z.string().min(1, "Title must be at least 1 characters"),
  description: z.string().min(1, "Description must be at least 1 characters"),
  customer: z.string().min(1, "Customer is required"),
  vehicle: z.string().min(1, "Vehicle is required"),
  service: z.string().min(1, "Service is required"),
  due_date: z.string(),
  assigned_to: z.string().min(1, "Assigned to is required"),
  status: z.nativeEnum(JobStatus).optional(),
});

export type jobFormSchema = z.infer<typeof jobFormSchema>;
