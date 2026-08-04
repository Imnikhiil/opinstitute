"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  CalendarDays,
  Images,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";

const tabs: {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
}[] = [
  { href: "/admin", label: "Home", icon: LayoutDashboard, exact: true },
  { href: "/admin/queries", label: "Queries", icon: Inbox },
  { href: "/admin/events", label: "Events", icon: CalendarDays },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
];

/**
 * Native-style bottom tabs — shown on phone when Admin is installed as an app.
 */
export function AdminBottomNav({
  onOpenMenu,
}: {
  onOpenMenu: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav
      className="admin-bottom-nav lg:hidden fixed bottom-0 inset-x-0 z-50 border-t border-white/10 bg-[#1d2951]/96 backdrop-blur-xl"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      aria-label="App navigation"
    >
      <div className="grid grid-cols-5 gap-0.5 px-1 pt-1.5 pb-1">
        {tabs.map((tab) => {
          const active = tab.exact
            ? pathname === tab.href
            : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              prefetch
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 py-2 rounded-xl text-[10px] font-semibold transition-colors",
                active
                  ? "text-white bg-white/15"
                  : "text-white/55 active:bg-white/10 active:text-white"
              )}
            >
              <tab.icon
                className={cn("w-5 h-5", active && "text-white")}
                strokeWidth={active ? 2.4 : 2}
              />
              {tab.label}
            </Link>
          );
        })}
        <button
          type="button"
          onClick={onOpenMenu}
          className="flex flex-col items-center justify-center gap-0.5 py-2 rounded-xl text-[10px] font-semibold text-white/55 active:bg-white/10 active:text-white"
        >
          <Menu className="w-5 h-5" />
          More
        </button>
      </div>
    </nav>
  );
}
