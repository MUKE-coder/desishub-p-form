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
        <h1 className="lg:text-3xl md:text-2xl text-[1.1rem] font-bold mb-2 text-center text-blue-600">
          Daily Performance Tracking
        </h1>
      </div>

       <div className="lg:p-8 md:p-4 p-2">
      <TableHeader
        title="All Users"
        model="users"
        linkTitle="Back to form"
        href="/"
        data={dataFetched}
      />
      <DataTable columns={columns} data={dataFetched} />
    </div>
  </div>
  );
}
