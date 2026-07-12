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
        <Image
          src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1000&q=80"
          alt="Happy children learning at OP Kids Pre School"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover scale-105 group-hover:scale-110 transition-transform duration-[1200ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-kids-500/90 via-accent-pink/85 to-accent-purple/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_55%)]" />

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
              className="mt-6 sm:mt-8 inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-white text-accent-purple font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl hover:gap-3 transition-all duration-300"
            >
              Enter Kids World
              <ArrowRight className="w-5 h-5" />
            </Link>
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
        <Image
          src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1000&q=80"
          alt="Students at O.P. Institute of Studies"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover scale-105 group-hover:scale-110 transition-transform duration-[1200ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-bl from-brand-900/95 via-brand-800/90 to-brand-950/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(126,131,255,0.35),transparent_55%)]" />

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
              className="mt-6 sm:mt-8 inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-brand-500 text-white font-semibold text-sm sm:text-base shadow-lg shadow-brand-900/40 hover:bg-brand-400 hover:gap-3 transition-all duration-300"
            >
              Explore Institute
              <ArrowRight className="w-5 h-5" />
            </Link>
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
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        className="pointer-events-none absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 text-white/70 text-[11px] sm:text-xs font-medium tracking-wide"
      >
        Scroll to explore ↓
      </motion.div>
    </section>
  );
}
