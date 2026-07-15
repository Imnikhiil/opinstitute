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
  Crown,
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
  { href: "/admin/leadership", label: "Leadership", icon: Crown },
  { href: "/admin/faculty", label: "Faculty", icon: Users },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/events", label: "Events", icon: CalendarDays },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/settings", label: "Site Settings", icon: Settings },
];

export function AdminSidebar({ email }: { email?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const active = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            prefetch
            onClick={() => setOpen(false)}
            className={cn(
              "group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-100",
              mobile
                ? active
                  ? "bg-brand-600 text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                : active
                  ? "bg-white/15 text-white shadow-sm ring-1 ring-white/10"
                  : "text-white/65 hover:bg-white/10 hover:text-white"
            )}
          >
            <item.icon className="w-[18px] h-[18px] shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between bg-[#1d2951] px-4 py-3 shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="rounded-lg bg-white/95 p-1">
            <Image
              src="/logos/op-institute-logo.png"
              alt="Admin"
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
            />
          </div>
          <div>
            <p className="font-display font-bold text-sm text-white leading-tight">
              Admin Panel
            </p>
            <p className="text-[10px] text-white/55">OP Institute</p>
          </div>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center hover:bg-white/15 transition"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute top-[60px] left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4 space-y-4 shadow-xl rounded-b-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <NavLinks mobile />
            <div className="pt-3 border-t border-gray-200 dark:border-gray-800 space-y-2">
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <ExternalLink className="w-4 h-4" />
                View Website
              </Link>
              <LogoutButton />
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-[260px] shrink-0 h-screen sticky top-0 bg-gradient-to-b from-[#1d2951] via-[#1a2548] to-[#141b3d] text-white">
        <div className="px-5 pt-6 pb-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white p-1.5 shadow-sm">
              <Image
                src="/logos/op-institute-logo.png"
                alt="Admin"
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
              />
            </div>
            <div>
              <p className="font-display font-bold text-[15px] leading-tight tracking-tight">
                Admin Panel
              </p>
              <p className="text-[11px] text-white/50 mt-0.5">
                OP Institute · OP Kids
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-5">
          <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
            Manage
          </p>
          <NavLinks />
        </div>

        <div className="px-3 pb-5 pt-3 border-t border-white/10 space-y-1.5">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white transition"
          >
            <ExternalLink className="w-4 h-4" />
            View Website
          </Link>
          {email && (
            <div className="px-3 py-2">
              <p className="text-[10px] uppercase tracking-wider text-white/35 mb-0.5">
                Signed in
              </p>
              <p className="text-xs text-white/70 truncate" title={email}>
                {email}
              </p>
            </div>
          )}
          <LogoutButton variant="sidebar" />
        </div>
      </aside>
    </>
  );
}
