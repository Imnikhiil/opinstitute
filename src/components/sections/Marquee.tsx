"use client";

import { GraduationCap, Baby, Sparkles } from "lucide-react";

const items = [
  "CMA – Cost & Management Accountancy",
  "B.Com (Pass / Hons)",
  "Class I – XII Tuition",
  "Play Group – UKG",
  "Montessori Learning",
  "Since 2003",
  "2 Campuses in Delhi",
];

export function Marquee() {
  return (
    <div className="relative overflow-hidden bg-brand-950 py-4 border-y border-white/10 mt-16 md:mt-20">
      {/* Soft fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-28 z-10 bg-gradient-to-r from-brand-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-28 z-10 bg-gradient-to-l from-brand-950 to-transparent" />
      <div className="flex whitespace-nowrap animate-marquee">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-3 px-6 shrink-0">
            {i % 3 === 0 ? (
              <GraduationCap className="w-4 h-4 text-brand-300" />
            ) : i % 3 === 1 ? (
              <Baby className="w-4 h-4 text-kids-300" />
            ) : (
              <Sparkles className="w-4 h-4 text-gold-400" />
            )}
            <span className="text-white/90 text-sm font-medium tracking-wide uppercase">
              {item}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
