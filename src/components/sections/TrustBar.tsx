"use client";

import { motion } from "framer-motion";
import { stats } from "@/data/site";
import { StatCounter } from "@/components/ui/ScrollReveal";

export function TrustBar() {
  return (
    <section className="relative z-20 -mt-10 sm:-mt-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl sm:rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/70 dark:border-white/10 shadow-premium overflow-hidden"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gray-200/70 dark:divide-white/10">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="px-4 py-5 sm:px-6 sm:py-8 md:py-10 text-center group"
              >
                <p className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-600 dark:text-brand-400">
                  <StatCounter end={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1 sm:mt-2 text-[10px] sm:text-xs md:text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
