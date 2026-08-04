"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Inbox,
  BookOpen,
  Users,
  Crown,
  MessageSquareQuote,
  CalendarDays,
  Images,
  Video,
  Settings,
  Menu,
  X,
  ExternalLink,
  Megaphone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LogoutButton } from "./LogoutButton";
import { AdminPwaInstall } from "./AdminPwaInstall";

const navGroups = [
  {
    label: "Overview",
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
      { href: "/admin/queries", label: "Queries", icon: Inbox },
      { href: "/admin/announcements", label: "Announcements", icon: Megaphone },
    ],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/courses", label: "Courses", icon: BookOpen },
      { href: "/admin/leadership", label: "Leadership", icon: Crown },
      { href: "/admin/faculty", label: "Faculty", icon: Users },
      {
        href: "/admin/testimonials",
        label: "Testimonials",
        icon: MessageSquareQuote,
      },
      { href: "/admin/events", label: "Events", icon: CalendarDays },
      { href: "/admin/gallery", label: "Gallery", icon: Images },
      { href: "/admin/videos", label: "Videos", icon: Video },
    ],
  },
  {
    label: "Site",
    items: [
      { href: "/admin/settings", label: "Settings", icon: Settings },
    ],
  },
];

export function AdminSidebar({
  email,
  standalone = false,
}: {
  email?: string;
  standalone?: boolean;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while drawer is open (mobile)
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="space-y-5">
      {navGroups.map((group) => (
        <div key={group.label}>
          <p
            className={cn(
              "px-3 mb-2 text-[10px] font-semibold uppercase tracking-[0.16em]",
              mobile ? "text-gray-400" : "text-white/35"
            )}
          >
            {group.label}
          </p>
          <nav className="space-y-1">
            {group.items.map((item) => {
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
                    "admin-nav-link group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-100",
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
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div
        className={cn(
          "admin-top-bar lg:hidden sticky top-0 z-40 flex items-center justify-between bg-[#1d2951] px-4 py-3",
          standalone ? "shadow-lg" : "shadow-md"
        )}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex -space-x-1.5 shrink-0">
            <div className="rounded-lg bg-white p-1 ring-2 ring-[#1d2951]">
              <Image
                src="/logos/op-institute-logo.png"
                alt=""
                width={24}
                height={24}
                className="h-6 w-6 object-contain"
              />
            </div>
            <div className="rounded-lg bg-white p-1 ring-2 ring-[#1d2951]">
              <Image
                src="/logos/op-kids-logo.png"
                alt=""
                width={24}
                height={24}
                className="h-6 w-6 object-contain"
              />
            </div>
          </div>
          <div className="min-w-0">
            <p className="font-display font-bold text-sm text-white leading-tight">
              {standalone ? "OP Admin" : "Admin Panel"}
            </p>
            <p className="text-[10px] text-white/55 truncate">
              {email || "OP Institute · OP Kids"}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center hover:bg-white/15 active:bg-white/20 transition shrink-0"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile left drawer — does not cover full screen */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-50 transition-[visibility] duration-200",
          open ? "visible" : "invisible pointer-events-none"
        )}
        aria-hidden={!open}
      >
        <button
          type="button"
          className={cn(
            "absolute inset-0 bg-black/40 transition-opacity duration-200",
            open ? "opacity-100" : "opacity-0"
          )}
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
        <aside
          className={cn(
            "admin-drawer absolute top-0 left-0 bottom-0 flex w-[min(82vw,300px)] flex-col bg-white dark:bg-gray-900 shadow-2xl border-r border-gray-200/80 dark:border-white/10 transition-transform duration-250 ease-out",
            open ? "translate-x-0" : "-translate-x-full"
          )}
          style={{
            paddingTop: standalone
              ? "max(0.75rem, env(safe-area-inset-top))"
              : undefined,
            paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
            paddingLeft: "env(safe-area-inset-left)",
          }}
        >
          <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-gray-100 dark:border-white/10">
            <div className="min-w-0">
              <p className="font-display font-bold text-sm text-[#1d2951] dark:text-white truncate">
                Menu
              </p>
              <p className="text-[10px] text-muted-foreground truncate">
                {email || "Staff panel"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-foreground shrink-0"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
            <NavLinks mobile />
            <div className="pt-3 border-t border-gray-200 dark:border-gray-800 space-y-2">
              <div className="admin-pwa-install">
                <AdminPwaInstall variant="mobile" />
              </div>
              <Link
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <ExternalLink className="w-4 h-4" />
                View website
              </Link>
              <LogoutButton />
            </div>
          </div>
        </aside>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-[268px] shrink-0 h-screen sticky top-0 bg-gradient-to-b from-[#1d2951] via-[#1a2548] to-[#141b3d] text-white">
        <div className="px-5 pt-6 pb-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="rounded-xl bg-white p-1.5 shadow-sm ring-2 ring-[#1d2951]">
                <Image
                  src="/logos/op-institute-logo.png"
                  alt="OP Institute"
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
              </div>
              <div className="rounded-xl bg-white p-1.5 shadow-sm ring-2 ring-[#1d2951]">
                <Image
                  src="/logos/op-kids-logo.png"
                  alt="OP Kids"
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
              </div>
            </div>
            <div>
              <p className="font-display font-bold text-[15px] leading-tight tracking-tight">
                OP Admin
              </p>
              <p className="text-[11px] text-white/50 mt-0.5">
                Institute · Kids
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-5">
          <NavLinks />
        </div>

        <div className="px-3 pb-5 pt-3 border-t border-white/10 space-y-1.5">
          <div className="admin-pwa-install">
            <AdminPwaInstall variant="sidebar" />
          </div>
          <div className="grid grid-cols-2 gap-1.5 px-1 mb-2">
            <Link
              href="/institute"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center text-[10px] font-semibold uppercase tracking-wide px-2 py-2 rounded-lg bg-white/10 text-white/80 hover:bg-white/15 hover:text-white transition"
            >
              Institute
            </Link>
            <Link
              href="/op-kids"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center text-[10px] font-semibold uppercase tracking-wide px-2 py-2 rounded-lg bg-kids-500/20 text-kids-200 hover:bg-kids-500/30 hover:text-white transition"
            >
              Kids
            </Link>
          </div>
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white transition"
          >
            <ExternalLink className="w-4 h-4" />
            Main website
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
