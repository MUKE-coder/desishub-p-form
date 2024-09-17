"use client";

import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import {
  PrinterIcon,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DeleteFn from "@/components/deleteFn";
import { useRouter } from "next/navigation";
 
function DeletePopup({onConfirm, onCancel, id }:any) {
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="rounded-lg bg-white p-8 shadow-2xl">
        <h2 className="text-lg font-bold">Are you sure you want to delete?</h2>

        <p className="mt-2 text-sm text-gray-500">
          This action cannot be undone. Are you sure you want to proceed?
        </p>

        <div className="mt-4 flex gap-2 justify-between">

        <button
            type="button"
            className="rounded bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
            onClick={onCancel}
          >
            Cancel
          </button>
           <DeleteFn onConfirm={onConfirm} id={id}/>
        </div>
      </div>
    </div>
  );
}

const ActionsCell = ({ id }: { id: string }) => {
  const router = useRouter()
  const [showPopup, setShowPopup] = useState(false);

  const handleDelete = () => {
    // Implement delete logic here

    console.log("Item deleted");
    setShowPopup(false);
    router.push("/reports")
    router.refresh()
    window.location.reload();
  };
 
  return (
    <>
      <Button
        onClick={() => setShowPopup(true)}
        className="flex items-center gap-2 text-red-600"
      >
        <TrashIcon className="w-4 h-4" />
        <span>Delete</span>
      </Button>
      {showPopup && (
        <DeletePopup
          onConfirm={handleDelete}
          onCancel={() => setShowPopup(false)}
          id={id}
        />
      )}
    </>
  );
}

const getAttendanceForDay = (person: any | any[], day: string) => {
  const checkAttendance = (item: any) => item.day.toLowerCase() === day.toLowerCase();
  const hasAttended = Array.isArray(person)
  ? person.some(checkAttendance)
  : checkAttendance(person);
  if(hasAttended){
    return (
      <div className="">
        <span className="font-medium text-sm text-green-600">
          <Link href={`/view-details/${person.id}`}>Full Report</Link>
        </span>
      </div>
    );
  }



  return (
    <div>
      <span className="text-red-400 text-sm">------</span>
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
    cell: ({ row }) =>getAttendanceForDay(row.original.reports || row.original, "Monday"),
  },
  {
    accessorKey: "tuesday",
    header: ({ column }) => <SortableColumn column={column} title="Tuesday" />,
    cell: ({ row }) => getAttendanceForDay(row.original.reports || row.original, "Tuesday"),
  },
  {
    accessorKey: "wednesday",
    header: ({ column }) => (
      <SortableColumn column={column} title="Wednesday" />
    ),
    cell: ({ row }) => getAttendanceForDay(row.original.reports || row.original, "Wednesday"),
  },
  {
    accessorKey: "thursday",
    header: ({ column }) => <SortableColumn column={column} title="Thursday" />,
    cell: ({ row }) =>  getAttendanceForDay(row.original.reports || row.original, "Thursday"),
  },
  {
    accessorKey: "friday",
    header: ({ column }) => <SortableColumn column={column} title="Friday" />,
    cell: ({ row }) => getAttendanceForDay(row.original.reports || row.original, "Friday"),
  },
  {
    id: "actions",
    cell: ({ row }: any) => <ActionsCell id={row.original.id} />,
  },
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
 




