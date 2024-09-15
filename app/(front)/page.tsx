import { getMembers } from "@/Actions/memberActions";
import BoldHeading from "@/components/BoldHeading";
import PerformanceTrackingForm from "@/components/PerformanceForm";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="">
      <div className="flex justify-end  px-4">
        <Link
          className="inline-flex items-center px-4 py-2 
        bg-blue-600 text-white rounded-full
        shadow-lg hover:bg-blue-700 transition-colors duration-200
        font-semibold text-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
      "
          href="/reports"
        >
          <span>Table of Reports</span> <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="text-center">
        <BoldHeading heading="Desishub Daily Performance Report" />
      </div>
      <div></div>
      <div className="py-8">
        <PerformanceTrackingForm />
        <h2>hello world</h2>
      </div>
    </main>
  );
}
