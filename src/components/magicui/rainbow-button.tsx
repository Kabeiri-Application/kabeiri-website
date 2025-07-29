import React from "react";

import { cn } from "@/lib/utils";

interface RainbowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
}

export const RainbowButton = React.forwardRef<
  HTMLButtonElement,
  RainbowButtonProps
>(
  (
    { children, className, variant = "default", size = "default", ...props },
    ref,
  ) => {
    const sizeClasses = {
      default: "px-6 py-2 text-sm",
      sm: "px-4 py-1.5 text-xs",
      lg: "px-8 py-3 text-base",
      icon: "p-2",
    };

    const variantClasses = {
      default:
        "text-white bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-[length:200%_100%] animate-rainbow hover:shadow-lg hover:shadow-rainbow/50",
      outline:
        "text-foreground border-2 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-[length:200%_100%] animate-rainbow bg-clip-text text-transparent border-current hover:bg-clip-padding hover:text-white",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "relative transform cursor-pointer rounded-lg font-medium transition-all duration-300 ease-in-out hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:outline-none",
          sizeClasses[size],
          variantClasses[variant],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

RainbowButton.displayName = "RainbowButton";
