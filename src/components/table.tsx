"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";

import {
  Table as DataTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableProps<TData> {
  data: TData[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<TData, any>[];
  clickable?: boolean;
}

export function Table<TData>({ data, columns, clickable }: TableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  });

  const router = useRouter();

  return (
    <div className="rounded-2xl p-6 shadow-xs">
      <div className="overflow-x-auto">
        <DataTable className="w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="border-b pb-4 text-left text-sm font-medium"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={() =>
                  clickable
                    ? router.push(`/dashboard/jobs/${row.renderValue("id")}`)
                    : null
                }
                className={clickable ? "hover:cursor-pointer" : ""}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="border-b py-4 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </DataTable>
      </div>
    </div>
  );
}
