"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { Bell, Settings } from "lucide-react";

import { Button } from "@/components/Button";
import { Switch } from "@/components/Switch";
import { Table } from "@/components/Table";

type Notification = {
  message: string;
  time: string;
  status: "Unread" | "Read";
  actions: string;
};

const data: Notification[] = [
  {
    message: "New job assigned: Oil Change for Toyota Camry",
    time: "10 minutes ago",
    status: "Unread",
    actions: "View",
  },
  {
    message: "Inventory Alert: Low stock on Oil Filters",
    time: "1 hour ago",
    status: "Read",
    actions: "View",
  },
  {
    message: "Job Completed: Brake Replacement for Ford F-150",
    time: "2 hours ago",
    status: "Read",
    actions: "View",
  },
];

const columnHelper = createColumnHelper<Notification>();

const columns = [
  columnHelper.accessor("message", {
    header: "Message",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("time", {
    header: "Time",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => (
      <span
        className={
          info.getValue() === "Unread" ? "text-blue-600" : "text-gray-600"
        }
      >
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor("actions", {
    header: "Actions",
    cell: (info) => (
      <Button variant="secondary" size="sm">
        {info.getValue()}
      </Button>
    ),
  }),
];

export default function NotificationsPage() {
  return (
    <main className="p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Notifications</h1>
          <Button variant="secondary">
            <Settings className="mr-2 size-5" />
            Settings
          </Button>
        </div>

        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          {/* Notification Preferences */}
          <div className="rounded-2xl bg-white p-6 shadow-xs">
            <h2 className="mb-6 text-2xl font-bold">
              Notification Preferences
            </h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-base">New Job Assignments</span>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base">Inventory Alerts</span>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base">Job Completions</span>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base">Customer Messages</span>
                <Switch />
              </div>
            </div>
          </div>

          {/* Notification Summary */}
          <div className="rounded-2xl bg-white p-6 shadow-xs">
            <h2 className="mb-6 text-2xl font-bold">Notification Summary</h2>
            <div className="mb-6 flex items-center gap-2">
              <Bell className="size-6 text-blue-600" />
              <span className="text-xl font-bold">1</span>
              <span className="text-xl">New Notifications</span>
            </div>
            <Button className="w-full">Mark All as Read</Button>
          </div>
        </div>

        {/* Recent Notifications */}
        <div className="rounded-2xl bg-white p-6 shadow-xs">
          <h2 className="mb-6 text-2xl font-bold">Recent Notifications</h2>
          <Table columns={columns} data={data} />
        </div>
      </div>
    </main>
  );
}
