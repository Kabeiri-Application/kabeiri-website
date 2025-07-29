"use client";

import React from "react";

import { ExternalLinkIcon, MoreHorizontalIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Job } from "@/db/app.schema";

interface JobRowActionsProps {
  job: Job;
  onEdit?: (job: Job) => void;
  onDelete?: (job: Job) => void;
  onView?: (job: Job) => void;
}

export function JobRowActions({
  job,
  onEdit,
  onDelete,
  onView,
}: JobRowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="p-1">
          {onView && (
            <button
              onClick={() => onView(job)}
              className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ExternalLinkIcon className="h-4 w-4" />
              View Details
            </button>
          )}
          {onEdit && (
            <button
              onClick={() => onEdit(job)}
              className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Edit Job
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(job)}
              className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
            >
              Delete Job
            </button>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
