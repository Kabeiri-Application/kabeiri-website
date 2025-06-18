"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { createColumnHelper } from "@tanstack/react-table";
import { PlusIcon } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";

import {
  createJob,
  getCustomers,
  getEmployees,
  getJobs,
  getOrganizationId,
  getServices,
  getVehicles,
} from "@/app/dashboard/jobs/actions";
import {
  jobFormSchema,
  JobStatus,
  type Customer,
  type Employee,
} from "@/app/dashboard/jobs/schema";
import { Table } from "@/components/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Car, Job, Service } from "@/db/app.schema";
import { cn } from "@/lib/utils";

const columnHelper = createColumnHelper<Job>();

const columns = [
  columnHelper.accessor("id", {
    header: undefined,
    cell: undefined,
  }),
  columnHelper.accessor("title", {
    header: "Job",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("due_date", {
    header: "Due Date",
    cell: (info) =>
      info.getValue()
        ? new Date(info.getValue() ?? "").toLocaleDateString()
        : "",
  }),
  columnHelper.accessor("customer", {
    header: "Customer",
    cell: ({ row }) => {
      const customer = row?.original?.customer as unknown as Customer;
      return `${customer?.firstName ?? ""} ${customer?.lastName ?? ""}`;
    },
  }),
  columnHelper.accessor("vehicle", {
    header: "Vehicle",
    cell: ({ row }) => {
      const vehicle = row?.original?.vehicle as unknown as Car;
      return `${vehicle?.year ?? ""} ${vehicle?.make ?? ""} ${vehicle?.model ?? ""}`;
    },
  }),
  columnHelper.accessor("service", {
    header: "Service",
    cell: ({ row }) => {
      const service = row?.original?.service as unknown as Service;
      return service?.title ?? "";
    },
  }),
  columnHelper.accessor("assigned_to", {
    header: "Assigned To",
    cell: ({ row }) => {
      const employee = row?.original?.assigned_to as unknown as Employee;
      return `${employee?.firstName ?? ""} ${employee?.lastName ?? ""}`;
    },
  }),

  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => (
      <span
        className={cn(
          info.getValue() === "complete"
            ? "text-green-700"
            : info.getValue() === "in progress"
              ? "text-yellow-600"
              : "text-red-600",
        )}
      >
        {info.getValue()}
      </span>
    ),
  }),
];

export default function JobsPage() {
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [organization, setOrganization] = useState("");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [vehicles, setVehicles] = useState<Car[]>([]);
  const [modalStatus, setModalStatus] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<jobFormSchema>({ resolver: zodResolver(jobFormSchema) });

  const fetchData = async () => {
    try {
      const organizationId = await getOrganizationId();
      if (!organizationId) {
        throw new Error("Organization ID not found");
      }
      setOrganization(organizationId);

      // Fetch all data in parallel
      const [jobs, employees, services, customers] = await Promise.all([
        getJobs(organizationId),
        getEmployees(organizationId),
        getServices(organizationId),
        getCustomers(organizationId),
      ]);
      if (!jobs || !employees || !services || !customers) {
        throw new Error("Failed to fetch data");
      }
      // Set state with proper error handling
      setJobs(jobs);
      setEmployees(employees);
      setServices(services);
      setCustomers(customers);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  // GETTING DATA
  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit: SubmitHandler<jobFormSchema> = (data) => {
    createJob({
      ...data,
      due_date: new Date(data.due_date),
      organization,
      status: JobStatus.PENDING,
    });
    setModalStatus(false);
    fetchData();
  };

  // GETTING CUSTOMER VEHICLES
  useEffect(() => {
    if (!selectedCustomer) {
      setVehicles([]);
      return;
    }
    const fetchCars = async () => {
      await getVehicles(selectedCustomer).then((data) => {
        console.log("Vehicles data:", data);
        setVehicles(data as Car[]);
      });
    };
    fetchCars();
  }, [selectedCustomer]);

  console.log("Vehicles:", vehicles);

  return (
    <main className="p-8">
      <Dialog open={modalStatus} onOpenChange={setModalStatus}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Job List</h1>
            <DialogTrigger className="flex flex-row items-center rounded-full bg-black px-4 py-2 text-white transition hover:bg-gray-800">
              <PlusIcon className="mr-2 size-5" />
              New Job
            </DialogTrigger>
          </div>
          <Table columns={columns} data={jobs} clickable={true} />
        </div>

        <DialogContent className="max-h-full overflow-y-scroll">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-gray-900">
              Create a Job
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                {...register("title")}
                placeholder="Title"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-xs focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-hidden"
              />
              {errors.title && (
                <span className="text-sm text-red-500">
                  {errors.title.message}
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                rows={4}
                {...register("description")}
                placeholder="Description"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-xs focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-hidden"
              />
              {errors.description && (
                <span className="text-sm text-red-500">
                  {errors.description.message}
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Customer
              </label>
              <select
                {...register("customer", {
                  onChange: (e) => setSelectedCustomer(e.target.value),
                })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-xs focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-hidden"
              >
                <option value="">Select a Customer</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer?.firstName} {customer?.lastName}
                  </option>
                ))}
              </select>
              {errors.customer && (
                <span className="text-sm text-red-500">
                  {errors.customer.message}
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Vehicle
              </label>
              <select
                disabled={!selectedCustomer}
                {...register("vehicle")}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-xs focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-hidden disabled:opacity-50"
              >
                <option value="">Select a vehicle</option>
                {vehicles.length > 0 ? (
                  vehicles.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </option>
                  ))
                ) : (
                  <option value="">No vehicles found</option>
                )}
              </select>
              {errors.vehicle && (
                <span className="text-sm text-red-500">
                  {errors.vehicle.message}
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Service
              </label>
              <select
                {...register("service")}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-xs focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-hidden"
              >
                <option value="">Select a service</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.title}
                  </option>
                ))}
              </select>
              {errors.service && (
                <span className="text-sm text-red-500">
                  {errors.service.message}
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Due Date
              </label>
              <input
                min={new Date().toISOString().split("T")[0]}
                {...register("due_date")}
                type="date"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-xs focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-hidden"
              />
              {errors.due_date && (
                <span className="text-sm text-red-500">
                  {errors.due_date.message}
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Assigned To
              </label>
              <select
                {...register("assigned_to")}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-xs focus:border-green-700 focus:ring-2 focus:ring-green-700 focus:outline-hidden"
              >
                <option value="">Select a mechanic</option>
                {employees.map((mechanic) => (
                  <option key={mechanic.id} value={mechanic.id}>
                    {mechanic.firstName} {mechanic.lastName}
                  </option>
                ))}
              </select>
              {errors.assigned_to && (
                <span className="text-sm text-red-500">
                  {errors.assigned_to.message}
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
