"use client";

import React, { useEffect, useState } from "react";

import {
  ClockIcon,
  DollarSignIcon,
  TrendingUpIcon,
  UserIcon,
} from "lucide-react";

import { getTechnicianProductivity } from "@/app/dashboard/actions";
import { cn } from "@/lib/utils";

interface TechnicianStats {
  id: string;
  name: string;
  role: string;
  totalJobs: number;
  completedJobs: number;
  inProgressJobs: number;
  pendingJobs: number;
  totalRevenue: number;
  monthlyJobs: number;
  averageJobValue: number;
  completionRate: number;
}

/**
 * Technician Productivity Table Component
 * Displays performance metrics for all technicians
 */
export function TechnicianProductivityTable() {
  const [technicianData, setTechnicianData] = useState<TechnicianStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTechnicianData = async () => {
      try {
        setLoading(true);
        const data = await getTechnicianProductivity();
        setTechnicianData(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching technician data:", err);
        setError("Failed to load technician data");
      } finally {
        setLoading(false);
      }
    };

    fetchTechnicianData();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getCompletionRateColor = (rate: number) => {
    if (rate >= 90) return "text-green-600 dark:text-green-400";
    if (rate >= 70) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getCompletionRateBadge = (rate: number) => {
    if (rate >= 90)
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    if (rate >= 70)
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
  };

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-xs dark:bg-gray-800">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900">
            <UserIcon className="size-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Technician Productivity
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Performance metrics and workload analysis
            </p>
          </div>
        </div>
        <div className="animate-pulse">
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-16 rounded bg-gray-200 dark:bg-gray-700"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-xs dark:bg-gray-800">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-red-100 dark:bg-red-900">
            <UserIcon className="size-5 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Technician Productivity
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Performance metrics and workload analysis
            </p>
          </div>
        </div>
        <div className="py-8 text-center">
          <p className="text-red-500 dark:text-red-400">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (technicianData.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-xs dark:bg-gray-800">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900">
            <UserIcon className="size-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Technician Productivity
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Performance metrics and workload analysis
            </p>
          </div>
        </div>
        <div className="py-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            No technician data available
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-xs dark:bg-gray-800">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900">
          <UserIcon className="size-5 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Technician Productivity
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Performance metrics and workload analysis
          </p>
        </div>
      </div>

      {/* Mobile Card Layout */}
      <div className="block space-y-4 md:hidden">
        {technicianData.map((technician) => (
          <div
            key={technician.id}
            className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
          >
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {technician.name}
                </h4>
                <p className="text-sm text-gray-600 capitalize dark:text-gray-400">
                  {technician.role}
                </p>
              </div>
              <span
                className={cn(
                  "rounded-full px-2 py-1 text-xs font-medium",
                  getCompletionRateBadge(technician.completionRate),
                )}
              >
                {technician.completionRate}%
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600 dark:text-gray-400">Total Jobs</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {technician.totalJobs}
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">This Month</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {technician.monthlyJobs}
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Revenue</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {formatCurrency(technician.totalRevenue)}
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">
                  Avg. Job Value
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {formatCurrency(technician.averageJobValue)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="py-3 text-left font-medium text-gray-900 dark:text-white">
                Technician
              </th>
              <th className="py-3 text-center font-medium text-gray-900 dark:text-white">
                Total Jobs
              </th>
              <th className="py-3 text-center font-medium text-gray-900 dark:text-white">
                This Month
              </th>
              <th className="py-3 text-center font-medium text-gray-900 dark:text-white">
                Completion Rate
              </th>
              <th className="py-3 text-center font-medium text-gray-900 dark:text-white">
                Total Revenue
              </th>
              <th className="py-3 text-center font-medium text-gray-900 dark:text-white">
                Avg. Job Value
              </th>
              <th className="py-3 text-center font-medium text-gray-900 dark:text-white">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {technicianData.map((technician) => (
              <tr
                key={technician.id}
                className="border-b border-gray-100 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50"
              >
                <td className="py-4">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {technician.name}
                    </p>
                    <p className="text-xs text-gray-600 capitalize dark:text-gray-400">
                      {technician.role}
                    </p>
                  </div>
                </td>
                <td className="py-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <ClockIcon className="size-4 text-gray-400" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {technician.totalJobs}
                    </span>
                  </div>
                </td>
                <td className="py-4 text-center">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {technician.monthlyJobs}
                  </span>
                </td>
                <td className="py-4 text-center">
                  <span
                    className={cn(
                      "font-medium",
                      getCompletionRateColor(technician.completionRate),
                    )}
                  >
                    {technician.completionRate}%
                  </span>
                </td>
                <td className="py-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <DollarSignIcon className="size-4 text-gray-400" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatCurrency(technician.totalRevenue)}
                    </span>
                  </div>
                </td>
                <td className="py-4 text-center">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(technician.averageJobValue)}
                  </span>
                </td>
                <td className="py-4 text-center">
                  <div className="flex flex-col gap-1 text-xs">
                    <span className="text-green-600 dark:text-green-400">
                      {technician.completedJobs} completed
                    </span>
                    <span className="text-blue-600 dark:text-blue-400">
                      {technician.inProgressJobs} in progress
                    </span>
                    <span className="text-yellow-600 dark:text-yellow-400">
                      {technician.pendingJobs} pending
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-700">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="text-center">
            <div className="mb-1 flex items-center justify-center gap-2">
              <UserIcon className="size-4 text-gray-400" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Active Techs
              </p>
            </div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {technicianData.length}
            </p>
          </div>
          <div className="text-center">
            <div className="mb-1 flex items-center justify-center gap-2">
              <ClockIcon className="size-4 text-gray-400" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Jobs
              </p>
            </div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {technicianData.reduce((sum, tech) => sum + tech.totalJobs, 0)}
            </p>
          </div>
          <div className="text-center">
            <div className="mb-1 flex items-center justify-center gap-2">
              <DollarSignIcon className="size-4 text-gray-400" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Revenue
              </p>
            </div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {formatCurrency(
                technicianData.reduce(
                  (sum, tech) => sum + tech.totalRevenue,
                  0,
                ),
              )}
            </p>
          </div>
          <div className="text-center">
            <div className="mb-1 flex items-center justify-center gap-2">
              <TrendingUpIcon className="size-4 text-gray-400" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Avg. Completion
              </p>
            </div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {technicianData.length > 0
                ? Math.round(
                    technicianData.reduce(
                      (sum, tech) => sum + tech.completionRate,
                      0,
                    ) / technicianData.length,
                  )
                : 0}
              %
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
