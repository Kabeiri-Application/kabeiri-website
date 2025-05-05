export enum JobStatus {
  IN_PROGRESS = 'in progress',
  PENDING = 'pending',
  COMPLETE = 'complete',
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: string;
  vin: string;
  licensePlate: string;
  color: string;
}

export interface Service {
  id: string;
  title: string;
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
}

export interface Job {
  id: number;
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
