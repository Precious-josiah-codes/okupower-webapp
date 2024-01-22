"use client";

import { Toaster } from "@/components/ui/sonner";
import Sidebar from "@/sections/DesktopSidebar";
import MobileSidebar from "@/sections/MobileSidebar";
import Navbar from "@/sections/Navbar";
import { useAccountStore } from "@/store/Account";
import { Inter, Poppins } from "next/font/google";

const poppins = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function DashboardLayout({ children }) {
  const [profile] = useAccountStore((state) => [state.profile]);

  return (
    <main className={poppins.className}>
      {/* desktop side bar */}
      <Sidebar profile={profile} />

      {/* mobile side bar */}
      <MobileSidebar />

      <main className="sm:ml-64 relative h-auto">
        {/* navbar */}
        <Navbar profile={profile} />

        <main className="sm:px-6 px-3 pb-9">{children}</main>
        <Toaster richColors />
      </main>
    </main>
  );
}
