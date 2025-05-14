"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { Plus } from "lucide-react";

import { Button } from "@/components/Button";
import { Table } from "@/components/Table";

type Part = {
  id: number;
  name: string;
  quantity: number;
  reorderPoint: number;
  supplier: string;
  lastOrdered: string;
  price: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
};

const data: Part[] = [
  {
    id: 1,
    name: "Oil Filter",
    quantity: 50,
    reorderPoint: 20,
    supplier: "AutoParts Inc.",
    lastOrdered: "2023-05-15",
    price: 15.99,
    status: "In Stock",
  },
  {
    id: 2,
    name: "Brake Pads",
    quantity: 15,
    reorderPoint: 25,
    supplier: "BrakeMasters",
    lastOrdered: "2023-06-01",
    price: 45.5,
    status: "Low Stock",
  },
  {
    id: 3,
    name: "Spark Plugs",
    quantity: 100,
    reorderPoint: 50,
    supplier: "ElectroParts",
    lastOrdered: "2023-05-20",
    price: 8.75,
    status: "In Stock",
  },
];

const columnHelper = createColumnHelper<Part>();

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: "Part Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("quantity", {
    header: "Quantity",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("reorderPoint", {
    header: "Reorder Point",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("supplier", {
    header: "Supplier",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("lastOrdered", {
    header: "Last Ordered",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("price", {
    header: "Price",
    cell: (info) => `$${info.getValue().toFixed(2)}`,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => (
      <span
        className={
          info.getValue() === "In Stock"
            ? "text-green-600"
            : info.getValue() === "Low Stock"
              ? "text-red-600"
              : "text-yellow-600"
        }
      >
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: () => (
      <Button variant="secondary" size="sm">
        Update
      </Button>
    ),
  }),
];

export default function InventoryPage() {
  return (
    <main className="p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Parts Inventory</h1>
          <Button>
            <Plus className="mr-2 size-5" />
            Add Part
          </Button>
        </div>

        <Table columns={columns} data={data} />
      </div>
    </main>
  );
}
