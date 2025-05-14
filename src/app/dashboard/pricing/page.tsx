"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { Plus } from "lucide-react";

import { Button } from "@/components/Button";
import { Table } from "@/components/Table";

type Service = {
  name: string;
  price: number;
  duration: string;
  actions: string;
};

const data: Service[] = [
  {
    name: "Oil Change",
    price: 50,
    duration: "30 min",
    actions: "Edit",
  },
  {
    name: "Brake Inspection",
    price: 75,
    duration: "45 min",
    actions: "Edit",
  },
  {
    name: "Tire Rotation",
    price: 40,
    duration: "30 min",
    actions: "Edit",
  },
];

const columnHelper = createColumnHelper<Service>();

const columns = [
  columnHelper.accessor("name", {
    header: "Service Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("price", {
    header: "Price",
    cell: (info) => `$${info.getValue()}`,
  }),
  columnHelper.accessor("duration", {
    header: "Duration",
    cell: (info) => info.getValue(),
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

export default function PricingPage() {
  return (
    <main className="p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Pricing Management</h1>
          <Button>
            <Plus className="mr-2 size-5" />
            Add Service
          </Button>
        </div>

        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          {/* Quick Price Update */}
          <div className="rounded-2xl bg-white p-6 shadow-xs">
            <h2 className="mb-6 text-2xl font-bold">Quick Price Update</h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="service"
                  className="mb-2 block text-base font-medium"
                >
                  Service
                </label>
                <select
                  id="service"
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-base focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                >
                  <option>Select a service</option>
                  <option>Oil Change</option>
                  <option>Brake Inspection</option>
                  <option>Tire Rotation</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="mb-2 block text-base font-medium"
                >
                  New Price
                </label>
                <div className="relative">
                  <span className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    id="price"
                    type="text"
                    placeholder="0.00"
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 pl-8 text-base focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                  />
                </div>
              </div>
              <Button className="w-full">Update Price</Button>
            </form>
          </div>

          {/* Bulk Price Adjustment */}
          <div className="rounded-2xl bg-white p-6 shadow-xs">
            <h2 className="mb-6 text-2xl font-bold">Bulk Price Adjustment</h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="percentage"
                  className="mb-2 block text-base font-medium"
                >
                  Adjustment Percentage
                </label>
                <div className="relative">
                  <input
                    id="percentage"
                    type="text"
                    placeholder="0"
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 pr-8 text-base focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                  />
                  <span className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500">
                    %
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="secondary">Increase</Button>
                <Button variant="secondary">Decrease</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Service Pricing List */}
        <div className="rounded-2xl bg-white p-6 shadow-xs">
          <h2 className="mb-6 text-2xl font-bold">Service Pricing List</h2>
          <Table columns={columns} data={data} />
        </div>
      </div>
    </main>
  );
}
