"use client";

import React from "react";

import { createColumnHelper } from "@tanstack/react-table";
import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  FilterIcon,
} from "lucide-react";

import {
  JobStatus,
  type Customer,
  type Employee,
} from "@/app/dashboard/jobs/schema";
import { Table } from "@/components/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePickerDropdown as DatePicker } from "@/components/ui/date-picker-dropdown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Car, Job } from "@/db/app.schema";
import { cn } from "@/lib/utils";

import { statusOptions } from "../_constants/job.constants";
import { isService } from "../_types/job.types";

const columnHelper = createColumnHelper<Job>();

export function createJobColumns() {
  return [
    columnHelper.accessor("title", {
      header: ({ column }) => {
        const sortState = column.getIsSorted();
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
                <div className="max-h-48 space-y-2 overflow-y-auto">
                  {options.map((option) => (
                    <label
                      key={option}
                      className="flex cursor-pointer items-center space-x-2"
                    >
                      <Checkbox
                        checked={selected.includes(option)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            column.setFilterValue([...selected, option]);
                          } else {
                            column.setFilterValue(
                              selected.filter((item) => item !== option),
                            );
                          }
                        }}
                      />
                      <span className="text-sm">{option}</span>
                    </label>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
      cell: ({ row }) => {
        const customer = row.original.customer as Partial<Customer> | null;
        return customer?.firstName && customer?.lastName
          ? `${customer.firstName} ${customer.lastName}`
          : "Unknown customer";
      },
      filterFn: (row, _columnId, filterValues: string[]) => {
        if (!filterValues.length) return true;
        const customer = row.original.customer as Partial<Customer> | null;
        const customerName =
          customer?.firstName && customer?.lastName
            ? `${customer.firstName} ${customer.lastName}`
            : "Unknown customer";
        return filterValues.includes(customerName);
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
                    <span className="text-sm font-medium">
                      Filter by Vehicle
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
                </div>
                <div className="max-h-48 space-y-2 overflow-y-auto">
                  {options.map((option) => (
                    <label
                      key={option}
                      className="flex cursor-pointer items-center space-x-2"
                    >
                      <Checkbox
                        checked={selected.includes(option)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            column.setFilterValue([...selected, option]);
                          } else {
                            column.setFilterValue(
                              selected.filter((item) => item !== option),
                            );
                          }
                        }}
                      />
                      <span className="text-sm">{option}</span>
                    </label>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
      cell: ({ row }) => {
        const vehicle = row.original.vehicle as Partial<Car> | null;
        return vehicle?.year && vehicle?.make && vehicle?.model
          ? `${vehicle.year} ${vehicle.make} ${vehicle.model}`
          : "Unknown vehicle";
      },
      filterFn: (row, _columnId, filterValues: string[]) => {
        if (!filterValues.length) return true;
        const vehicle = row.original.vehicle as Partial<Car> | null;
        const vehicleName =
          vehicle?.year && vehicle?.make && vehicle?.model
            ? `${vehicle.year} ${vehicle.make} ${vehicle.model}`
            : "Unknown vehicle";
        return filterValues.includes(vehicleName);
      },
    }),
    columnHelper.accessor("service", {
      header: ({ column, table }) => {
        const selected = (column.getFilterValue() as string[]) || [];
        const options = Array.from(
          new Set(
            table.getPreFilteredRowModel().rows.map((row) => {
              const s = row.original.service;
              return isService(s) ? s.title : "Unknown service";
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
                    <span className="text-sm font-medium">
                      Filter by Service
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
                </div>
                <div className="max-h-48 space-y-2 overflow-y-auto">
                  {options.map((option) => (
                    <label
                      key={option}
                      className="flex cursor-pointer items-center space-x-2"
                    >
                      <Checkbox
                        checked={selected.includes(option)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            column.setFilterValue([...selected, option]);
                          } else {
                            column.setFilterValue(
                              selected.filter((item) => item !== option),
                            );
                          }
                        }}
                      />
                      <span className="text-sm">{option}</span>
                    </label>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
      cell: ({ row }) => {
        const service = row.original.service;
        return isService(service) ? service.title : "Unknown service";
      },
      filterFn: (row, _columnId, filterValues: string[]) => {
        if (!filterValues.length) return true;
        const service = row.original.service;
        const serviceName = isService(service)
          ? service.title
          : "Unknown service";
        return filterValues.includes(serviceName);
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
                  <FilterIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" side="bottom" sideOffset={4}>
                <div className="space-y-4 p-4">
                  <div className="text-center">
                    <p className="text-sm font-medium">Filter by Due Date</p>
                    {dateRange && (dateRange.from || dateRange.to) && (
                      <p className="text-xs text-gray-500">
                        {(() => {
                          if (dateRange.from && dateRange.to) {
                            return `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`;
                          }
                          if (dateRange.from) {
                            return `From ${dateRange.from.toLocaleDateString()}`;
                          }
                          if (dateRange.to) {
                            return `Until ${dateRange.to.toLocaleDateString()}`;
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
                          endOfWeek.setDate(
                            today.getDate() + (6 - today.getDay()),
                          );
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
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs"
                      onClick={() => column.setFilterValue(undefined)}
                    >
                      Clear Filter
                    </Button>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
      cell: (info) => {
        const date = info.getValue();
        if (!date) return "No due date";

        // Use consistent date formatting to avoid hydration mismatch
        const d = new Date(date);
        if (isNaN(d.getTime())) return "Invalid date";

        // Format as YYYY-MM-DD for consistency
        return d.toISOString().split("T")[0];
      },
      filterFn: (row, columnId, filterValue?: { from?: Date; to?: Date }) => {
        if (!filterValue) return true;
        const { from, to } = filterValue;
        const cellValue = row.getValue(columnId) as string;
        if (!cellValue) return false;

        const cellDate = new Date(cellValue);
        if (from && cellDate < from) return false;
        if (to && cellDate > to) return false;
        return true;
      },
    }),
    columnHelper.accessor("assigned_to", {
      header: ({ column, table }) => {
        const selected = (column.getFilterValue() as string[]) || [];
        const options = Array.from(
          new Set(
            table.getPreFilteredRowModel().rows.map((row) => {
              const emp = row.original.assigned_to as Partial<Employee> | null;
              return emp?.firstName && emp?.lastName
                ? `${emp.firstName} ${emp.lastName}`
                : "Unassigned";
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
                      Filter by Employee
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
                </div>
                <div className="max-h-48 space-y-2 overflow-y-auto">
                  {options.map((option) => (
                    <label
                      key={option}
                      className="flex cursor-pointer items-center space-x-2"
                    >
                      <Checkbox
                        checked={selected.includes(option)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            column.setFilterValue([...selected, option]);
                          } else {
                            column.setFilterValue(
                              selected.filter((item) => item !== option),
                            );
                          }
                        }}
                      />
                      <span className="text-sm">{option}</span>
                    </label>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
      cell: ({ row }) => {
        const employee = row.original.assigned_to as Partial<Employee> | null;
        return employee?.firstName && employee?.lastName
          ? `${employee.firstName} ${employee.lastName}`
          : "Unassigned";
      },
      filterFn: (row, _columnId, filterValues: string[]) => {
        if (!filterValues.length) return true;
        const employee = row.original.assigned_to as Partial<Employee> | null;
        const employeeName =
          employee?.firstName && employee?.lastName
            ? `${employee.firstName} ${employee.lastName}`
            : "Unassigned";
        return filterValues.includes(employeeName);
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
                className="w-48"
              >
                <div className="mb-2 border-b pb-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Filter by Status
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
                </div>
                <div className="space-y-2">
                  {statusOptions.map((option) => (
                    <label
                      key={option.value}
                      className="flex cursor-pointer items-center space-x-2"
                    >
                      <Checkbox
                        checked={selected.includes(option.value)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            column.setFilterValue([...selected, option.value]);
                          } else {
                            column.setFilterValue(
                              selected.filter((item) => item !== option.value),
                            );
                          }
                        }}
                      />
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
      cell: (info) => {
        const status = info.getValue() as JobStatus;
        const statusConfig = statusOptions.find((s) => s.value === status);
        return (
          <span
            className={cn(
              "inline-flex rounded-full px-2 py-1 text-xs font-medium",
              status === "complete" &&
                "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
              status === "in progress" &&
                "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
              status === "pending" &&
                "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
            )}
          >
            {statusConfig?.label || status}
          </span>
        );
      },
      filterFn: (row, columnId, filterValues: string[]) => {
        if (!filterValues.length) return true;
        return filterValues.includes(row.getValue(columnId));
      },
    }),
  ];
}

interface JobTableProps {
  jobs: Job[];
}

export function JobTable({ jobs }: JobTableProps) {
  const columns = createJobColumns();

  return <Table columns={columns} data={jobs} clickable={true} />;
}
