"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ArrowRight, Home } from "lucide-react";
import { useSiteConfig } from "@/components/providers/SiteConfigProvider";
import { useSiteBrand } from "@/components/providers/SiteBrandProvider";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { isBrandNavActive } from "@/lib/site-brand";
import { cn } from "@/lib/utils";

const DARK_HERO_ROUTES = new Set(["/", "/op-kids", "/institute"]);

export function Navbar() {
  const siteConfig = useSiteConfig();
  const { brand, navLinks, isKids, isInstitute, isMixed, exitToMainSite } =
    useSiteBrand();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString()
    ? `?${searchParams.toString()}`
    : "";

  const hasDarkHero = DARK_HERO_ROUTES.has(pathname);
  const overHero = hasDarkHero && !isScrolled;

  const phone = isKids ? siteConfig.kidsPhone : siteConfig.phone;
  const logoHref = isKids ? "/op-kids" : isInstitute ? "/institute" : "/";
  const logoSrc = isKids
    ? "/logos/op-kids-logo.png"
    : "/logos/op-institute-logo.png";
  const brandTitle = isKids
    ? "OP Kids Pre School"
    : "OP Institute of Studies";
  const brandSubtitle = isKids
    ? "Joyful early learning"
    : isInstitute
      ? "Since 2003"
      : "Since 2003 · OP Kids Pre School";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, search]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const activePillClass = isKids
    ? overHero
      ? "bg-white/20 ring-1 ring-inset ring-white/25"
      : "bg-kids-500 shadow-sm shadow-kids-500/30"
    : overHero
      ? "bg-white/20 ring-1 ring-inset ring-white/25"
      : "bg-brand-600 shadow-sm shadow-brand-600/30";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-[var(--op-announce-h,0px)] z-50 transition-all duration-300 ease-out",
        overHero
          ? "bg-transparent"
          : "bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200/70 dark:border-white/10",
        !overHero &&
          isScrolled &&
          "shadow-[0_10px_30px_-12px_rgba(15,23,42,0.18)]",
        isScrolled ? "py-1.5" : "py-2.5"
      )}
    >
      <div
        className={cn(
          "hidden lg:block overflow-hidden transition-all duration-300",
          isScrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
        )}
      >
        <div
          className={cn(
            "container-custom flex items-center justify-between py-1.5 text-[13px] border-b",
            overHero
              ? "border-white/15"
              : "border-gray-200/70 dark:border-white/10"
          )}
        >
          <a
            href={`tel:${phone}`}
            className={cn(
              "flex items-center gap-1.5 font-medium transition-colors",
              overHero
                ? "text-white/80 hover:text-white"
                : "text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400"
            )}
          >
            <Phone className="w-3.5 h-3.5" />
            {phone}
          </a>
          <div className="flex items-center gap-4">
            {!isMixed && (
              <Link
                href="/"
                onClick={() => exitToMainSite()}
                className={cn(
                  "inline-flex items-center gap-1.5 font-semibold transition-colors",
                  overHero
                    ? "text-white/90 hover:text-white"
                    : isKids
                      ? "text-kids-600 hover:text-kids-700"
                      : "text-brand-600 hover:text-brand-700"
                )}
              >
                <Home className="w-3.5 h-3.5" />
                Main site
              </Link>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>

      <nav className="container-custom flex items-center justify-between gap-4">
        <Link
          href={logoHref}
          className="flex items-center gap-2 sm:gap-2.5 group shrink-0"
        >
          <span
            className={cn(
              "flex items-center justify-center rounded-xl transition-all duration-300",
              overHero
                ? "bg-white/10 ring-1 ring-white/20 p-0.5 sm:p-1"
                : isKids
                  ? "bg-white ring-1 ring-kids-100 p-0.5"
                  : "bg-transparent p-0"
            )}
          >
            <Image
              src={logoSrc}
              alt={`${brandTitle} logo`}
              width={isKids ? 120 : 56}
              height={isKids ? 64 : 56}
              priority
              className={cn(
                "object-contain transition-transform duration-300 group-hover:scale-105",
                isKids
                  ? "h-8 w-auto sm:h-9"
                  : "h-9 w-9 sm:h-11 sm:w-11"
              )}
            />
          </span>
          <div className="hidden sm:block">
            <p
              className={cn(
                "font-display font-bold text-[15px] leading-tight transition-colors",
                overHero ? "text-white" : "text-brand-900 dark:text-white"
              )}
            >
              {brandTitle}
            </p>
            <p
              className={cn(
                "text-[10.5px] tracking-wide transition-colors",
                overHero ? "text-white/70" : "text-gray-500 dark:text-gray-400"
              )}
            >
              {isMixed ? (
                <>
                  Since 2003
                  <span
                    className={cn(
                      "font-semibold",
                      overHero ? "text-kids-200" : "text-kids-500"
                    )}
                  >
                    {" · OP Kids Pre School"}
                  </span>
                </>
              ) : (
                brandSubtitle
              )}
            </p>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => {
            const active = isBrandNavActive(link.href, pathname, search);
            return (
              <Link
                key={`${brand}-${link.href}-${link.label}`}
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
                    className={cn("absolute inset-0 rounded-full", activePillClass)}
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                {!active && (
                  <span
                    className={cn(
                      "absolute inset-0 rounded-full opacity-0 transition-opacity duration-200 hover:opacity-100",
                      overHero
                        ? "bg-white/10"
                        : isKids
                          ? "bg-kids-50 dark:bg-white/5"
                          : "bg-brand-50 dark:bg-white/5"
                    )}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1">
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <Link href="/admissions">
            <Button
              size="sm"
              variant={
                overHero ? "secondary" : isKids ? "kids" : "primary"
              }
              className="group"
            >
              Enquire Now
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
              overHero
                ? "bg-white/15 ring-1 ring-white/25 text-white backdrop-blur-sm"
                : isKids
                  ? "bg-kids-50 dark:bg-white/5 text-kids-700 dark:text-white"
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
                {!isMixed && (
                  <Link
                    href="/"
                    onClick={() => exitToMainSite()}
                    className={cn(
                      "mb-2 flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold",
                      isKids
                        ? "bg-kids-50 text-kids-700"
                        : "bg-brand-50 text-brand-700"
                    )}
                  >
                    <Home className="w-3.5 h-3.5" />
                    Main site
                  </Link>
                )}

                {navLinks.map((link, i) => {
                  const active = isBrandNavActive(link.href, pathname, search);
                  return (
                    <motion.div
                      key={`${brand}-${link.href}-${link.label}`}
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
                            ? isKids
                              ? "bg-kids-500 text-white"
                              : "bg-brand-600 text-white"
                            : "text-gray-700 dark:text-gray-200 hover:bg-brand-50 dark:hover:bg-white/5"
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}

                <div className="pt-2 mt-1 border-t border-gray-100 dark:border-white/10 space-y-3">
                  <Link href="/admissions" className="block pt-1">
                    <Button
                      variant={isKids ? "kids" : "primary"}
                      className="w-full group"
                    >
                      Enquire Now
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  </Link>
                  <a
                    href={`tel:${phone}`}
                    className="flex items-center justify-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    {phone}
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
