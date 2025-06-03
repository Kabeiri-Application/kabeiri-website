"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  flexRender,
  SortingState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";

import { Table as DataTable, TableRow } from "@/components/ui/table";

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
    <div className="rounded-2xl bg-white p-6 shadow-xs">
      <div className="overflow-x-auto">
        <DataTable className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border-b border-gray-200 pb-4 text-left text-sm font-medium text-gray-500"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={() =>
                  clickable
                    ? router.push(`/dashboard/jobs/${row.renderValue("id")}`)
                    : null
                }
                className={clickable ? "cursor-pointer hover:bg-gray-50" : ""}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border-b border-gray-100 py-4 text-sm"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </TableRow>
            ))}
          </tbody>
        </DataTable>
      </div>
    </div>
  );
}
