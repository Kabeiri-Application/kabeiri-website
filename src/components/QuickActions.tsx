"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  PlusIcon,
  UserPlusIcon,
  CalendarIcon,
  PackageIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { NewJobModal } from "@/components/NewJobModal";
import { cn } from "@/lib/utils";

/**
 * QuickActions component for dashboard - provides instant access to common workflows
 * Features responsive grid layout and keyboard accessibility
 */
export function QuickActions() {
  const router = useRouter();
  const [isNewJobModalOpen, setIsNewJobModalOpen] = useState(false);

  // Action configuration with routes and styling
  const actions = [
    {
      id: "new-job",
      label: "New Job",
      description: "Create a new repair job",
      icon: PlusIcon,
      action: "modal", // Use modal instead of route
      color: "bg-blue-500 hover:bg-blue-600 text-white",
      ariaLabel: "Create a new repair job",
    },
    {
      id: "add-customer",
      label: "Add Customer",
      description: "Register new customer",
      icon: UserPlusIcon,
      route: "/dashboard/customers/new",
      color: "bg-green-500 hover:bg-green-600 text-white",
      ariaLabel: "Add new customer to system",
    },

    {
      id: "todays-jobs",
      label: "Today's Jobs",
      description: "View today's schedule",
      icon: CalendarIcon,
      route: "/dashboard/jobs?schedule=today",
      color: "bg-orange-500 hover:bg-orange-600 text-white",
      ariaLabel: "View jobs scheduled for today",
    },
    {
      id: "low-stock-parts",
      label: "Low-Stock Parts",
      description: "Review inventory alerts",
      icon: PackageIcon,
      route: "/dashboard/inventory?filter=low-stock",
      color: "bg-red-500 hover:bg-red-600 text-white",
      ariaLabel: "View parts with low inventory",
    },
  ];

  /**
   * Handle action click - either open modal or navigate to route
   */
  const handleActionClick = (action: typeof actions[0]) => {
    if (action.id === "new-job") {
      setIsNewJobModalOpen(true);
    } else if (action.route) {
      router.push(action.route);
    }
  };

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Quick Actions
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Streamline your workflow with one-click access to common tasks
        </p>
      </div>

      {/* Responsive Action Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action) => {
          const IconComponent = action.icon;
          
          return (
            <Button
              key={action.id}
              onClick={() => handleActionClick(action)}
              aria-label={action.ariaLabel}
              className={cn(
                // Base styling
                "group relative h-auto p-6 flex flex-col items-center text-center",
                "border border-gray-200 dark:border-gray-700 rounded-xl",
                "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750",
                "shadow-sm hover:shadow-md transition-all duration-200",
                // Focus states for keyboard navigation
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                "dark:focus:ring-offset-gray-900",
                // Hover animations
                "hover:scale-[1.02] active:scale-[0.98]",
                "overflow-hidden"
              )}
              variant="ghost"
            >
              {/* Subtle shimmer effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer" />
              </div>

              {/* Icon container with color background */}
              <div
                className={cn(
                  "relative z-10 p-3 rounded-full mb-3 transition-transform duration-200",
                  "group-hover:scale-110",
                  action.color
                )}
              >
                <IconComponent className="h-6 w-6" />
              </div>

              {/* Action label and description */}
              <div className="relative z-10">
                <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                  {action.label}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
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
          // Optionally refresh data or show success message
          console.log("Job created successfully!");
        }}
      />
    </div>
  );
}

// Add shimmer animation to Tailwind (if not already present)
// This would typically go in tailwind.config.js, but since we can't edit it,
// we use CSS-in-JS approach with the existing animation utilities
const shimmerKeyframes = `
  @keyframes shimmer {
    0% { transform: translateX(-100%) skewX(-12deg); }
    100% { transform: translateX(200%) skewX(-12deg); }
  }
`;

// Inject shimmer animation if not present
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    .animate-shimmer {
      animation: shimmer 1.5s ease-in-out;
    }
    ${shimmerKeyframes}
  `;
  document.head.appendChild(styleSheet);
}
