"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { navLinks } from "@/data/site";
import { useSiteConfig } from "@/components/providers/SiteConfigProvider";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const siteConfig = useSiteConfig();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl shadow-md shadow-black/5 py-2"
          : "bg-transparent py-4"
      )}
    >
      <div
        className={cn(
          "hidden lg:block border-b transition-all duration-300",
          isScrolled
            ? "border-gray-200/60 dark:border-gray-800/50"
            : "border-white/15"
        )}
      >
        <div className="container-custom flex items-center justify-between py-2 text-sm">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${siteConfig.phone}`}
              className={cn(
                "flex items-center gap-1.5 transition-colors",
                isScrolled
                  ? "text-gray-600 dark:text-gray-400 hover:text-brand-600"
                  : "text-white/85 hover:text-white"
              )}
            >
              <Phone className="w-3.5 h-3.5" />
              {siteConfig.phone}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/admissions"
              className={cn(
                "font-medium transition-colors",
                isScrolled
                  ? "text-brand-600 hover:text-brand-700"
                  : "text-white/90 hover:text-white"
              )}
            >
              Admissions Open 2025-26
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <nav className="container-custom flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/logos/op-institute-logo.png"
            alt="O.P. Institute of Studies logo"
            width={48}
            height={48}
            priority
            className="h-11 w-11 object-contain group-hover:scale-105 transition-transform"
          />
          <div className="hidden sm:block">
            <p
              className={cn(
                "font-display font-bold text-base leading-tight transition-colors",
                isScrolled ? "text-brand-900 dark:text-white" : "text-white"
              )}
            >
              O.P. Institute of Studies
            </p>
            <p
              className={cn(
                "text-[11px] tracking-wide transition-colors",
                isScrolled ? "text-gray-500 dark:text-gray-400" : "text-white/70"
              )}
            >
              Since 2003
              <span
                className={cn(
                  "font-semibold",
                  isScrolled ? "text-brand-500" : "text-kids-200"
                )}
              >
                {" "}
                · OP Kids Pre School
              </span>
            </p>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                pathname === link.href
                  ? isScrolled
                    ? "bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-300"
                    : "bg-white/20 text-white"
                  : isScrolled
                    ? "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-brand-600"
                    : "text-white/90 hover:bg-white/10 hover:text-white",
                link.highlight &&
                  "relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-kids-400"
              )}
            >
              {link.label}
              {link.highlight && (
                <span className="ml-1 text-[10px] align-super text-brand-500">
                  NEW
                </span>
              )}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Link href="/admissions">
            <Button size="sm">Enquire Now</Button>
          </Link>
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-colors shadow-sm",
              isScrolled
                ? "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                : "bg-white/90 backdrop-blur-sm text-brand-700 dark:bg-gray-900/80 dark:text-white"
            )}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 overflow-hidden"
          >
            <div className="container-custom py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors",
                    pathname === link.href
                      ? "bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900"
                  )}
                >
                  {link.label}
                  {link.highlight && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-brand-100 text-brand-700">
                      NEW
                    </span>
                  )}
                </Link>
              ))}
              <div className="pt-4 px-4">
                <Link href="/admissions" className="block">
                  <Button className="w-full">Enquire Now</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
