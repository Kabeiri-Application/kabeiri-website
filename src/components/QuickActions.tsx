"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  BarChart3Icon,
  CalendarIcon,
  PackageIcon,
  PlusIcon,
  UserPlusIcon,
} from "lucide-react";

import { NewCustomerModal } from "@/components/NewCustomerModal";
import { NewJobModal } from "@/components/NewJobModal";
import { Button } from "@/components/ui/button";

/**
 * Modern QuickActions component with clean, animated buttons
 */
export function QuickActions() {
  const router = useRouter();
  const [isNewJobModalOpen, setIsNewJobModalOpen] = useState(false);
  const [isNewCustomerModalOpen, setIsNewCustomerModalOpen] = useState(false);

  const actions = [
    {
      id: "new-job",
      label: "New Job",
      description: "Create repair job",
      icon: PlusIcon,
      gradient: "from-blue-500 to-blue-600",
      hoverGradient: "hover:from-blue-600 hover:to-blue-700",
      ringColor: "focus:ring-blue-500/50",
      ariaLabel: "Create a new repair job",
    },
    {
      id: "add-customer",
      label: "Add Customer",
      description: "Register customer",
      icon: UserPlusIcon,
      gradient: "from-emerald-500 to-emerald-600",
      hoverGradient: "hover:from-emerald-600 hover:to-emerald-700",
      ringColor: "focus:ring-emerald-500/50",
      ariaLabel: "Add new customer to system",
    },
    {
      id: "todays-jobs",
      label: "Today's Jobs",
      description: "View schedule",
      icon: CalendarIcon,
      route: "/dashboard/jobs?schedule=today",
      gradient: "from-amber-500 to-orange-500",
      hoverGradient: "hover:from-amber-600 hover:to-orange-600",
      ringColor: "focus:ring-amber-500/50",
      ariaLabel: "View jobs scheduled for today",
    },
    {
      id: "low-stock-parts",
      label: "Low Stock",
      description: "Inventory alerts",
      icon: PackageIcon,
      route: "/dashboard/inventory?filter=low-stock",
      gradient: "from-red-500 to-rose-500",
      hoverGradient: "hover:from-red-600 hover:to-rose-600",
      ringColor: "focus:ring-red-500/50",
      ariaLabel: "View parts with low inventory",
    },
  ];

  const handleActionClick = (action: (typeof actions)[0]) => {
    if (action.id === "new-job") {
      setIsNewJobModalOpen(true);
    } else if (action.id === "add-customer") {
      setIsNewCustomerModalOpen(true);
    } else if (action.route) {
      router.push(action.route);
    }
  };

  return (
    <div className="w-full">
      {/* Clean Header */}
      <div className="mb-8">
        <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
          Quick Actions
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          One-click access to essential workflows
        </p>
      </div>

      {/* Featured Action Buttons */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <Button
            onClick={() => handleActionClick(actions[0])} // New Job action
            className="bg-primary hover:bg-primary/90 text-primary-foreground h-auto w-full p-4"
            size="lg"
          >
            <div className="flex items-center gap-3">
              <PlusIcon className="h-5 w-5" />
              <div className="text-left">
                <div className="font-semibold">Create New Job</div>
                <div className="text-xs opacity-90">Start repair workflow</div>
              </div>
            </div>
          </Button>
        </div>
        <div className="flex-1">
          <Button
            onClick={() => router.push("/dashboard/analytics")}
            className="bg-secondary hover:bg-secondary/80 text-secondary-foreground h-auto w-full p-4"
            size="lg"
            variant="secondary"
          >
            <div className="flex items-center gap-3">
              <BarChart3Icon className="h-5 w-5" />
              <div className="text-left">
                <div className="font-semibold">View Analytics</div>
                <div className="text-xs opacity-90">Business insights</div>
              </div>
            </div>
          </Button>
        </div>
      </div>

      {/* Action Button Grid */}
      <div className="flex flex-col gap-4 sm:flex-row">
        {actions.slice(1).map((action) => {
          const IconComponent = action.icon;

          return (
            <Button
              key={action.id}
              onClick={() => handleActionClick(action)}
              aria-label={action.ariaLabel}
              variant="outline"
              className="h-auto flex-1 flex-col gap-3 p-6 text-center"
            >
              {/* Icon */}
              <div className="bg-muted rounded-full p-3">
                <IconComponent className="h-6 w-6" />
              </div>

              {/* Text content */}
              <div>
                <h3 className="mb-1 text-sm font-semibold">{action.label}</h3>
                <p className="text-muted-foreground text-xs">
                  {action.description}
                </p>
              </div>
            </Button>
          );
        })}
      </div>

      {/* New Job Modal */}
      <NewJobModal
        isOpen={isNewJobModalOpen}
        onOpenChange={setIsNewJobModalOpen}
        onJobCreated={() => {
          console.log("Job created successfully!");
        }}
      />

      {/* New Customer Modal */}
      <NewCustomerModal
        isOpen={isNewCustomerModalOpen}
        onOpenChange={setIsNewCustomerModalOpen}
        onCustomerCreated={() => {
          console.log("Customer created successfully!");
        }}
      />
    </div>
  );
}
