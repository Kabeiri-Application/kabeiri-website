import {
  BarChart3Icon,
  ClockIcon,
  DollarSignIcon,
  WrenchIcon,
} from "lucide-react";

export default function DashboardPage() {
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
                <p className="text-2xl font-bold dark:text-white">24</p>
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
                <p className="text-2xl font-bold dark:text-white">8</p>
              </div>
            </div>
          </div>

          {/* Revenue */}
          <div className="rounded-2xl bg-white p-6 shadow-xs dark:bg-gray-800">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-xl bg-green-100 dark:bg-green-900">
                <DollarSignIcon className="size-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Revenue
                </p>
                <p className="text-2xl font-bold dark:text-white">$5,230</p>
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
                <p className="text-2xl font-bold dark:text-white">3.2 hrs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Jobs and Inventory Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Recent Jobs */}
          <div className="rounded-2xl bg-white p-6 shadow-xs dark:bg-gray-800">
            <h2 className="mb-4 text-lg font-bold dark:text-white">
              Recent Jobs
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium dark:text-white">
                    Oil Change - Toyota Camry
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    2 hours ago
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium dark:text-white">
                    Brake Replacement - Ford F-150
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    2 hours ago
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium dark:text-white">
                    Tire Rotation - Honda Civic
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    2 hours ago
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Low Inventory Alert */}
          <div className="rounded-2xl bg-white p-6 shadow-xs dark:bg-gray-800">
            <h2 className="mb-4 text-lg font-bold dark:text-white">
              Low Inventory Alert
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="font-medium dark:text-white">Oil Filters</p>
                <span className="text-sm font-medium text-red-500 dark:text-red-400">
                  Low Stock
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-medium dark:text-white">Brake Pads</p>
                <span className="text-sm font-medium text-red-500 dark:text-red-400">
                  Low Stock
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-medium dark:text-white">Windshield Wipers</p>
                <span className="text-sm font-medium text-red-500 dark:text-red-400">
                  Low Stock
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
