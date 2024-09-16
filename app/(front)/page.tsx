import { getMembers } from "@/Actions/memberActions";
import BoldHeading from "@/components/BoldHeading";
import PerformanceTrackingForm from "@/components/PerformanceForm";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  
  return (
    <main className="">
      <div className="text-center">
        <BoldHeading heading="Desishub Daily Performance Report" />
      </div>
      <div>
        
      </div>
      <div className="py-8">
        <div className="flex justify-end">
          <Link className="bg-black text-white px-3 py-2 rounded-md" href="/reports">Table of Reports</Link>
        </div>
        <PerformanceTrackingForm />
      </div>
    </main>
  );
}
