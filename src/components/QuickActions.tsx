"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  PlusIcon,
  UserPlusIcon,
  CalendarIcon,
  PackageIcon,
} from "lucide-react";

import { NewJobModal } from "@/components/NewJobModal";
import { cn } from "@/lib/utils";

/**
 * Modern QuickActions component with clean, animated buttons
 */
export function QuickActions() {
  const router = useRouter();
  const [isNewJobModalOpen, setIsNewJobModalOpen] = useState(false);

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
      route: "/dashboard/customers/new",
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

  const handleActionClick = (action: typeof actions[0]) => {
    if (action.id === "new-job") {
      setIsNewJobModalOpen(true);
    } else if (action.route) {
      router.push(action.route);
    }
  };

  return (
    <div className="w-full">
      {/* Clean Header */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Quick Actions
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          One-click access to essential workflows
        </p>
      </div>

      {/* Modern Button Grid */}
      <div className="flex flex-col sm:flex-row gap-4">
        {actions.map((action) => {
          const IconComponent = action.icon;
          
          return (
            <button
              key={action.id}
              onClick={() => handleActionClick(action)}
              aria-label={action.ariaLabel}
              className={cn(
                // Base styles - modern clean look
                "group relative flex-1 p-6 rounded-2xl",
                "bg-gradient-to-br text-white font-medium",
                "transform transition-all duration-300 ease-out",
                "focus:outline-none focus:ring-4 focus:scale-[0.98]",
                // Individual gradients
                action.gradient,
                action.hoverGradient,
                action.ringColor,
                // Hover effects
                "hover:scale-[1.02] hover:shadow-xl hover:shadow-black/25",
                "active:scale-[0.98]",
                // Modern shadow
                "shadow-lg shadow-black/10"
              )}
            >
              {/* Shiny overlay effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 group-hover:animate-pulse" />
              
              {/* Content */}
              <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                {/* Icon with subtle animation */}
                <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                  <IconComponent className="h-6 w-6" />
                </div>
                
                {/* Text content */}
                <div>
                  <h3 className="font-semibold text-sm mb-1">
                    {action.label}
                  </h3>
                  <p className="text-xs text-white/80">
                    {action.description}
                  </p>
                </div>
              </div>
              
              {/* Ripple effect on click */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-white/10 rounded-2xl transform scale-0 group-active:scale-100 transition-transform duration-150 ease-out" />
              </div>
            </button>
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
    </div>
  );
}

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
