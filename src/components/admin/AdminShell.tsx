"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export function AdminShell({
  email,
  children,
}: {
  email?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen lg:flex bg-[linear-gradient(160deg,#eef1f8_0%,#f5f6fa_45%,#f0f4fb_100%)] dark:bg-gradient-to-br dark:from-gray-950 dark:via-gray-950 dark:to-[#141b3d]">
      <AdminSidebar email={email} />
      <main className="flex-1 min-w-0 min-h-screen">
        <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8 xl:p-10">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
