"use client";

import React from "react";

import { cn } from "@/lib/utils";

interface ShinyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const ShinyButton = React.forwardRef<
  HTMLButtonElement,
  ShinyButtonProps
>(({ children, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group focus:ring-primary/50 relative cursor-pointer overflow-hidden rounded-lg px-6 py-2 font-medium transition-all duration-300 ease-in-out hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:outline-none",
        "border border-slate-700 bg-gradient-to-r from-slate-800 to-slate-900 text-white",
        "hover:shadow-primary/25 hover:from-slate-700 hover:to-slate-800 hover:shadow-lg",
        "active:scale-95",
        className,
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      <div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
        }}
      />
    </button>
  );
});

ShinyButton.displayName = "ShinyButton";
