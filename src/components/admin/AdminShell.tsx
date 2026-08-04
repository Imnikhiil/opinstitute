"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminPwaInstall } from "@/components/admin/AdminPwaInstall";
import { AdminBottomNav } from "@/components/admin/AdminBottomNav";
import { useAdminStandalone } from "@/components/admin/useAdminStandalone";

export function AdminShell({
  email,
  children,
}: {
  email?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const standalone = useAdminStandalone();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="admin-app-root min-h-screen lg:flex bg-[linear-gradient(160deg,#eef1f8_0%,#f5f6fa_45%,#f0f4fb_100%)] dark:bg-gradient-to-br dark:from-gray-950 dark:via-gray-950 dark:to-[#141b3d]"
    >
      <AdminSidebar
        email={email}
        menuOpen={menuOpen}
        onMenuOpenChange={setMenuOpen}
        standalone={standalone}
      />
      <main className="flex-1 min-w-0 min-h-screen">
        <div
          className={`mx-auto max-w-7xl p-4 sm:p-6 lg:p-8 xl:p-10 ${
            standalone ? "admin-main-pad" : ""
          }`}
        >
          {pathname === "/admin" && !standalone ? (
            <div className="lg:hidden mb-4 admin-pwa-install">
              <AdminPwaInstall variant="banner" />
            </div>
          ) : null}
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </div>
      </main>
      {standalone ? (
        <AdminBottomNav onOpenMenu={() => setMenuOpen(true)} />
      ) : null}
    </div>
  );
}
