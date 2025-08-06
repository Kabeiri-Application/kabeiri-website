"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { createColumnHelper } from "@tanstack/react-table";
import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  FilterIcon,
} from "lucide-react";
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
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { RippleButton } from "@/components/magicui/ripple-button";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { Table } from "@/components/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePickerDropdown as DatePicker } from "@/components/ui/date-picker-dropdown";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Car, Job, Service } from "@/db/app.schema";
import { cn } from "@/lib/utils";

function isService(obj: unknown): obj is Service {
  return obj !== null && typeof obj === "object" && "title" in obj;
}

const statusOptions = [
  { value: "in progress", label: "In Progress" },
  { value: "pending", label: "Pending" },
  { value: "complete", label: "Complete" },
];

const columnHelper = createColumnHelper<Job>();

const columns = [
  columnHelper.accessor("title", {
    header: ({ column }) => {
      const sortState = column.getIsSorted(); // 'asc' | 'desc' | false
      const Icon =
        sortState === "asc"
          ? ArrowUpIcon
          : sortState === "desc"
            ? ArrowDownIcon
            : ArrowUpDownIcon;
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Job
          <Icon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("customer", {
    header: ({ column, table }) => {
      const selected = (column.getFilterValue() as string[]) || [];
      const options = Array.from(
        new Set(
          table.getPreFilteredRowModel().rows.map((row) => {
            const c = row.original.customer as Partial<Customer> | null;
            return c?.firstName && c?.lastName
              ? `${c.firstName} ${c.lastName}`
              : "Unknown customer";
          }),
        ),
      );
      return (
        <div className="flex items-center">
          <span className="font-medium">Customer</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-1">
                <FilterIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              side="bottom"
              sideOffset={4}
              className="w-64"
            >
              <div className="mb-2 border-b pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Filter by Customer
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => column.setFilterValue([])}
                    className="h-6 px-2 text-xs"
                  >
                    Clear
                  </Button>
                </div>
                {selected.length > 0 && (
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {selected.length} selected
                  </p>
                )}
              </div>
              <div className="max-h-48 overflow-y-auto">
                {options.map((opt) => (
                  <div
                    key={opt}
                    className="flex items-center space-x-2 rounded px-1 py-2 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <Checkbox
                      checked={selected.includes(opt)}
                      onCheckedChange={(checked) => {
                        const next = checked
                          ? [...selected, opt]
                          : selected.filter((v) => v !== opt);
                        column.setFilterValue(next);
                      }}
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {opt}
                    </span>
                  </div>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
    cell: ({ row }) => {
      const c = row.original.customer as Partial<Customer> | null;
      return c?.firstName && c?.lastName
        ? `${c.firstName} ${c.lastName}`
        : "Unknown customer";
    },
    filterFn: (row, _columnId, filterValues: string[]) => {
      const c = row.original.customer as Partial<Customer> | null;
      const val =
        c?.firstName && c?.lastName
          ? `${c.firstName} ${c.lastName}`
          : "Unknown customer";
      return filterValues.length ? filterValues.includes(val) : true;
    },
  }),
  columnHelper.accessor("vehicle", {
    header: ({ column, table }) => {
      const selected = (column.getFilterValue() as string[]) || [];
      const options = Array.from(
        new Set(
          table.getPreFilteredRowModel().rows.map((row) => {
            const v = row.original.vehicle as Partial<Car> | null;
            return v?.year && v?.make && v?.model
              ? `${v.year} ${v.make} ${v.model}`
              : "Unknown vehicle";
          }),
        ),
      );
      return (
        <div className="flex items-center">
          <span className="font-medium">Vehicle</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-1">
                <FilterIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              side="bottom"
              sideOffset={4}
              className="w-64"
            >
              <div className="mb-2 border-b pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Filter by Vehicle</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => column.setFilterValue([])}
                    className="h-6 px-2 text-xs"
                  >
                    Clear
                  </Button>
                </div>
                {selected.length > 0 && (
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {selected.length} selected
                  </p>
                )}
              </div>
              <div className="max-h-48 overflow-y-auto">
                {options.map((opt) => (
                  <div
                    key={opt}
                    className="flex items-center space-x-2 rounded px-1 py-2 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <Checkbox
                      checked={selected.includes(opt)}
                      onCheckedChange={(checked) => {
                        const next = checked
                          ? [...selected, opt]
                          : selected.filter((v) => v !== opt);
                        column.setFilterValue(next);
                      }}
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {opt}
                    </span>
                  </div>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
    cell: ({ row }) => {
      const v = row.original.vehicle as Partial<Car> | null;
      return v?.year && v?.make && v?.model
        ? `${v.year} ${v.make} ${v.model}`
        : "Unknown vehicle";
    },
    filterFn: (row, _columnId, filterValues: string[]) => {
      const v = row.original.vehicle as Partial<Car> | null;
      const val =
        v?.year && v?.make && v?.model
          ? `${v.year} ${v.make} ${v.model}`
          : "Unknown vehicle";
      return filterValues.length ? filterValues.includes(val) : true;
    },
  }),
  columnHelper.accessor("service", {
    header: ({ column, table }) => {
      const selected = (column.getFilterValue() as string[]) || [];
      const options = Array.from(
        new Set(
          table.getPreFilteredRowModel().rows.map((row) => {
            const svc = row.original.service;
            if (isService(svc)) {
              return svc.title ?? "Unknown service";
            }
            return "Unknown service";
          }),
        ),
      );
      return (
        <div className="flex items-center">
          <span className="font-medium">Service</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-1">
                <FilterIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              side="bottom"
              sideOffset={4}
              className="w-64"
            >
              <div className="mb-2 border-b pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Filter by Service</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => column.setFilterValue([])}
                    className="h-6 px-2 text-xs"
                  >
                    Clear
                  </Button>
                </div>
                {selected.length > 0 && (
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {selected.length} selected
                  </p>
                )}
              </div>
              <div className="max-h-48 overflow-y-auto">
                {options.map((opt) => (
                  <div
                    key={opt}
                    className="flex items-center space-x-2 rounded px-1 py-2 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <Checkbox
                      checked={selected.includes(opt)}
                      onCheckedChange={(checked) => {
                        const next = checked
                          ? [...selected, opt]
                          : selected.filter((v) => v !== opt);
                        column.setFilterValue(next);
                      }}
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {opt}
                    </span>
                  </div>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
    cell: ({ row }) => {
      const svc = row.original.service;
      if (isService(svc)) {
        return svc.title ?? "Unknown service";
      }
      return "Unknown service";
    },
    filterFn: (row, _columnId, filterValues: string[]) => {
      const svc = row.original.service;
      const val = isService(svc)
        ? (svc.title ?? "Unknown service")
        : "Unknown service";
      return filterValues.length ? filterValues.includes(val) : true;
    },
  }),
  columnHelper.accessor("due_date", {
    enableSorting: false,
    header: ({ column }) => {
      const dateRange = column.getFilterValue() as
        | { from?: Date; to?: Date }
        | undefined;

      return (
        <div className="flex items-center">
          <span className="font-medium">Due Date</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "ml-1",
                  dateRange &&
                    (dateRange.from || dateRange.to) &&
                    "bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-400",
                )}
              >
                <FilterIcon
                  className={cn(
                    "h-4 w-4",
                    dateRange &&
                      (dateRange.from || dateRange.to) &&
                      "fill-current",
                  )}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              side="bottom"
              sideOffset={4}
              className="w-80"
            >
              <div className="mb-2 border-b pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Filter by Due Date
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => column.setFilterValue(undefined)}
                    className="h-6 px-2 text-xs"
                  >
                    Clear
                  </Button>
                </div>
                {dateRange && (dateRange.from || dateRange.to) && (
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {(() => {
                      // Convert string dates to Date objects if needed
                      const fromDate = dateRange.from
                        ? new Date(dateRange.from)
                        : null;
                      const toDate = dateRange.to
                        ? new Date(dateRange.to)
                        : null;

                      if (fromDate && toDate) {
                        return `${fromDate.toLocaleDateString()} - ${toDate.toLocaleDateString()}`;
                      } else if (fromDate) {
                        return `From ${fromDate.toLocaleDateString()}`;
                      } else if (toDate) {
                        return `Until ${toDate.toLocaleDateString()}`;
                      }
                      return "";
                    })()}
                  </p>
                )}
              </div>
              <div className="space-y-4 p-1">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
                    From Date
                  </label>
                  <DatePicker
                    selected={dateRange?.from}
                    onSelect={(date) => {
                      const current = dateRange || {};
                      column.setFilterValue({ ...current, from: date });
                    }}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
                    To Date
                  </label>
                  <DatePicker
                    selected={dateRange?.to}
                    onSelect={(date) => {
                      const current = dateRange || {};
                      column.setFilterValue({ ...current, to: date });
                    }}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => {
                      const today = new Date();
                      const startOfWeek = new Date(today);
                      const endOfWeek = new Date(today);
                      // Get start of week (Sunday)
                      startOfWeek.setDate(today.getDate() - today.getDay());
                      // Get end of week (Saturday)
                      endOfWeek.setDate(today.getDate() + (6 - today.getDay()));
                      column.setFilterValue({
                        from: startOfWeek,
                        to: endOfWeek,
                      });
                    }}
                  >
                    This Week
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => {
                      const today = new Date();
                      const startOfMonth = new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        1,
                      );
                      const endOfMonth = new Date(
                        today.getFullYear(),
                        today.getMonth() + 1,
                        0,
                      );
                      column.setFilterValue({
                        from: startOfMonth,
                        to: endOfMonth,
                      });
                    }}
                  >
                    This Month
                  </Button>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
    cell: (info) => {
      const raw = info.getValue() as string | null;
      if (!raw) return "None";
      const d = new Date(raw);
      return isNaN(d.getTime()) ? "Invalid date" : d.toLocaleDateString();
    },
    filterFn: (row, columnId, filterValue?: { from?: Date; to?: Date }) => {
      if (!filterValue || (!filterValue.from && !filterValue.to)) return true;

      const raw = row.getValue<string | Date>(columnId);
      if (!raw) return false;

      const rowDate = raw instanceof Date ? raw : new Date(raw);
      if (isNaN(rowDate.getTime())) return false;

      const { from, to } = filterValue;

      if (from && to) {
        return rowDate >= from && rowDate <= to;
      } else if (from) {
        return rowDate >= from;
      } else if (to) {
        return rowDate <= to;
      }

      return true;
    },
  }),

  columnHelper.accessor("assigned_to", {
    header: ({ column, table }) => {
      const selected = (column.getFilterValue() as string[]) || [];
      const options = Array.from(
        new Set(
          table.getPreFilteredRowModel().rows.map((row) => {
            const emp = row.original.assigned_to as unknown as Employee | null;
            return emp ? `${emp.firstName} ${emp.lastName}` : "Unassigned";
          }),
        ),
      );
      return (
        <div className="flex items-center">
          <span className="font-medium">Assigned To</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-1">
                <FilterIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              side="bottom"
              sideOffset={4}
              className="w-64"
            >
              <div className="mb-2 border-b pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Filter by Assignee
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => column.setFilterValue([])}
                    className="h-6 px-2 text-xs"
                  >
                    Clear
                  </Button>
                </div>
                {selected.length > 0 && (
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {selected.length} selected
                  </p>
                )}
              </div>
              <div className="max-h-48 overflow-y-auto">
                {options.map((opt) => (
                  <div
                    key={opt}
                    className="flex items-center space-x-2 rounded px-1 py-2 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <Checkbox
                      checked={selected.includes(opt)}
                      onCheckedChange={(checked) => {
                        const next = checked
                          ? [...selected, opt]
                          : selected.filter((v) => v !== opt);
                        column.setFilterValue(next);
                      }}
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {opt}
                    </span>
                  </div>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
    cell: ({ row }) => {
      const employee = row?.original?.assigned_to as unknown as Employee;
      return `${employee?.firstName ?? ""} ${employee?.lastName ?? ""}`;
    },
    filterFn: (row, _columnId, filterValues: string[]) => {
      const emp = row.original.assigned_to as unknown as Employee | null;
      const val = emp ? `${emp.firstName} ${emp.lastName}` : "Unassigned";
      return filterValues.length ? filterValues.includes(val) : true;
    },
  }),

  columnHelper.accessor("status", {
    header: ({ column }) => {
      const selected = (column.getFilterValue() as string[]) || [];
      return (
        <div className="flex items-center">
          <span className="font-medium">Status</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-1">
                <FilterIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              side="bottom"
              sideOffset={4}
              className="w-64"
            >
              <div className="mb-2 border-b pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Filter by Status</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => column.setFilterValue([])}
                    className="h-6 px-2 text-xs"
                  >
                    Clear
                  </Button>
                </div>
                {selected.length > 0 && (
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {selected.length} selected
                  </p>
                )}
              </div>
              <div className="max-h-48 overflow-y-auto">
                {statusOptions.map(({ value, label }) => (
                  <div
                    key={value}
                    className="flex items-center space-x-2 rounded px-1 py-2 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <Checkbox
                      checked={selected.includes(value)}
                      onCheckedChange={(checked) => {
                        const newValues = checked
                          ? [...selected, value]
                          : selected.filter((v) => v !== value);
                        column.setFilterValue(newValues);
                      }}
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
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
    filterFn: (row, columnId, filterValues: string[]) => {
      const status = row.getValue<string>(columnId);
      return filterValues?.length ? filterValues.includes(status) : true;
    },
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
    if (!selectedCustomer) return;
    const fetchCars = async () => {
      await getVehicles(selectedCustomer).then((data) =>
        setVehicles(data as Car[]),
      );
    };
    fetchCars();
  }, [selectedCustomer]);

  return (
    <main className="p-8">
      <Dialog open={modalStatus} onOpenChange={setModalStatus}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Job List</h1>
            <DialogTrigger asChild>
              <InteractiveHoverButton className="border-none bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:from-blue-700 hover:to-purple-700">
                New Job
              </InteractiveHoverButton>
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
            <div className="my-3 flex gap-3">
              <RippleButton
                type="button"
                onClick={() => setModalStatus(false)}
                className="flex-1 border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                Cancel
              </RippleButton>
              <ShinyButton
                type="submit"
                className="flex-1 border-none bg-gradient-to-r from-green-600 to-blue-600 text-white"
              >
                Create Job
              </ShinyButton>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}
