"use client";

import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export function LogoutButton({
  variant = "default",
}: {
  variant?: "default" | "sidebar";
}) {
  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    // Hard redirect so auth cookies are fully cleared before the login page loads
    window.location.assign("/admin/login");
  };

  return (
    <button
      onClick={handleLogout}
      className={cn(
        "w-full inline-flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition",
        variant === "sidebar"
          ? "text-red-300/90 hover:bg-red-500/15 hover:text-red-200"
          : "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
      )}
    >
      <LogOut className="w-4 h-4" />
      Logout
    </button>
  );
}
