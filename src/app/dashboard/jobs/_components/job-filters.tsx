"use client";

import React from "react";

import { SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePickerDropdown as DatePicker } from "@/components/ui/date-picker-dropdown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

import { statusOptions } from "../_constants/job.constants";
import type { JobFilters } from "../_types/job.types";

interface JobFiltersProps {
  filters: JobFilters;
  onFilterChange: <K extends keyof JobFilters>(
    key: K,
    value: JobFilters[K],
  ) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export function JobFilters({
  filters,
  onFilterChange,
  onClearFilters,
  hasActiveFilters,
}: JobFiltersProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Search Input */}
      <div className="relative max-w-md flex-1">
        <SearchIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
        <input
          type="text"
          placeholder="Search jobs..."
          value={filters.search}
          onChange={(e) => onFilterChange("search", e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white py-2 pr-4 pl-10 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Filter Controls */}
      <div className="flex items-center gap-2">
        {/* Status Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "relative",
                filters.status.length > 0 &&
                  "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20",
              )}
            >
              Status
              {filters.status.length > 0 && (
                <span className="ml-1 rounded-full bg-blue-500 px-2 py-0.5 text-xs text-white">
                  {filters.status.length}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <div className="p-2">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">Filter by Status</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onFilterChange("status", [])}
                  className="h-6 px-2 text-xs"
                >
                  Clear
                </Button>
              </div>
              <div className="space-y-2">
                {statusOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex cursor-pointer items-center space-x-2"
                  >
                    <Checkbox
                      checked={filters.status.includes(option.value)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          onFilterChange("status", [
                            ...filters.status,
                            option.value,
                          ]);
                        } else {
                          onFilterChange(
                            "status",
                            filters.status.filter(
                              (item) => item !== option.value,
                            ),
                          );
                        }
                      }}
                    />
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Date Range Filter */}
        <DatePicker
          selected={filters.dateRange?.from}
          onSelect={(date) =>
            onFilterChange(
              "dateRange",
              date ? { from: date, to: date } : undefined,
            )
          }
          className={cn(
            filters.dateRange &&
              "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20",
          )}
        />

        {/* Clear All Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            Clear All
          </Button>
        )}
      </div>
    </div>
  );
}
