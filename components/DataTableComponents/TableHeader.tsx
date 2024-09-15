"use client";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";
import React, { useState } from "react";
import {
  Options,
  SelectValue,
} from "react-tailwindcss-select/dist/components/type";
import { generateSlug } from "@/lib/generateSlug";
// import { createBulkServices } from "@/actions/service";
// import { createBulkVehicles } from "@/actions/vehicles";
import toast from "react-hot-toast";
import Link from "next/link";
import { ArrowBigLeft, PlusCircle } from "lucide-react";

type TableHeaderProps = {
  title: string;
  href: string;
  linkTitle: string;
  data: any;
  model: string;
  showImport?: boolean;
};
export default function TableHeader({
  title,
  href,
  linkTitle,
  data,
  model,
  showImport = true,
}: TableHeaderProps) {
  const [status, setStatus] = useState<SelectValue>(null);
  const [date, setDate] = useState<SelectValue>(null);
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [jsonData, setJsonData] = useState("");
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  let excelDownload = "#";

  if (model === "customers") {
    excelDownload = "/Customer.xlsx";
  } else if (model === "payments") {
    excelDownload = "/payments.xlsx";
  } else if (model === "orders") {
    excelDownload = "/Orders.xlsx";
  } else if (model === "location") {
    excelDownload = "/Locations.xlsx";
  }
  const options: Options = [
    { value: "true", label: "Active" },
    { value: "false", label: "Disabled" },
  ];

  const dateOptions: Options = [
    { value: "lastMonth", label: "Last Month" },
    { value: "thisMonth", label: "This Month" },
  ];

  const handleStatusChange = (item: SelectValue) => {
    console.log("value:", item);
    setStatus(item);
  };

  const handleDateChange = (item: SelectValue) => {
    console.log("value:", item);
    setDate(item);
  };

  function previewData() {
    setPreview(true);
    if (excelFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        if (data) {
          const workbook = XLSX.read(data, { type: "binary" });
          // SheetName
          const sheetName = workbook.SheetNames[0];
          // Worksheet
          const workSheet = workbook.Sheets[sheetName];
          // Json
          const json = XLSX.utils.sheet_to_json(workSheet);
          setJsonData(JSON.stringify(json, null, 2));
        }
      };
      reader.readAsBinaryString(excelFile);
    }
  }

  function saveData() {
    setPreview(false);
    if (excelFile) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = e.target?.result;
        if (data) {
          const workbook = XLSX.read(data, { type: "binary" });
          // SheetName
          const sheetName = workbook.SheetNames[0];
          // Worksheet
          const workSheet = workbook.Sheets[sheetName];
          // Json
          const json = XLSX.utils.sheet_to_json(workSheet);
          setJsonData(JSON.stringify(json, null, 2));

          try {
            setLoading(true);
            if (model === "service") {
              const services = json.map((item: any) => {
                return {
                  title: item.Title,
                  arabicTitle: item.arabicTitle,
                  slug: generateSlug(item.Title),
                  description: item.Description,
                  imageUrl: item.Image,
                  status: true,
                };
              });
              //   await createBulkServices(services);
            } else if (model === "vehicle") {
              const vehicles = json.map((item: any) => {
                return {
                  make: String(item.Make),
                  model: String(item.Model),
                  bodyType: String(item.Type),
                  class: String(item.VehicleClass),
                };
              });
              //   await createBulkVehicles(vehicles);
            }

            setLoading(false);
            setUploadSuccess(true);
            // window.location.reload();
            // toast.success("All Data Synced Successfully with No errors 👍");
          } catch (error) {
            setUploadSuccess(false);
            setLoading(false);
            toast.error("Something went wrong, Please Try again 😢");
            console.log(error);
          }
        }
      };
      reader.readAsBinaryString(excelFile);
    }
  }

  //   function handleExportData() {
  //     console.log("data exported");
  //     const today = new Date();
  //     const filename = Exported `${title} ${today.toDateString()}`;
  //     // console.log(filename);
  //   }

  // console.log(data.length);
  return (
    <div className=" mb-3">
      <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-600 py-3">
        <h2 className="scroll-m-20  text-2xl font-semibold tracking-tight first:mt-0">
          {title}({data.length})
        </h2>
        <div className="ml-auto flex items-center gap-2">

          <Button size="sm" asChild className="h-8 gap-1">
            <Link href={href}>
            <ArrowBigLeft className="h-3.5 w-3.5"/>
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                {linkTitle}
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
