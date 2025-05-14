"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

interface SwitchProps {
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

export function Switch({ defaultChecked = false, onChange }: SwitchProps) {
  const [enabled, setEnabled] = useState(defaultChecked);

  const handleClick = () => {
    const newValue = !enabled;
    setEnabled(newValue);
    onChange?.(newValue);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={handleClick}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:outline-hidden",
        enabled ? "bg-purple-600" : "bg-gray-200",
      )}
    >
      <span className="sr-only">Toggle notification</span>
      <span
        className={cn(
          "inline-block size-4 rounded-full bg-white transition-transform",
          enabled ? "translate-x-6" : "translate-x-1",
        )}
      />
    </button>
  );
}
