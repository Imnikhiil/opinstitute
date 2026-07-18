"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { preschoolPrograms } from "@/data/site";

const palettes = [
  {
    emoji: "🧸",
    bar: "from-amber-400 to-orange-400",
    pill: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    dot: "bg-amber-400",
    ring: "group-hover:border-amber-300 dark:group-hover:border-amber-700",
    glow: "bg-amber-300/40",
    title: "group-hover:text-amber-600",
  },
  {
    emoji: "🎨",
    bar: "from-pink-400 to-rose-400",
    pill: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
    dot: "bg-pink-400",
    ring: "group-hover:border-pink-300 dark:group-hover:border-pink-700",
    glow: "bg-pink-300/40",
    title: "group-hover:text-pink-600",
  },
  {
    emoji: "📚",
    bar: "from-violet-400 to-purple-400",
    pill: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
    dot: "bg-violet-400",
    ring: "group-hover:border-violet-300 dark:group-hover:border-violet-700",
    glow: "bg-violet-300/40",
    title: "group-hover:text-violet-600",
  },
  {
    emoji: "⭐",
    bar: "from-sky-400 to-cyan-400",
    pill: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300",
    dot: "bg-sky-400",
    ring: "group-hover:border-sky-300 dark:group-hover:border-sky-700",
    glow: "bg-sky-300/40",
    title: "group-hover:text-sky-600",
  },
];

export function PreschoolPrograms() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-kids-gradient opacity-5" />

      {/* Playful floating background accents */}
      <motion.span
        aria-hidden
        animate={{ y: [0, -22, 0], rotate: [0, 12, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="hidden sm:block absolute top-16 left-[6%] text-5xl opacity-20 select-none"
      >
        ☁️
      </motion.span>
      <motion.span
        aria-hidden
        animate={{ y: [0, 18, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="hidden sm:block absolute bottom-24 right-[8%] text-5xl opacity-20 select-none"
      >
        🎈
      </motion.span>
      <div className="absolute -top-10 right-1/4 w-72 h-72 rounded-full bg-kids-300/20 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-accent-pink/10 blur-3xl" />

      <div className="container-custom relative">
        <SectionHeader
          badge="OP Kids Programs"
          title="OP Kids Pre School Programs"
          subtitle="Age-appropriate programs designed for holistic early childhood development"
          variant="kids"
        />

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {preschoolPrograms.map((program, index) => {
            const p = palettes[index % palettes.length];
            return (
              <motion.div
                key={program.name}
                initial={{ opacity: 0, y: 40, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -10 }}
                className="group relative bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl p-4 pt-6 sm:p-6 sm:pt-8 shadow-card hover:shadow-card-hover transition-shadow duration-300 border-2 border-transparent overflow-hidden"
              >
                {/* Colored top bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${p.bar}`}
                />
                {/* Soft corner glow on hover */}
                <div
                  className={`absolute -top-10 -right-10 w-28 h-28 rounded-full ${p.glow} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                {/* Hover border via ring color */}
                <div
                  className={`pointer-events-none absolute inset-0 rounded-3xl border-2 border-transparent ${p.ring} transition-colors duration-300`}
                />

                {/* Bouncing emoji */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.25,
                  }}
                  className="text-2xl sm:text-4xl mb-2 sm:mb-3 origin-bottom transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6 select-none"
                >
                  {p.emoji}
                </motion.div>

                <span className={`inline-block px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold mb-2 sm:mb-3 ${p.pill}`}>
                  {program.age}
                </span>
                <h3 className={`font-display font-bold text-base sm:text-xl mb-1.5 sm:mb-2 transition-colors ${p.title}`}>
                  {program.name}
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                  {program.description}
                </p>
                <ul className="space-y-1.5 sm:space-y-2">
                  {program.features.map((f) => (
                    <li key={f} className="flex items-center gap-1.5 sm:gap-2.5 text-xs sm:text-sm">
                      <span
                        className={`shrink-0 w-4 h-4 rounded-full ${p.dot} flex items-center justify-center`}
                      >
                        <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link href="/op-kids">
            <Button variant="kids">
              Explore OP Kids Pre School
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
