import Navbar from "@/components/Navbar";
import { SiteHeader } from "@/components/site-header";
import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="lg:px-8 md:px-6 px-1 lg:py-8 md:py-6 py-4">
      {/* <SiteHeader /> */}
      {children}
    </div>
  );
}
