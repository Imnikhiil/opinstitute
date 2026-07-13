"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Baby,
  GraduationCap,
  Sparkles,
  Trophy,
  Star,
  Users,
  MousePointerClick,
} from "lucide-react";

type Side = "kids" | "institute" | null;

const kidsHighlights = ["Play Group – UKG", "Montessori Based", "CCTV Secured"];
const instituteHighlights = ["CA • CS • CMA", "B.Com & Class I–XII", "Since 2003"];

export function SplitHero() {
  const [active, setActive] = useState<Side>(null);

  return (
    <section className="relative w-full min-h-[100svh] flex flex-col lg:flex-row overflow-hidden bg-brand-950">
      {/* ---------------- OP KIDS SIDE ---------------- */}
      <motion.div
        onMouseEnter={() => setActive("kids")}
        onMouseLeave={() => setActive(null)}
        animate={{
          flexGrow: active === "kids" ? 1.35 : active === "institute" ? 0.65 : 1,
        }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="group relative flex-1 min-h-[50svh] lg:min-h-full overflow-hidden"
      >
        <motion.div
          className="absolute inset-0"
          animate={{ scale: [1.08, 1.16, 1.08] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1000&q=80"
            alt="Happy children learning at OP Kids Pre School"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-br from-kids-500/90 via-accent-pink/85 to-accent-purple/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_55%)]" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />

        {/* Light sweep on hover */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -inset-y-10 -left-1/3 w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 blur-md transition-all duration-700 ease-out group-hover:left-[120%] group-hover:opacity-100" />
        </div>

        {/* Corner index label */}
        <div className="absolute top-24 left-6 sm:left-12 lg:left-16 z-10 flex items-center gap-2 text-white/70">
          <span className="font-display text-sm font-semibold tracking-[0.25em]">01</span>
          <span className="h-px w-8 bg-white/40" />
          <span className="text-[11px] uppercase tracking-[0.2em]">Early Years</span>
        </div>

        {/* Floating playful accents (hidden on small screens to reduce clutter) */}
        <motion.span
          animate={{ y: [0, -14, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="hidden sm:block absolute top-24 right-10 text-5xl opacity-40 select-none"
        >
          🎨
        </motion.span>
        <motion.span
          animate={{ y: [0, 14, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="hidden sm:block absolute bottom-28 left-8 text-4xl opacity-40 select-none"
        >
          🧸
        </motion.span>

        <div className="relative z-10 h-full flex flex-col justify-start lg:justify-center px-6 sm:px-12 lg:px-16 pt-24 pb-14 sm:pt-28 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="max-w-md"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/25 backdrop-blur-sm text-white text-xs sm:text-sm font-semibold mb-4 sm:mb-5">
              <Baby className="w-4 h-4" />
              Ages 2 – 6
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight drop-shadow-sm">
              OP Kids
              <span className="block text-white/90 text-xl sm:text-2xl lg:text-3xl mt-1">
                Pre School
              </span>
            </h2>
            <p className="mt-3 sm:mt-4 text-white/90 text-base sm:text-lg font-medium">
              Where kids love to learn — joyful, safe & playful early childhood.
            </p>

            <div className="mt-4 sm:mt-6 flex flex-wrap gap-2">
              {kidsHighlights.map((h) => (
                <span
                  key={h}
                  className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-[11px] sm:text-xs font-medium"
                >
                  {h}
                </span>
              ))}
            </div>

            <Link
              href="/op-kids"
              className="group/btn mt-6 sm:mt-8 inline-flex items-center gap-2.5 pl-5 sm:pl-6 pr-2 py-2 rounded-full bg-white text-accent-purple font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Enter Kids World
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-purple text-white transition-transform duration-300 group-hover/btn:translate-x-0.5">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>

            <div className="mt-5 flex items-center gap-2 text-white/90">
              <span className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                ))}
              </span>
              <span className="text-xs sm:text-sm font-medium">
                Loved by 500+ happy families
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ---------------- OP INSTITUTE SIDE ---------------- */}
      <motion.div
        onMouseEnter={() => setActive("institute")}
        onMouseLeave={() => setActive(null)}
        animate={{
          flexGrow: active === "institute" ? 1.35 : active === "kids" ? 0.65 : 1,
        }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="group relative flex-1 min-h-[50svh] lg:min-h-full overflow-hidden"
      >
        <motion.div
          className="absolute inset-0"
          animate={{ scale: [1.16, 1.08, 1.16] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1000&q=80"
            alt="Students at O.P. Institute of Studies"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-bl from-brand-900/95 via-brand-800/90 to-brand-950/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(126,131,255,0.35),transparent_55%)]" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

        {/* Light sweep on hover */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -inset-y-10 -left-1/3 w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 blur-md transition-all duration-700 ease-out group-hover:left-[120%] group-hover:opacity-100" />
        </div>

        {/* Corner index label */}
        <div className="absolute top-24 right-6 sm:right-12 lg:right-16 z-10 flex items-center gap-2 text-white/60">
          <span className="text-[11px] uppercase tracking-[0.2em]">Institute</span>
          <span className="h-px w-8 bg-white/30" />
          <span className="font-display text-sm font-semibold tracking-[0.25em]">02</span>
        </div>

        <motion.span
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="hidden sm:block absolute top-28 left-10 text-brand-300/50"
        >
          <Trophy className="w-10 h-10" />
        </motion.span>

        <div className="relative z-10 h-full flex flex-col justify-end lg:justify-center px-6 sm:px-12 lg:px-16 pt-14 pb-20 sm:pb-24 lg:py-32 lg:items-end lg:text-right">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="max-w-md lg:flex lg:flex-col lg:items-end"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-400/25 backdrop-blur-sm text-brand-100 text-xs sm:text-sm font-semibold mb-4 sm:mb-5">
              <GraduationCap className="w-4 h-4" />
              Class I – XII · CA / CS / CMA
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              O.P. Institute
              <span className="block text-brand-200 text-xl sm:text-2xl lg:text-3xl mt-1">
                of Studies
              </span>
            </h2>
            <p className="mt-3 sm:mt-4 text-white/80 text-base sm:text-lg font-medium">
              Excellence since 2003 — CA, CS, CMA, B.Com & school tuition.
            </p>

            <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 lg:justify-end">
              {instituteHighlights.map((h) => (
                <span
                  key={h}
                  className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white text-[11px] sm:text-xs font-medium"
                >
                  {h}
                </span>
              ))}
            </div>

            <Link
              href="/courses"
              className="group/btn mt-6 sm:mt-8 inline-flex items-center gap-2.5 pl-5 sm:pl-6 pr-2 py-2 rounded-full bg-brand-500 text-white font-semibold text-sm sm:text-base shadow-lg shadow-brand-900/40 hover:bg-brand-400 transition-all duration-300"
            >
              Explore Institute
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-brand-600 transition-transform duration-300 group-hover/btn:translate-x-0.5">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>

            <div className="mt-5 flex items-center gap-4 text-white/80 lg:justify-end">
              <span className="flex items-center gap-1.5 text-xs sm:text-sm font-medium">
                <Trophy className="w-4 h-4 text-gold-400" />
                20+ Years
              </span>
              <span className="h-4 w-px bg-white/25" />
              <span className="flex items-center gap-1.5 text-xs sm:text-sm font-medium">
                <Users className="w-4 h-4 text-brand-300" />
                5000+ Students
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ---------------- CENTER UNIFYING EMBLEM ---------------- */}
      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 120 }}
          className="flex flex-col items-center"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-white/30 blur-xl" />
            <motion.span
              animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 rounded-full border-2 border-white"
            />
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-white shadow-2xl flex items-center justify-center border-4 border-white">
              <Image
                src="/logos/op-institute-logo.png"
                alt="O.P. Institute of Studies"
                width={64}
                height={64}
                className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-contain"
              />
            </div>
          </div>
          <div className="mt-2.5 sm:mt-3 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-lg">
            <p className="text-[11px] sm:text-sm font-bold text-brand-900 flex items-center gap-1.5 whitespace-nowrap">
              <Sparkles className="w-3.5 h-3.5 text-accent-purple" />
              One Family · Two Worlds
            </p>
          </div>

          {/* Hover hint (desktop) */}
          <motion.div
            animate={{ opacity: active ? 0 : 1, y: active ? 6 : 0 }}
            transition={{ duration: 0.3 }}
            className="hidden lg:flex mt-3 items-center gap-1.5 text-white/80 text-xs font-medium"
          >
            <MousePointerClick className="w-3.5 h-3.5" />
            Hover a side to explore
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll-to-explore cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="pointer-events-none absolute bottom-5 left-1/2 z-20 -translate-x-1/2 flex-col items-center gap-1.5 hidden lg:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-white/70">
          Scroll
        </span>
        <span className="flex h-8 w-5 items-start justify-center rounded-full border border-white/40 p-1">
          <motion.span
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1 rounded-full bg-white"
          />
        </span>
      </motion.div>

    </section>
  );
}
