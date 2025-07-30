"use client";

import { useEffect, useState } from "react";

import {
  BarChart3Icon,
  ClockIcon,
  DollarSignIcon,
  WrenchIcon,
} from "lucide-react";

import { getDashboardStats } from "@/app/dashboard/actions";
import { QuickActions } from "@/components/QuickActions";
import { TechnicianProductivityTable } from "@/components/TechnicianProductivityTable";
import type { Car, Customer, Service } from "@/db/app.schema";

interface DashboardStats {
  totalJobs: number;
  inProgressJobs: number;
  monthlyRevenue: number;
  averageCompletionTime: number;
  recentJobs: Array<{
    id: string;
    title: string;
    customer: Customer | null;
    vehicle: Car | null;
    service: Service | null;
    created_at: string | null;
    status: string;
  }>;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load dashboard data",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatCompletionTime = (hours: number) => {
    if (hours < 1) {
      return `${Math.round(hours * 60)} min`;
    }
    return `${hours.toFixed(1)} hrs`;
  };

  const getTimeAgo = (dateString: string | null) => {
    if (!dateString) return "Unknown";

    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return `${Math.round(diffInHours * 60)} minutes ago`;
    } else if (diffInHours < 24) {
      return `${Math.round(diffInHours)} hours ago`;
    } else {
      return `${Math.round(diffInHours / 24)} days ago`;
    }
  };

  if (loading) {
    return (
      <main className="p-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-8 text-3xl font-bold dark:text-white">Dashboard</h1>
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900 dark:border-white"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Loading dashboard...
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-8 text-3xl font-bold dark:text-white">Dashboard</h1>
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <p className="text-red-500 dark:text-red-400">Error: {error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold dark:text-white">Dashboard</h1>

        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Jobs */}
          <div className="rounded-2xl bg-white p-6 shadow-xs dark:bg-gray-800">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900">
                <WrenchIcon className="size-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Total Jobs
                </p>
                <p className="text-2xl font-bold dark:text-white">
                  {stats?.totalJobs || 0}
                </p>
              </div>
            </div>
          </div>

          {/* In Progress */}
          <div className="rounded-2xl bg-white p-6 shadow-xs dark:bg-gray-800">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900">
                <BarChart3Icon className="size-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  In Progress
                </p>
                <p className="text-2xl font-bold dark:text-white">
                  {stats?.inProgressJobs || 0}
                </p>
              </div>
            </div>
          </div>

          {/* Monthly Revenue */}
          <div className="rounded-2xl bg-white p-6 shadow-xs dark:bg-gray-800">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-xl bg-green-100 dark:bg-green-900">
                <DollarSignIcon className="size-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Monthly Revenue
                </p>
                <p className="text-2xl font-bold dark:text-white">
                  {formatCurrency(stats?.monthlyRevenue || 0)}
                </p>
              </div>
            </div>
          </div>

          {/* Avg. Completion Time */}
          <div className="rounded-2xl bg-white p-6 shadow-xs dark:bg-gray-800">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-xl bg-pink-100 dark:bg-pink-900">
                <ClockIcon className="size-6 text-pink-600 dark:text-pink-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Avg. Completion Time
                </p>
                <p className="text-2xl font-bold dark:text-white">
                  {stats?.averageCompletionTime
                    ? formatCompletionTime(stats.averageCompletionTime)
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <QuickActions />
        </div>

        {/* Technician Productivity Table */}
        <div className="mb-8">
          <TechnicianProductivityTable />
        </div>

        {/* Recent Jobs */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-1">
          <div className="rounded-2xl bg-white p-6 shadow-xs dark:bg-gray-800">
            <h2 className="mb-4 text-lg font-bold dark:text-white">
              Recent Jobs
            </h2>
            <div className="space-y-4">
              {stats?.recentJobs && stats.recentJobs.length > 0 ? (
                stats.recentJobs.map((job) => (
                  <div
                    key={job.id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium dark:text-white">
                        {job.title} -{" "}
                        {job.vehicle
                          ? `${job.vehicle.year} ${job.vehicle.make} ${job.vehicle.model}`
                          : "Unknown Vehicle"}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {getTimeAgo(job.created_at)}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-1 text-sm font-medium ${
                        job.status === "complete"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : job.status === "in progress"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                      }`}
                    >
                      {job.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center">
                  <p className="text-gray-500 dark:text-gray-400">
                    No recent jobs found
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
