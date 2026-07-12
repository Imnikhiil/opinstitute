"use client";

import { GraduationCap, Baby, Sparkles } from "lucide-react";

const items = [
  "CA – Chartered Accountancy",
  "CS – Company Secretary",
  "CMA",
  "B.Com (Pass / Hons)",
  "Class I – XII Tuition",
  "Play Group – UKG",
  "Montessori Learning",
  "Since 2003",
  "2 Campuses in Delhi",
];

export function Marquee() {
  return (
    <div className="relative overflow-hidden bg-brand-950 py-4 border-y border-white/10">
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
