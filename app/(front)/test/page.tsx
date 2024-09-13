import { allFormData } from "@/Actions/trackingFormActions";
import BoldHeading from "@/components/BoldHeading";
import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "@/components/DataTableComponents/TableHeader";
import React from "react";
import { columns } from "./columns";

export default async function page() {
  const dataFetched = await allFormData();

  return (
  <div>
      <div className="flex flex-col gap-8">
        <div className="text-center">
          <BoldHeading heading="Desishub Daily Performance Report" />
        </div>
        <h1 className="text-3xl font-bold mb-2 text-center text-blue-600">
          Daily Performance Tracking
        </h1>
      </div>

       <div className="p-8">
      <TableHeader
        title="All Users"
        model="users"
        linkTitle="Add User"
        href="adduser"
        data={dataFetched}
      />
      <DataTable columns={columns} data={dataFetched} />
    </div>
  </div>
  );
}
