"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Inbox,
  BookOpen,
  Users,
  MessageSquareQuote,
  CalendarDays,
  Images,
  Settings,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LogoutButton } from "./LogoutButton";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/queries", label: "Queries", icon: Inbox },
  { href: "/admin/courses", label: "Courses", icon: BookOpen },
  { href: "/admin/faculty", label: "Faculty", icon: Users },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/events", label: "Events", icon: CalendarDays },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/settings", label: "Site Settings", icon: Settings },
];

export function AdminSidebar({ email }: { email?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const NavLinks = () => (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const active = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition",
              active
                ? "bg-brand-600 text-white shadow-sm"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
          >
            <item.icon className="w-4 h-4 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3">
        <div className="flex items-center gap-2">
          <Image
            src="/logos/op-institute-logo.png"
            alt="Admin"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
          <span className="font-display font-bold text-sm">Admin Panel</span>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black/40" onClick={() => setOpen(false)}>
          <div
            className="absolute top-[57px] left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <NavLinks />
            <div className="pt-3 border-t border-gray-200 dark:border-gray-800">
              <LogoutButton />
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 h-screen sticky top-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-4">
        <div className="flex items-center gap-2.5 px-2 py-2 mb-4">
          <Image
            src="/logos/op-institute-logo.png"
            alt="Admin"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
          <div>
            <p className="font-display font-bold text-sm leading-tight">Admin Panel</p>
            <p className="text-[11px] text-muted-foreground">OP Institute · OP Kids</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <NavLinks />
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <ExternalLink className="w-4 h-4" />
            View Website
          </Link>
          {email && (
            <p className="px-3 text-[11px] text-muted-foreground truncate" title={email}>
              {email}
            </p>
          )}
          <LogoutButton />
        </div>
      </aside>
    </>
  );
}
