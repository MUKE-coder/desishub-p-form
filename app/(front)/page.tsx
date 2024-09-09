import BoldHeading from "@/components/BoldHeading";
import PerformanceTrackingForm from "@/components/PerformanceForm";
import Image from "next/image";

export default function Home() {
  return (
    <main className="p-8">
      <div className="text-center">
        <BoldHeading heading="Desishub Daily Performance Report" />
      </div>
      <div className="py-8 px-0">
        <PerformanceTrackingForm />
      </div>
    </main>
  );
}
