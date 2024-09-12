"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  PrinterIcon,
  SquareArrowOutUpRight,
} from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ActionsCell = ({ order }: { order: any }) => {
  const editEndpoint = `orders/${order.orderNumber}`;

  return (
    <Link href={editEndpoint} className="flex items-center gap-2">
      <PrinterIcon className="w-4 h-4" />
      <span>Print Voucher</span>
    </Link>
  );
};

const getAttendanceForDay = (person: any, day: any) => {
  if (person.day.toLowerCase() === day.toLowerCase()) {
    return (
      <div className="relative">
        <span className="font-medium text-sm text-green-600">Attendend</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="absolute top-[-65%] right-[52%]">
              <Link href="#">
                <SquareArrowOutUpRight className="w-4 h-4" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>View report Details</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  }
  return (
    <div>
      <span className="text-red-400 text-sm">No Report</span>
    </div>
  );
};

export const columns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortableColumn column={column} title="Name" />,
    cell: ({ row }) => `${row.original.name}`,
  },
  {
    accessorKey: "monday",
    header: ({ column }) => <SortableColumn column={column} title="Monday" />,
    cell: ({ row }) => getAttendanceForDay(row.original, "Monday"),
  },
  {
    accessorKey: "tuesday",
    header: ({ column }) => <SortableColumn column={column} title="Tuesday" />,
    cell: ({ row }) => getAttendanceForDay(row.original, "Tuesday"),
  },
  {
    accessorKey: "wednesday",
    header: ({ column }) => (
      <SortableColumn column={column} title="Wednesday" />
    ),
    cell: ({ row }) => getAttendanceForDay(row.original, "Wednesday"),
  },
  {
    accessorKey: "thursday",
    header: ({ column }) => <SortableColumn column={column} title="Thursday" />,
    cell: ({ row }) => getAttendanceForDay(row.original, "Thursday"),
  },
  {
    accessorKey: "friday",
    header: ({ column }) => <SortableColumn column={column} title="Friday" />,
    cell: ({ row }) => getAttendanceForDay(row.original, "Friday"),
  },
  // {
  //   id: "actions",
  //   cell: ({ row }: any) => <ActionsCell order={row.original} />,
  // },
];

const EnhancedWeeklyAttendanceTable = ({ data }: any) => {
  // Your table component using the columns defined above
  // This will depend on the specific table library you're using
  // For example, if you're using TanStack Table (React Table):

  // import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'

  // const table = useReactTable({
  //   data,
  //   columns,
  //   getCoreRowModel: getCoreRowModel(),
  // })

  // return (
  //   <table>
  //     <thead>
  //       {table.getHeaderGroups().map(headerGroup => (
  //         <tr key={headerGroup.id}>
  //           {headerGroup.headers.map(header => (
  //             <th key={header.id}>
  //               {flexRender(
  //                 header.column.columnDef.header,
  //                 header.getContext()
  //               )}
  //             </th>
  //           ))}
  //         </tr>
  //       ))}
  //     </thead>
  //     <tbody>
  //       {table.getRowModel().rows.map(row => (
  //         <tr key={row.id}>
  //           {row.getVisibleCells().map(cell => (
  //             <td key={cell.id}>
  //               {flexRender(cell.column.columnDef.cell, cell.getContext())}
  //             </td>
  //           ))}
  //         </tr>
  //       ))}
  //     </tbody>
  //   </table>
  // )

  return (
    <div>
      {/* Implement your table component here using the columns defined above */}
    </div>
  );
};

export default EnhancedWeeklyAttendanceTable;
