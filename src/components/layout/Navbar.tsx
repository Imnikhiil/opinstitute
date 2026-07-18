"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ArrowRight } from "lucide-react";
import { navLinks } from "@/data/site";
import { useSiteConfig } from "@/components/providers/SiteConfigProvider";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// Routes that render a dark, full-bleed hero behind the header. On these the
// navbar can float transparently with light text at the top of the page. On
// every other route the hero is light, so the navbar must stay solid/visible.
const DARK_HERO_ROUTES = new Set(["/", "/op-kids"]);

export function Navbar() {
  const siteConfig = useSiteConfig();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const hasDarkHero = DARK_HERO_ROUTES.has(pathname);
  // Only float over the hero when we're on a dark-hero page AND at the top.
  const overHero = hasDarkHero && !isScrolled;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out",
        overHero
          ? "bg-transparent"
          : "bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200/70 dark:border-white/10",
        !overHero && isScrolled && "shadow-[0_10px_30px_-12px_rgba(15,23,42,0.18)]",
        isScrolled ? "py-1.5" : "py-2.5"
      )}
    >
      {/* Top utility bar (desktop only) */}
      <div
        className={cn(
          "hidden lg:block overflow-hidden transition-all duration-300",
          isScrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
        )}
      >
        <div
          className={cn(
            "container-custom flex items-center justify-between py-1.5 text-[13px] border-b",
            overHero ? "border-white/15" : "border-gray-200/70 dark:border-white/10"
          )}
        >
          <a
            href={`tel:${siteConfig.phone}`}
            className={cn(
              "flex items-center gap-1.5 font-medium transition-colors",
              overHero
                ? "text-white/80 hover:text-white"
                : "text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400"
            )}
          >
            <Phone className="w-3.5 h-3.5" />
            {siteConfig.phone}
          </a>
          <div className="flex items-center gap-4">
            <Link
              href="/admissions"
              className={cn(
                "group inline-flex items-center gap-1.5 font-semibold transition-colors",
                overHero
                  ? "text-white/90 hover:text-white"
                  : "text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
              )}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-kids-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-kids-500" />
              </span>
              Admissions Open 2026-27
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Main navigation row */}
      <nav className="container-custom flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
          <span
            className={cn(
              "flex items-center justify-center rounded-xl transition-all duration-300",
              overHero
                ? "bg-white/10 ring-1 ring-white/20 p-0.5 sm:p-1"
                : "bg-transparent p-0"
            )}
          >
            <Image
              src="/logos/op-institute-logo.png"
              alt="OP Institute of Studies logo"
              width={48}
              height={48}
              priority
              className="h-8 w-8 sm:h-10 sm:w-10 object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </span>
          <div className="hidden sm:block">
            <p
              className={cn(
                "font-display font-bold text-[15px] leading-tight transition-colors",
                overHero ? "text-white" : "text-brand-900 dark:text-white"
              )}
            >
              OP Institute of Studies
            </p>
            <p
              className={cn(
                "text-[10.5px] tracking-wide transition-colors",
                overHero ? "text-white/70" : "text-gray-500 dark:text-gray-400"
              )}
            >
              Since 2003
              <span
                className={cn(
                  "font-semibold",
                  overHero ? "text-kids-200" : "text-kids-500"
                )}
              >
                {" · OP Kids Pre School"}
              </span>
            </p>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-3 py-2 text-[13.5px] font-medium transition-colors duration-200",
                  active
                    ? "text-white"
                    : overHero
                      ? "text-white/80 hover:text-white"
                      : "text-gray-600 dark:text-gray-300 hover:text-brand-700 dark:hover:text-white"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className={cn(
                      "absolute inset-0 rounded-full",
                      overHero
                        ? "bg-white/20 ring-1 ring-inset ring-white/25"
                        : "bg-brand-600 shadow-sm shadow-brand-600/30"
                    )}
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                {!active && (
                  <span
                    className={cn(
                      "absolute inset-0 rounded-full opacity-0 transition-opacity duration-200 hover:opacity-100",
                      overHero ? "bg-white/10" : "bg-brand-50 dark:bg-white/5"
                    )}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1">
                  {link.label}
                  {link.highlight && (
                    <span
                      className={cn(
                        "rounded-full px-1.5 py-px text-[9px] font-bold uppercase leading-none tracking-wide",
                        active ? "bg-white/25 text-white" : "bg-kids-500 text-white"
                      )}
                    >
                      New
                    </span>
                  )}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <Link href="/admissions">
            <Button
              size="sm"
              variant={overHero ? "secondary" : "primary"}
              className="group"
            >
              Enquire Now
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
              overHero
                ? "bg-white/15 ring-1 ring-white/25 text-white backdrop-blur-sm"
                : "bg-brand-50 dark:bg-white/5 text-brand-700 dark:text-white"
            )}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="w-5 h-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="lg:hidden fixed inset-0 top-0 -z-10 bg-gray-950/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="lg:hidden absolute inset-x-3 top-full mt-2 origin-top rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white dark:bg-gray-950 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.35)] overflow-hidden"
            >
              <div className="p-3 space-y-1 max-h-[calc(100vh-8rem)] overflow-y-auto">
                {navLinks.map((link, i) => {
                  const active = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i, duration: 0.2 }}
                    >
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center justify-between px-4 py-3 rounded-xl text-[15px] font-medium transition-colors",
                          active
                            ? "bg-brand-600 text-white"
                            : "text-gray-700 dark:text-gray-200 hover:bg-brand-50 dark:hover:bg-white/5"
                        )}
                      >
                        {link.label}
                        {link.highlight && (
                          <span
                            className={cn(
                              "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                              active
                                ? "bg-white/25 text-white"
                                : "bg-kids-500 text-white"
                            )}
                          >
                            New
                          </span>
                        )}
                      </Link>
                    </motion.div>
                  );
                })}

                <div className="pt-2 mt-1 border-t border-gray-100 dark:border-white/10 space-y-3">
                  <Link href="/admissions" className="block pt-1">
                    <Button className="w-full group">
                      Enquire Now
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  </Link>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="flex items-center justify-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    {siteConfig.phone}
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
